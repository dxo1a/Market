export type grpcTransformedResponse<T = unknown> =
  | {
      status: 'ok'
      data: T
    }
  | {
      status: 'error'
      data: string
    }
