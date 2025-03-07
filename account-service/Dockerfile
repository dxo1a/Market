FROM golang:1.23.6-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o account-service ./cmd

###

FROM alpine:3.20

RUN apk add --no-cache ca-certificates

# Копируем скомпилированный бинарный файл из этапа сборки
COPY --from=builder /app/account-service /usr/local/bin/account-service

EXPOSE 50052

CMD ["/usr/local/bin/account-service"]