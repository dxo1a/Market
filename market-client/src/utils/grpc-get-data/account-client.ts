import grpcTransport from '../grpc-transport'
import { grpcFetch } from '../grpc-fetch'
import { AccountServiceClient } from '@/proto/account.client'

const client = new AccountServiceClient(grpcTransport)

export const getProfileData = async () => await grpcFetch({}, () => client.getProfile({}))
