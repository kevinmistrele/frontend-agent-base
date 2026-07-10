import type { RequestHandler } from 'msw';

// Global handlers shared by every test. Keep this list small — a test that
// needs a specific response registers it locally with `server.use(...)`.
export const handlers: RequestHandler[] = [];
