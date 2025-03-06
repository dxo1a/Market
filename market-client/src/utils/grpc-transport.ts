import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

export default new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:8080',
  format: 'text',
  credentials: 'include',
});
