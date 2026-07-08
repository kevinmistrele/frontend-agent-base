# Security

- Never commit or hardcode secrets, tokens, API keys, or private endpoints. Environment values go through `src/config/env.ts` and `.env` files (never `.env` itself — only `.env.example` with placeholder values is committed).
- Don't log tokens, passwords, or full request/response bodies that may contain personal data.
- Treat all API responses as untrusted input: validate/parse shape (e.g. with `zod`) at the boundary before trusting it deeper in the app, especially before rendering it as HTML.
- Never use `dangerouslySetInnerHTML` with unsanitized data. If rendering rich/user-provided content is required, sanitize first and say so explicitly in the PR.
- Don't build URLs, queries, or DOM strings by concatenating unescaped user input.
- Keep dependency additions deliberate — don't add a package to solve a one-off problem without checking it's maintained and necessary (see the safety rules in [../agents/workflow.md](../agents/workflow.md)).
- When a task involves auth, PII, or payments, treat it as higher risk: prefer the smallest change, add tests for the failure paths (not just the happy path), and call out the risk explicitly in the final summary rather than assuming it's fine.

## Auth (when this base gains an auth feature)

This repo has no authentication yet. When one is added:

- Prefer an HttpOnly cookie for the session/JWT over `localStorage`/`sessionStorage` — client-readable storage is exposed to any XSS on the page.
- Model authorization explicitly: RBAC (role-based, e.g. `ADMIN`/`USER`) for coarse checks, and permission/ownership checks (e.g. "only the author can delete their comment") for anything finer-grained.
- Client-side checks are for UX only (hiding a button); the server must enforce the same rule independently.
