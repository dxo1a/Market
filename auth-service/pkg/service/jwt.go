package service

import (
	"market/auth-service/config"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(email string) (string, error) {
	claims := &jwt.StandardClaims{
		Subject:   email,
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.JWTKey)
}
