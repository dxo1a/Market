### Stack:
- fiber (microservice architecture)
- gRPC
- Envoy
- Vue.js (protobuf-ts, gRPC-web)
- docker

Only login and register (JWT)
### Commands
```shell
# View available methods:
grpcurl -plaintext localhost:50051 list
# And description:
grpcurl -plaintext localhost:50051 describe auth.AuthService
```

```shell
# Generate a JWT secret 
openssl rand -base64 -out <filename.pem> <length_in_digit> 
# Or immediately install it in .env
echo "\nJWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')" >> .env
```
