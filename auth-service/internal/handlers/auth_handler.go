package handlers

import (
	"context"

	"Market/auth-service/internal/repository"
	"Market/auth-service/internal/service"
	pb "Market/auth-service/proto"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

type AuthHandler struct {
	pb.UnimplementedAuthServiceServer
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

	// Пытаемся найти пользователя по email или username
	if req.Email != "" || req.Username != "" {
		emailOrUsername := req.Email
		if emailOrUsername == "" {
			emailOrUsername = req.Username
		}

		// Получаем пользователя по email или username
		user, err = repository.GetUserByEmailOrUsername(h.DB, emailOrUsername)
		if err != nil {
			return nil, status.Errorf(codes.NotFound, "пользователь не найден")
		}
	} else {
		return nil, status.Errorf(codes.InvalidArgument, "требуется email или username")
	}

	// Проверка пароля
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "неправильный пароль")
	}

	// Генерация JWT токена
	token, err := service.GenerateJWT(user.Username) // Генерация по username (или можно использовать email)
	if err != nil {
		return nil, err
	}

	// Установка заголовков CORS
	header := metadata.New(map[string]string{
		"Set-Cookie":                       "auth_token=" + token + "; Path=/; HttpOnly",
		"Access-Control-Allow-Origin":      "*",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Methods":     "GET, POST, PUT, POST, OPTIONS",
		"Access-Control-Allow-Headers":     "Content-Type, Authorization",
	})
	grpc.SetHeader(ctx, header)

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
