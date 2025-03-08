package service

import (
	"fmt"
	"market/auth-service/config"
	"time"

	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	UserID uint `json:"user_id"`
	Username string `json:"username"`
	Email string `json:"email"`
	jwt.StandardClaims
}

func GenerateJWT(userID uint, username, email string) (string, error) {
	claims := &CustomClaims{
		UserID:   userID,
		Username: username,
		Email:    email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
			Subject:   fmt.Sprintf("%d", userID), // для совместимости можно оставить Subject
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.JWTKey)
}
