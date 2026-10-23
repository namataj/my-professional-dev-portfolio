# James Namata — Portfolio & Software Development Website

A React + Express + MySQL website presenting James Namata as a software engineer, freelance developer and emerging healthcare technology specialist.

```
client/     React 19 + Vite + Tailwind CSS 4 + React Router (the website)
server/     Node.js + Express REST API (form submissions, validation, email)
database/   MySQL schema
postman/    Postman collection for the API
```

**Pages:** Home, About, Services, Test Automation, Healthcare Technology, Portfolio, Hire Me (quote form), Contact, Privacy Policy, Terms of Service, 404.

---

## 1. Requirements

- Node.js 20 or newer (includes npm)
- MySQL 8 (or MariaDB 10.6+)
- Optional: an SMTP account for email notifications (Gmail app password, Zoho, Brevo, SendGrid, Mailgun, etc.)

## 2. First-time setup

```bash
# 1. Install dependencies for both apps
npm run install:all

# 2. Create the database and tables
mysql -u root -p < database/schema.sql

# 3. Create an app user (recommended) — in the mysql shell:
#    CREATE USER 'portfolio_app'@'localhost' IDENTIFIED BY 'a-long-random-password';
#    GRANT SELECT, INSERT ON james_namata_portfolio.* TO 'portfolio_app'@'localhost';

# 4. Configure the server
cp server/.env.example server/.env      # then edit DB_* and SMTP_* values

# 5. Check the database connection
npm run db:check --prefix server
```

## 3. Run in development

Two terminals:

```bash
npm run dev:server     # API on http://localhost:5000
npm run dev:client     # Website on http://localhost:5173
```

Vite forwards `/api/*` requests to the Express server, so forms work without any CORS setup.

## 4. Tests

```bash
npm test               # server unit tests (validation, spam protection, controllers, email escaping)
```

Then try the API with the Postman collection in `postman/` (import it, keep `baseUrl` as `http://localhost:5000`).

**Manual checklist before launch:** every nav link and button, the quote form (valid + invalid + PHI warning), the contact form, Services "Request a Quote" prefill, portfolio filters and details dialog, mobile menu at phone width, a real submission landing in MySQL and your inbox.

---

## 5. Personalize the content

| What | Where |
| --- | --- |
| Email, phone, WhatsApp, GitHub, LinkedIn, domain | `client/src/config/site.js` |
| Portrait photo | Save to `client/src/assets/`, import it in `client/src/components/Portrait.jsx` (instructions in file) |
| Resume | Put the PDF in `client/public/`, set `resumeUrl` and `resumeIsPlaceholder: false` in `site.js` |
| Years of experience shown in the hero and About page | `yearsExperience` in `client/src/config/site.js` |
| Services (full list + the six homepage cards) | `client/src/data/services.js` (`services`, `homeServices`) |
| Test automation frameworks and capabilities | `client/src/data/testAutomation.js` |
| Healthcare focus areas (page + the four homepage areas) | `client/src/data/healthcare.js` |
| Portfolio projects (links, screenshots, status) | `client/src/data/projects.js` |
| Skills (four groups, badge colors) | `client/src/data/skills.js` |
| Colors and fonts | `@theme` block in `client/src/index.css` |
| Domain in SEO files | `client/public/sitemap.xml`, `client/public/robots.txt`, `site.url` |
| Privacy / terms "last updated" dates | `client/src/pages/Privacy.jsx`, `Terms.jsx` |

If you add or rename a service, budget or timeline option, update `server/validators/allowedValues.js` too. A test (`npm test`) fails if the two lists drift apart.

All portfolio projects are labeled **Concept**. Change `status` to `'demo'` or `'complete'` only when that's true, and add `github`/`demo` links — buttons appear automatically when a link is set.

---

## 6. How it works (architecture in plain English)

**Request flow:** React form → `POST /api/...` → Express route → spam check → controller → service → model → MySQL, then email.

- **Routes** (`server/routes/index.js`) list the URLs and the order of checks: rate limit, spam guard, then controller.
- **Controllers** (`server/controllers/`) handle HTTP only: validate the body, call the service, send the response.
- **Services** (`server/services/`) hold the business rules: save the submission, then send the notification. If email fails, the submission is still saved and the error is logged.
- **Models** (`server/models/`) are the only place SQL lives. Every query uses `?` placeholders (parameterized queries), so input can't alter the SQL.
- **Validators** (`server/validators/`) clean and check every field again on the server. The browser's checks are for convenience; the server's are the ones that count.
- **container.js** wires the real database and mailer together. Tests swap in fakes, which is why the logic can be tested without MySQL or SMTP.

**Security and spam protection**

- Helmet security headers and a content security policy
- CORS limited to `CLIENT_ORIGIN`
- JSON bodies capped at 20 KB
- Rate limits: 100 API requests / 15 min and 5 form submissions / hour per IP
- Hidden honeypot field + minimum fill time (`MIN_FORM_FILL_MS`)
- Server-side allow-lists for service, budget and timeline
- Control characters stripped; all user text HTML-escaped in emails
- Error responses never expose stack traces or SQL details in production
- Least-privilege DB user (`SELECT, INSERT` only)

**Health information.** The forms are for project inquiries only. Both forms warn users not to include patient information, the quote form requires a confirmation checkbox, and the client and server reject text that looks like SSNs, medical record numbers or dates of birth. The site makes no HIPAA-compliance claims.

**Adding features later** (client portal, invoices, bookings): add a router in `server/routes/`, a controller/service/model trio, new tables in `schema.sql`, and React pages registered in `client/src/App.jsx`. Keep routes unregistered until they're finished so nothing half-built is reachable.

---

## 7. Deployment

### Option A — one server for everything (simplest)

Works on Render, Railway, a VPS, or any Node host.

```bash
npm run install:all
npm run build                      # creates client/dist
```

Set these environment variables on the host (never commit `.env`):

```
NODE_ENV=production
PORT=5000                          # most hosts set this for you
SERVE_CLIENT=true                  # Express serves client/dist
CLIENT_ORIGIN=https://www.yourdomain.com
TRUST_PROXY=1                      # if behind the host's proxy/load balancer
DB_HOST=...  DB_PORT=3306  DB_USER=...  DB_PASSWORD=...  DB_NAME=james_namata_portfolio  DB_SSL=true
SMTP_HOST=...  SMTP_PORT=587  SMTP_USER=...  SMTP_PASS=...  NOTIFY_EMAIL=...  MAIL_FROM=...
```

Start command: `npm start` (runs `server/server.js`).

On Render: Build command `npm run install:all && npm run build`, start command `npm start`.

### Option B — static frontend + separate API

- **Frontend** on Netlify / Vercel / Cloudflare Pages: root `client`, build `npm run build`, output `dist`. Set `VITE_API_URL=https://api.yourdomain.com`. SPA routing is preconfigured (`public/_redirects` for Netlify, `vercel.json` for Vercel).
- **API** on Render / Railway / a VPS: root `server`, start `npm start`, with `SERVE_CLIENT=false` and `CLIENT_ORIGIN` set to the frontend's URL.

### Database hosting

Any managed MySQL works: Railway MySQL, Aiven, DigitalOcean Managed MySQL, AWS RDS, or your web host's MySQL. Create the database, run `database/schema.sql` against it, create the app user, copy the connection details into the host's environment variables, and set `DB_SSL=true` if the provider requires TLS. Run `npm run db:check --prefix server` to confirm.

### Domain

1. Buy a domain (Namecheap, Cloudflare, Porkbun, etc.).
2. In your host's dashboard, add the custom domain and follow its DNS instructions (usually a CNAME for `www` and an A/ALIAS record for the root).
3. HTTPS certificates are issued automatically by Render, Netlify, Vercel and similar hosts.
4. Replace `yourdomain.com` in `site.js`, `sitemap.xml`, `robots.txt` and `CLIENT_ORIGIN`.
5. Submit `https://www.yourdomain.com/sitemap.xml` in Google Search Console.

---

## 8. Tech stack

React 19, Vite 6, Tailwind CSS 4, React Router 7, Lucide icons, Motion for React, Fetch API · Node.js, Express 4, express-rate-limit, Helmet, CORS, Nodemailer, dotenv · MySQL with mysql2 · node:test, Postman.
