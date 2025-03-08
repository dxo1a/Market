import type { RpcError } from '@protobuf-ts/runtime-rpc'

export function decodeRpcError(err: RpcError): RpcError {
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
export function decodeToken(token: string) {
  const tokenParts = token.split('.')
  if (tokenParts.length === 3) {
    const base64Url = tokenParts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decodedPayload = atob(base64)
    return JSON.parse(decodedPayload)
  }
  return {}
}
