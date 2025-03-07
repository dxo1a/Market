import { AuthServiceClient } from '@/proto/auth.client'
import grpcTransport from './grpc-transport'
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/proto/auth'
import type { RpcError } from '@protobuf-ts/runtime-rpc'
import decodeRpcError from './decodeRpcError'
import type { grpcTransformedResponse } from '@/assets/types/grpcTransformedResponse'

const client = new AuthServiceClient(grpcTransport)

export async function loginUser(data: LoginRequest) {
  let responseData
  try {
    responseData = await client.login(data)
  } catch (err) {
    responseData = decodeRpcError(err as RpcError)
  }

  if ('code' in responseData) {
    const response: grpcTransformedResponse = {
      status: 'error',
      data: responseData.message,
    }
    return response
  }
  const response: grpcTransformedResponse<LoginResponse> = {
    status: 'ok',
    data: responseData.response,
  }
  return response
}

export async function registerUser(email: string, username: string, password: string) {
  const registerRequest: RegisterRequest = { email, username, password }

  try {
    const { response }: { response: RegisterResponse } = await client.register(registerRequest)

    console.log('Registration successful!')
    // После успешной регистрации выполняем вход
    return loginUser(email, username, password)
  } catch (err) {
    const error = err as RpcError

    if (error.message) {
      alert('Ошибка регистрации: ' + error.message + '\nError code: ' + error.code)
    } else {
      alert('Произошла неизвестная ошибка')
    }
  }
}

export async function logoutUser(token: string) {
  const logoutRequest: LogoutRequest = { token }

  try {
    const { response }: { response: LogoutResponse } = await client.logout(logoutRequest)

    console.log('Logout successful!')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
