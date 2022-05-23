type Get<Q extends Record<string, unknown>, R> = {
  (queryParams?: Q, options?: Record<string, string>): Promise<R>;
};

type GetOne<Q extends Record<string, unknown>, R> = {
  (id: number, queryParams?: Q, options?: Record<string, string>): Promise<R>;
};

type Post<B extends Record<string, unknown>, R> = {
  (body: B, options?: Record<string, string>): Promise<R>;
};

type Put<B extends Record<string, unknown> | string[], R> = {
  (body: B, options?: Record<string, string>): Promise<R>;
};

type Patch<B extends Record<string, unknown>, R> = {
  (id: number | string | null, body: B, options?: Record<string, string>): Promise<R>;
};

type Delete<Q extends Record<string, unknown>, R> = {
  (id: number | string | null, queryParams?: Q, options?: Record<string, string>): Promise<R>;
};

type Params = {
  id: string;
};

export type { Get, GetOne, Post, Put, Patch, Delete, Params };
