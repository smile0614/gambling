/**
 * Mock response helpers.
 *
 * The app was originally backed by a REST API consumed through axios. The
 * backend has been removed, so every `api_*` function now resolves locally with
 * mock data instead of performing a network request.
 *
 * `respond` mimics the shape of an axios response (`{ data, status, ... }`).
 * `data` is intentionally typed as `any` — exactly like the original
 * `AxiosResponse<any>` — so existing consumers that read arbitrary fields off
 * `res.data` keep compiling unchanged.
 */
export type MockAxiosResponse = {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, unknown>;
  config: Record<string, unknown>;
};

const DEFAULT_DELAY = 120;

/** Resolve with mock data wrapped like a successful axios response. */
export const respond = (data: any, status = 200, delay: number = DEFAULT_DELAY): Promise<MockAxiosResponse> =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data,
          status,
          statusText: status === 201 ? 'Created' : 'OK',
          headers: {},
          config: {},
        }),
      delay,
    );
  });

/** Resolve like a `201 Created` response (used by sign-up flows). */
export const respondCreated = (data: any) => respond(data, 201);

/** Resolve with a paginated envelope `{ data, total, page, pageSize }`. */
export const respondPaged = (items: any[], page = 1, pageSize = 20) =>
  respond({
    data: items,
    total: items.length,
    page,
    pageSize,
  });
