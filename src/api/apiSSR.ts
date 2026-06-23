/**
 * Mock SSR HTTP client (no backend).
 *
 * Replaces the former axios instance used in getServerSideProps/getStaticProps.
 * All verb methods resolve to an empty success response so server-side data
 * fetching never performs a real network request. SSR pages that need data use
 * the `apiSSR_*` functions in `api/<domain>/index.ts`, which return mock data.
 */
import { GetServerSidePropsContext } from 'next';

import { respond } from './_mock/respond';

// Kept for signature compatibility with callers that set up SSR cookies.
export const setupAxiosSSR = (_context: GetServerSidePropsContext) => undefined;
export const getAccessToken = () => 'Bearer mock-access-token';
export const getRefreshToken = () => 'mock-refresh-token';
export const getCompanyId = () => '';

const noop = (..._args: any[]) => respond({});

const apiSSR = {
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

export default apiSSR;
