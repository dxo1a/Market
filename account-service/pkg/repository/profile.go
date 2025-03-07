package repository

import (
	"gorm.io/gorm"
)

type Profile struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    uint   `gorm:"uniqueIndex"` // Идентификатор пользователя из auth-service
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Phone     string
	Address   string
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Profile{})
}

func GetProfile(db *gorm.DB, userID uint) (*Profile, error) {
	var profile Profile
	if err := db.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		return nil, err
	}
	return &profile, nil
}

func CreateProfile(db *gorm.DB, profile *Profile) (*Profile, error) {
	if err := db.Create(profile).Error; err != nil {
		return nil, err
	}
	return profile, nil
}

func UpdateProfile(db *gorm.DB, profile *Profile) error {
	return db.Save(profile).Error
}
