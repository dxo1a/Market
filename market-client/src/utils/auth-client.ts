import { AuthServiceClient } from "@/proto/auth.client";
import grpcTransport from "./grpc-transport";
import type { LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, RegisterRequest, RegisterResponse } from "@/proto/auth";
import type { RpcError } from "@protobuf-ts/runtime-rpc";

const client = new AuthServiceClient(grpcTransport);

export async function loginUser(email: string, username: string, password: string) {
  const loginRequest: LoginRequest = { email, username, password };

  try {
    const { response }: { response: LoginResponse } = await client.login(loginRequest);
    console.log('Login successful! Token:', response.token);
    return response.token;
  } catch (err) {
    const error = err as RpcError;
    console.error(`Ошибка:\n\nКод ошибки: ${error.code}\nТекст ошибки: ${decodeURIComponent(error.message)}`)

    if (!error.message) {
      alert('Произошла неизвестная ошибка');
    }
  }
}

export async function registerUser(email: string, username: string, password: string) {
  const registerRequest: RegisterRequest = { email, username, password };

  try {
    const { response }: { response: RegisterResponse } = await client.register(registerRequest);

    console.log('Registration successful!');
    // После успешной регистрации выполняем вход
    return loginUser(email, username, password);
  } catch (err) {
    const error = err as RpcError;

    if (error.message) {
      alert('Ошибка регистрации: ' + decodeURIComponent(error.message) + "\nError code: " + error.code);
    }
    else {
      alert('Произошла неизвестная ошибка')
    }
  }
}

export async function logoutUser(token: string) {
  const logoutRequest: LogoutRequest = { token };

  try {
    const { response }: { response: LogoutResponse } = await client.logout(logoutRequest);

    console.log('Logout successful!');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
