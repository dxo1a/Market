package handlers

import (
	"context"

	"market/auth-service/pkg/repository"
	"market/auth-service/pkg/service"
	pb "market/auth-service/proto"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

type AuthHandler struct {
	pb.UnimplementedMarketServiceServer
	DB *gorm.DB
}

func (h *AuthHandler) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	_, err = repository.CreateUser(h.DB, req.Email, req.Username, string(hashedPassword))
	if err != nil {
		if err.Error() == "email_exists" {
			return nil, status.Errorf(codes.AlreadyExists, "пользователь с таким email уже существует")
		}
		if err.Error() == "username_exists" {
			return nil, status.Errorf(codes.AlreadyExists, "пользователь с таким username уже существует")
		}
		return nil, err
	}

	return &pb.RegisterResponse{
		Message: "Пользователь успешно зарегистрирован",
	}, nil
}

func (h *AuthHandler) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	var user *repository.User
	var err error

	if req.EmailOrUsername == "" {
		return nil, status.Errorf(codes.InvalidArgument, "требуется email или username")
	}

	// получаем пользователя по email или username
	user, err = repository.GetUserByEmailOrUsername(h.DB, req.EmailOrUsername)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "пользователь не найден")
	}

	// Проверка пароля
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "неправильный пароль")
	}

	// Генерация JWT токена
	token, err := service.GenerateJWT(user.ID, user.Username, user.Email)
	if err != nil {
		return nil, err
	}

	// Установка заголовков CORS
	header := metadata.New(map[string]string{
		"Set-Cookie":                       "token=" + token + "; Path=/; HttpOnly",
		"Access-Control-Allow-Origin":      "http://localhost:5173",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Methods":     "GET, POST, PUT, POST, OPTIONS",
		"Access-Control-Allow-Headers":     "Content-Type, Authorization",
	})
	grpc.SendHeader(ctx, header)

	// Возвращение токена
	return &pb.LoginResponse{
		Token: token,
	}, nil
}

func (h *AuthHandler) Logout(ctx context.Context, req *pb.LogoutRequest) (*pb.LogoutResponse, error) {
	header := metadata.New(map[string]string{
		"Set-Cookie": "auth_token=; Path=/; HttpOnly; Max-Age=0",
	})
	grpc.SendHeader(ctx, header)

	return &pb.LogoutResponse{
		Message: "Пользователь успешно вышел из системы",
	}, nil
}
