// Thin wrapper around fetch for talking to the Express API.
const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

async function post(path, body) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      "We couldn't reach the server. Check your connection and try again, or email directly.",
      { status: 0 }
    );
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    // Non-JSON response (e.g. proxy error page); fall through to generic message.
  }

  if (!response.ok) {
    throw new ApiError(data.message || 'Something went wrong. Please try again.', {
      status: response.status,
      fieldErrors: data.errors,
    });
  }
  return data;
}

export const submitInquiry = (payload) => post('/api/inquiries', payload);
export const submitContact = (payload) => post('/api/contact', payload);
