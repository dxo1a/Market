### Stack:
- fiber (microservice architecture)
- gRPC
- Envoy
- Vue.js (protobuf-ts, gRPC-web)
- docker

Only login and register (JWT)
### etc
```shell
# View available methods:
grpcurl -plaintext localhost:50051 list
# And description:
grpcurl -plaintext localhost:50051 describe auth.AuthService
```
