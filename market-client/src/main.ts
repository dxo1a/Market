import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { AuthServiceClient } from '@/proto/auth.client';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, LogoutRequest, LogoutResponse } from '@/proto/auth';
import type { RpcError } from '@protobuf-ts/runtime-rpc';

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/', name: 'home', component: Home }
];

const transport = new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:8080',
  format: 'text',
  credentials: 'include',
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const client = new AuthServiceClient(transport);

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

const app = createApp(App);

app.use(router);

app.mount('#app');
