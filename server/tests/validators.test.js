import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry } from '../validators/inquiryValidator.js';
import { validateContact } from '../validators/contactValidator.js';
import { cleanText, escapeHtml } from '../utils/sanitize.js';
import { validInquiry } from './helpers.js';

test('valid inquiry passes and is normalized', () => {
  const { value, errors } = validateInquiry(validInquiry({ fullName: '  Jane   Client ' }));
  assert.deepEqual(errors, {});
  assert.equal(value.fullName, 'Jane Client');
  assert.equal(value.email, 'jane@example.com');
});

test('empty inquiry reports every required field', () => {
  const { errors } = validateInquiry({});
  assert.deepEqual(Object.keys(errors).sort(), ['budget', 'description', 'email', 'fullName', 'noPhiConfirmed', 'service', 'timeline']);
});

test('rejects values outside the allowed lists', () => {
  const { errors } = validateInquiry(validInquiry({ service: 'hacking', budget: '$1', timeline: 'yesterday' }));
  assert.ok(errors.service && errors.budget && errors.timeline);
});

test('PHI confirmation must be literally true', () => {
  assert.ok(validateInquiry(validInquiry({ noPhiConfirmed: 'true' })).errors.noPhiConfirmed);
});

test('blocks text that looks like patient information', () => {
  for (const d of ['Patient SSN 123-45-6789 needs access to the portal', 'Update record MRN: 99812 for the new portal please', 'Patient DOB: 01/02/1980 should appear on the dashboard']) {
    assert.match(validateInquiry(validInquiry({ description: d })).errors.description, /patient information/);
  }
});

test('optional phone is validated only when present', () => {
  assert.equal(validateInquiry(validInquiry({ phone: '' })).errors.phone, undefined);
  assert.ok(validateInquiry(validInquiry({ phone: 'call me maybe' })).errors.phone);
});

test('contact validation', () => {
  assert.deepEqual(validateContact({ name: 'Sam', email: 'sam@example.com', message: 'Hello there James!' }).errors, {});
  assert.deepEqual(Object.keys(validateContact({}).errors).sort(), ['email', 'message', 'name']);
});

test('sanitizer strips control characters and non-string input', () => {
  assert.equal(cleanText('a\u0000b\u0007c'), 'abc');
  assert.equal(cleanText({ $gt: '' }), '');
  assert.equal(cleanText('line1\r\n\r\n\r\n\r\nline2', { multiline: true }), 'line1\n\nline2');
});

test('escapeHtml neutralizes markup for emails', () => {
  assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
});

test('client form options match the server allow-lists', async () => {
  const { allServiceSlugs, budgetOptions, timelineOptions } = await import('../../client/src/data/formOptions.js');
  const { SERVICES, BUDGETS, TIMELINES } = await import('../validators/allowedValues.js');
  assert.deepEqual([...allServiceSlugs].sort(), Object.keys(SERVICES).sort());
  assert.deepEqual(budgetOptions, BUDGETS);
  assert.deepEqual(timelineOptions, TIMELINES);
});
