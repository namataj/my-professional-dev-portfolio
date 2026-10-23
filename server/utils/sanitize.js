// Input cleaning helpers. These normalize text; they are not a substitute for
// parameterized queries (database) or escaping (HTML email), which are also used.

// Remove control characters except newline and tab, normalize line endings, trim.
export function cleanText(value, { maxLength = 5000, multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  let v = value.normalize('NFC').replace(/\r\n?/g, '\n');
  // eslint-disable-next-line no-control-regex
  v = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (!multiline) v = v.replace(/\s+/g, ' ');
  else v = v.replace(/\n{3,}/g, '\n\n');
  return v.trim().slice(0, maxLength);
}

export const cleanEmail = (value) => cleanText(value, { maxLength: 254 }).toLowerCase();

// Escape text before placing it inside HTML (used for notification emails).
export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
