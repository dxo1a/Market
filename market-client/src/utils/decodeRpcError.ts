import type { RpcError } from '@protobuf-ts/runtime-rpc'

export default function (err: RpcError): RpcError {
  return {
    code: err.code,
    message: decodeURIComponent(err.message),
    meta: err.meta,
    methodName: decodeURIComponent(err?.methodName || ''),
    name: decodeURIComponent(err.name),
    serviceName: decodeURIComponent(err?.serviceName || ''),
    stack: decodeURIComponent(err?.stack || ''),
  }
}
