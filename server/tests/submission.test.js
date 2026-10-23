import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSubmissionService } from '../services/submissionService.js';
import { createSubmissionController } from '../controllers/submissionController.js';
import { createSpamGuard } from '../middleware/spamGuard.js';
import { createErrorHandler } from '../middleware/errorHandler.js';
import { inquiryEmail } from '../services/emailTemplates.js';
import { fakeModel, mockReq, mockRes, runChain, silentLogger, validInquiry } from './helpers.js';

function setup({ sendNotification = async () => ({ sent: true }), model = fakeModel() } = {}) {
  const sent = [];
  const service = createSubmissionService({
    inquiryModel: model,
    sendNotification: async (email) => {
      sent.push(email);
      return sendNotification(email);
    },
    logger: silentLogger,
  });
  const controller = createSubmissionController(service);
  const spamGuard = createSpamGuard({ minFillMs: 3000, logger: silentLogger });
  return { model, sent, controller, spamGuard };
}

test('valid quote request is saved, emailed, and returns 201', async () => {
  const { model, sent, controller, spamGuard } = setup();
  const req = mockReq(validInquiry(), { headers: { 'user-agent': 'TestAgent/1.0' } });
  const { res } = await runChain([spamGuard, controller.createInquiry], req);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(model.store.inquiries.length, 1);
  const saved = model.store.inquiries[0];
  assert.equal(saved.email, 'jane@example.com');
  assert.equal(saved.ipAddress, '203.0.113.7');
  assert.equal(saved.userAgent, 'TestAgent/1.0');
  assert.equal('website' in saved || 'startedAt' in saved || 'noPhiConfirmed' in saved, false, 'only whitelisted fields are stored');
  assert.equal(sent.length, 1);
  assert.match(sent[0].subject, /Custom Web Application Development/);
});

test('invalid quote request returns 400 with field errors and saves nothing', async () => {
  const { model, controller, spamGuard } = setup();
  const { res } = await runChain([spamGuard, controller.createInquiry], mockReq(validInquiry({ email: 'nope' })));
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errors.email);
  assert.equal(model.store.inquiries.length, 0);
});

test('honeypot submissions get a fake success and are not saved', async () => {
  const { model, sent, controller, spamGuard } = setup();
  const { res } = await runChain([spamGuard, controller.createInquiry], mockReq(validInquiry({ website: 'http://spam.example' })));
  assert.equal(res.statusCode, 201);
  assert.equal(model.store.inquiries.length, 0);
  assert.equal(sent.length, 0);
});

test('submissions that are too fast or missing a timestamp are rejected', async () => {
  const { model, controller, spamGuard } = setup();
  for (const startedAt of [Date.now() - 500, undefined, 'abc', Date.now() + 60_000]) {
    const { res } = await runChain([spamGuard, controller.createInquiry], mockReq(validInquiry({ startedAt })));
    assert.equal(res.statusCode, 400);
  }
  assert.equal(model.store.inquiries.length, 0);
});

test('email failure does not fail the request once data is saved', async () => {
  const { model, controller, spamGuard } = setup({ sendNotification: async () => { throw new Error('SMTP down'); } });
  const { res } = await runChain([spamGuard, controller.createInquiry], mockReq(validInquiry()));
  assert.equal(res.statusCode, 201);
  assert.equal(model.store.inquiries.length, 1);
});

test('database failure is passed to the error handler, which hides details in production', async () => {
  const model = fakeModel();
  model.insertInquiry = async () => { throw new Error('ER_ACCESS_DENIED_ERROR secret-host'); };
  const { controller, spamGuard } = setup({ model });
  const req = mockReq(validInquiry());
  const { error } = await runChain([spamGuard, controller.createInquiry], req);
  assert.ok(error);

  const res = mockRes();
  createErrorHandler({ logger: silentLogger, isProduction: true })(error, { ...req, method: 'POST', originalUrl: '/api/inquiries' }, res, () => {});
  assert.equal(res.statusCode, 500);
  assert.doesNotMatch(JSON.stringify(res.body), /secret-host/);
});

test('contact message flow', async () => {
  const { model, sent, controller, spamGuard } = setup();
  const body = { name: 'Sam', email: 'sam@example.com', subject: 'Website', message: 'Can we talk about a new site?', website: '', startedAt: Date.now() - 10_000 };
  const { res } = await runChain([spamGuard, controller.createContactMessage], mockReq(body));
  assert.equal(res.statusCode, 201);
  assert.equal(model.store.contacts.length, 1);
  assert.equal(sent.length, 1);
});

test('notification email escapes user-supplied HTML', () => {
  const email = inquiryEmail({ ...validInquiry(), fullName: '<img src=x onerror=alert(1)>' }, 7);
  assert.doesNotMatch(email.html, /<img/);
  assert.match(email.html, /&lt;img/);
  assert.equal(email.replyTo, 'Jane@Example.com');
});
