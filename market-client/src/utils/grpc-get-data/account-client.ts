import grpcTransport from '../grpc-transport'
import { grpcFetch } from '../grpc-fetch'
import { MarketServiceClient } from '@/proto/market.client'

const client = new MarketServiceClient(grpcTransport)

export const getProfileData = async () => await grpcFetch({}, () => client.getProfile({}))
