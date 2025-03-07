package handlers

import (
	"context"
	"market/account-service/pkg/repository"

	pb "market/account-service/proto"

	"gorm.io/gorm"
)

type AccountHandler struct {
	DB *gorm.DB
	pb.UnimplementedAccountServiceServer
}

// Миграция для профилей
func Migrate(db *gorm.DB) {
	repository.Migrate(db)
}

func (h *AccountHandler) GetProfile(ctx context.Context, req *pb.GetProfileRequest) (*pb.GetProfileResponse, error) {
	userID := uint(req.UserId)
	profile, err := repository.GetProfile(h.DB, userID)
	if err != nil {
		return nil, err
	}
	return &pb.GetProfileResponse{
		UserId:    req.UserId,
		FirstName: profile.FirstName,
		LastName:  profile.LastName,
		Email:     profile.Email,
		Phone:     profile.Phone,
		Address:   profile.Address,
	}, nil
}

func (h *AccountHandler) UpdateProfile(ctx context.Context, req *pb.UpdateProfileRequest) (*pb.UpdateProfileResponse, error) {
	userID := uint(req.UserId)
	profile, err := repository.GetProfile(h.DB, userID)
	if err != nil {
		// Если профиль не найден — создаем новый
		newProfile := &repository.Profile{
			UserID:    userID,
			FirstName: req.FirstName,
			LastName:  req.LastName,
			Email:     req.Email,
			Phone:     req.Phone,
			Address:   req.Address,
		}
		if _, err := repository.CreateProfile(h.DB, newProfile); err != nil {
			return nil, err
		}
	} else {
		// Обновляем существующий профиль
		profile.FirstName = req.FirstName
		profile.LastName = req.LastName
		profile.Email = req.Email
		profile.Phone = req.Phone
		profile.Address = req.Address
		if err := repository.UpdateProfile(h.DB, profile); err != nil {
			return nil, err
		}
	}
	return &pb.UpdateProfileResponse{Message: "Профиль обновлен успешно"}, nil
}
