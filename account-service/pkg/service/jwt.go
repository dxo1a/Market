package service

import (
	"context"
	"errors"
	"market/account-service/config"
	"strings"

	"github.com/golang-jwt/jwt"
	"google.golang.org/grpc/metadata"
)

// CustomClaims для валидации токена
type CustomClaims struct {
	UserID   uint   `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.StandardClaims
}

// TokenClaims структура для возврата информации о пользователе
type TokenClaims struct {
	UserID   uint
	Username string
	Email    string
}

// VerifyToken проверяет токен и возвращает TokenClaims с user_id, email и username
func VerifyToken(ctx context.Context) (*TokenClaims, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("metadata отсутствует")
	}

	authHeader, exists := md["authorization"]
	if !exists || len(authHeader) == 0 {
		return nil, errors.New("authorization заголовок отсутствует")
	}

	tokenString := strings.TrimPrefix(authHeader[0], "Bearer ")
	if tokenString == authHeader[0] {
		return nil, errors.New("неверный формат токена")
	}

	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.JWT_SECRET), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, errors.New("неверный токен")
	}

	// Возвращаем TokenClaims с нужными данными
	return &TokenClaims{
		UserID:   claims.UserID,
		Username: claims.Username,
		Email:    claims.Email,
	}, nil
}
