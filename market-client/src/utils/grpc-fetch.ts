import type { UnaryCall } from '@protobuf-ts/runtime-rpc'
import { decodeRpcError } from './decoders'
import type { grpcTransformedResponse } from '@/assets/types/grpcTransformedResponse'
import type { RpcError } from '@protobuf-ts/runtime-rpc'

export async function grpcFetch<T extends object, U extends object>(
  data: T,
  grpcHandler: (data: T) => UnaryCall<T, U>,
) {
  let responseData
  try {
    responseData = await grpcHandler(data)
  } catch (err) {
    responseData = decodeRpcError(err as RpcError)
    console.error(responseData)

    // eslint-disable-next-line no-console
    if (import.meta.env.DEV) console.trace(responseData.stack)
  }

  if ('code' in responseData) {
    const response: grpcTransformedResponse = {
      status: 'error',
      data: responseData.message,
    }
    return response
  }
  const response: grpcTransformedResponse<U> = {
    status: 'ok',
    data: responseData.response,
  }
  return response
}
