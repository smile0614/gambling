/**
 * Mock HTTP client (no backend).
 *
 * The app previously used an axios instance here. The backend has been removed,
 * so this module now exports a drop-in mock whose verb methods resolve to an
 * empty success response. Any code that still calls `api.get/post/put/delete`
 * directly becomes a harmless no-op instead of a real network request.
 *
 * Domain calls should go through the mock modules in `api/<domain>/index.ts`,
 * which return realistic mock data.
 */
import { respond } from './_mock/respond';

export const baseURL = '';

// Auth/token helpers kept as harmless stubs for backwards compatibility.
export const getAccessToken = () => 'Bearer mock-access-token';
export const getRefreshToken = () => 'mock-refresh-token';
export const getCompanyId = () => '';
export const refreshAccessToken = async () => 'mock-access-token';

const noop = (..._args: any[]) => respond({});

const api = {
  get: noop,
  post: noop,
  put: noop,
  patch: noop,
  delete: noop,
  request: noop,
  interceptors: {
    request: { use: () => undefined },
    response: { use: () => undefined },
  },
};

export default api;
