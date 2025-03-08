package config

import (
	"os"
)

var (
	DB_HOST     string
	DB_USER     string
	DB_PASSWORD string
	DB_NAME     string
	JWT_SECRET 	string
)

func init() {
	DB_HOST = getEnv("DB_HOST", "a_gde_env_to_blyat")
	DB_USER = getEnv("DB_USER", "a_gde_env_to_blyat")
	DB_PASSWORD = getEnv("DB_PASSWORD", "a_gde_env_to_blyat")
	DB_NAME = getEnv("DB_NAME", "a_gde_env_to_blyat")
	JWT_SECRET = getEnv("JWT_SECRET", "a_gde_env_to_blyat")
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
