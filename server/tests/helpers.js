// Minimal Express-like request/response doubles for unit tests.
export function mockReq(body = {}, { ip = '203.0.113.7', headers = {} } = {}) {
  return { body, ip, get: (h) => headers[h.toLowerCase()] };
}

export function mockRes() {
  const res = { statusCode: 200, body: undefined };
  res.status = (code) => ((res.statusCode = code), res);
  res.json = (data) => ((res.body = data), res);
  return res;
}

// Runs (req, res, next) handlers in order, like an Express route.
export async function runChain(handlers, req) {
  const res = mockRes();
  let error;
  for (const handler of handlers) {
    let calledNext = false;
    await handler(req, res, (err) => {
      calledNext = true;
      error = err;
    });
    if (!calledNext || error) break;
  }
  return { res, error };
}

export const silentLogger = { info() {}, warn() {}, error() {} };

export function fakeModel() {
  const store = { inquiries: [], contacts: [] };
  return {
    store,
    async insertInquiry(row) {
      store.inquiries.push(row);
      return { id: store.inquiries.length };
    },
    async insertContactMessage(row) {
      store.contacts.push(row);
      return { id: store.contacts.length };
    },
  };
}

export const validInquiry = (overrides = {}) => ({
  fullName: 'Jane Client',
  email: 'Jane@Example.com',
  phone: '+1 (555) 010-2000',
  organization: 'Acme Retail',
  service: 'web-application',
  description: 'I need an inventory system for three retail locations with reporting.',
  budget: '$1,500–$5,000',
  timeline: '1–3 months',
  noPhiConfirmed: true,
  website: '',
  startedAt: Date.now() - 60_000,
  ...overrides,
});
