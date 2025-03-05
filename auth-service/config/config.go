package config

import (
	"fmt"
	"os"
)

var (
	JWTKey      []byte
	DB_HOST     string
	DB_USER     string
	DB_PASSWORD string
	DB_NAME     string
)

func init() {
	JWTKey = []byte(getEnv("JWT_SECRET", "a_gde_env_to_blyat"))
	DB_HOST = getEnv("DB_HOST", "a_gde_env_to_blyat")
	DB_USER = getEnv("DB_USER", "a_gde_env_to_blyat")
	DB_PASSWORD = getEnv("DB_PASSWORD", "a_gde_env_to_blyat")
	DB_NAME = getEnv("DB_NAME", "a_gde_env_to_blyat")

	if string(JWTKey) == "a_gde_env_to_blyat" {
		fmt.Println("Предупреждение: использование стандартного JWT_SECRET. Убедитесь, что .env существует и правильно подгружен.")
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
