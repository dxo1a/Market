import { MarketServiceClient } from '@/proto/market.client'
import grpcTransport from '../grpc-transport'
import { type LoginRequest, type LogoutRequest, type RegisterRequest } from '@/proto/market'
import { grpcFetch } from '../grpc-fetch'

const client = new MarketServiceClient(grpcTransport)

export const loginUser = async (data: LoginRequest) =>
  await grpcFetch(data, client.login.bind(client))

export const registerUser = async (data: RegisterRequest) =>
  await grpcFetch(data, client.register.bind(client))

export const logoutUser = async (data: LogoutRequest) =>
  await grpcFetch(data, client.logout.bind(client))
