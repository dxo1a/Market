package repository

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"uniqueIndex"`
	Username string `gorm:"uniqueIndex"`
	Password string
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&User{})
}

func CreateUser(db *gorm.DB, email, username, hashedPassword string) (*User, error) {
	var user User

	if err := db.Where("email = ?", email).First(&user).Error; err == nil {
		return nil, errors.New("email_exists")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	if err := db.Where("username = ?", username).First(&user).Error; err == nil {
		return nil, errors.New("username_exists")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	newUser := User{
		Email:    email,
		Username: username,
		Password: hashedPassword,
	}
	if err := db.Create(&newUser).Error; err != nil {
		return nil, err
	}
	return &newUser, nil
}

// Универсальный метод для получения пользователя по email или username
func GetUserByEmailOrUsername(db *gorm.DB, emailOrUsername string) (*User, error) {
	var user User

	if err := db.Where("email = ?", emailOrUsername).First(&user).Error; err == nil {
		fmt.Println("Пользователь вошёл по email:", user.Email)
		return &user, nil
	} else {
		fmt.Println("Пользователь не найден по email, вероятно он использует username.")
	}

	if err := db.Where("username = ?", emailOrUsername).First(&user).Error; err == nil {
		fmt.Println("Пользователь вошёл по username:", user.Username)
		return &user, nil
	} else {
		fmt.Println("Пользователь не найден по username, вероятно он использует email.")
	}

	return nil, fmt.Errorf("пользователь не найден по email или username")
}
