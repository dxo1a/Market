package main

import (
	"fmt"
	"log"
	"net"

	"market/account-service/config"
	"market/account-service/pkg/handlers"
	pb "market/account-service/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	var err error
	dsn := "host=" + config.DB_HOST + " user=" + config.DB_USER +
		" password=" + config.DB_PASSWORD + " dbname=" + config.DB_NAME +
		" port=5432 sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	handlers.Migrate(db)
}

func main() {
	listener, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Ошибка запуска account-service: %v", err)
	}

	handler := &handlers.AccountHandler{DB: db}

	grpcServer := grpc.NewServer()
	pb.RegisterAccountServiceServer(grpcServer, handler)
	reflection.Register(grpcServer)

	fmt.Println("gRPC (account-service) успешно запущен. Порт: 50052")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Ошибка запуска gRPC (account-service): %v", err)
	}
}
