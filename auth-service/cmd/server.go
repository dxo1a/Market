package main

import (
	"fmt"
	"log"
	"net"

	"market/auth-service/config"
	"market/auth-service/pkg/handlers"
	"market/auth-service/pkg/repository"
	pb "market/auth-service/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

type AuthServiceServer struct {
	pb.UnimplementedMarketServiceServer
}

func init() {
	var err error
	dsn := "host=" + config.DB_HOST + " user=" + config.DB_USER + " password=" + config.DB_PASSWORD + " dbname=" + config.DB_NAME + " port=5432 sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	repository.Migrate(db)
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Ошибка запуска auth-service: %v", err)
	}

	handler := &handlers.AuthHandler{DB: db}

	grpcServer := grpc.NewServer()
	pb.RegisterMarketServiceServer(grpcServer, handler)
	reflection.Register(grpcServer)

	fmt.Println("gRPC (auth-service) успешно запущен. Порт: 50051")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Ошибка запуска gRPC (auth-service): %v", err)
	}
}
