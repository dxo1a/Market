FROM golang:1.23.6-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o auth-service ./cmd

###

FROM alpine:3.20

RUN apk add --no-cache ca-certificates

# Копируем скомпилированный бинарный файл из этапа сборки
COPY --from=builder /app/auth-service /usr/local/bin/auth-service

EXPOSE 50051

CMD ["/usr/local/bin/auth-service"]