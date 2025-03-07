package handlers

import (
	"context"
	"errors"
	"fmt"
	"market/account-service/pkg/repository"
	"market/account-service/pkg/service"
	"reflect"

	pb "market/account-service/proto"

	"gorm.io/gorm"
)

type AccountHandler struct {
	DB *gorm.DB
	pb.UnimplementedAccountServiceServer
}

func Migrate(db *gorm.DB) {
	repository.Migrate(db)
}

func (h *AccountHandler) GetProfile(ctx context.Context, req *pb.EmptyRequest) (*pb.GetProfileResponse, error) {
	tokenClaims, err := service.VerifyToken(ctx)
	if err != nil {
		return nil, fmt.Errorf("ошибка авторизации: %v", err)
	}

	profile, err := repository.GetProfile(h.DB, tokenClaims.UserID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("профиль не найден")
		}
		return nil, err
	}

	return &pb.GetProfileResponse{
		FirstName: profile.FirstName,
		LastName:  profile.LastName,
		Email:     profile.Email,
		Phone:     profile.Phone,
		Address:   profile.Address,
	}, nil
}

func (h *AccountHandler) UpdateProfile(ctx context.Context, req *pb.UpdateProfileRequest) (*pb.UpdateProfileResponse, error) {
    // данные пользователя из токена (userID, username, email)
    tokenClaims, err := service.VerifyToken(ctx)
    if err != nil {
        return nil, fmt.Errorf("ошибка авторизации: %v", err)
    }

    // проверка уникальности для email, phone, username
    var existing repository.Profile

    // проверка email
    if req.Email != "" {
		var existing repository.Profile
		if err := h.DB.
			Where("email = ? AND user_id <> ?", req.Email, tokenClaims.UserID).
			FirstOrCreate(&existing).Error; err != nil {
			return nil, fmt.Errorf("ошибка при проверке email: %v", err)
		}
		if existing.ID != 0 {
			return nil, errors.New("почта уже используется другим пользователем")
		}
	}

    // проверка phone
	if req.Phone != "" {
		var existing repository.Profile
		if err := h.DB.
			Where("phone = ? AND user_id <> ?", req.Phone, tokenClaims.UserID).
			FirstOrCreate(&existing).Error; err != nil {
			return nil, fmt.Errorf("ошибка при проверке номера телефона: %v", err)
		}
		if existing.ID != 0 {
			return nil, errors.New("номер телефона уже используется другим пользователем")
		}
	}

    // проверка username
    if req.Username != "" {
		var existing repository.Profile
		if err := h.DB.
			Where("username = ? AND user_id <> ?", req.Username, tokenClaims.UserID).
			FirstOrCreate(&existing).Error; err != nil {
			return nil, fmt.Errorf("ошибка при проверке имени пользователя: %v", err)
		}
		if existing.ID != 0 {
			return nil, errors.New("имя пользователя уже используется другим пользователем")
		}
	}

    // получаем профиль текущего пользователя по userID, извлечённому из токена
    profile, err := repository.GetProfile(h.DB, tokenClaims.UserID)
    if errors.Is(err, gorm.ErrRecordNotFound) {
        // если профиль не найден, создаем новый
        newProfile := &repository.Profile{
            UserID:    tokenClaims.UserID,
            FirstName: req.FirstName,
            LastName:  req.LastName,
            Email:     tokenClaims.Email,
            Username:  tokenClaims.Username,
            Phone:     req.Phone,
            Address:   req.Address,
        }
        if _, err := repository.CreateProfile(h.DB, newProfile); err != nil {
            return nil, err
        }
        return &pb.UpdateProfileResponse{Message: "Профиль создан успешно"}, nil
    } else if err != nil {
        return nil, err
    }

    // reflect для обновления только переданных полей
    reqVal := reflect.ValueOf(req).Elem()
    profileVal := reflect.ValueOf(profile).Elem()

    for i := 0; i < reqVal.NumField(); i++ {
        fieldName := reqVal.Type().Field(i).Name
        reqField := reqVal.Field(i)

        if reqField.IsValid() && !reqField.IsZero() {
            profileField := profileVal.FieldByName(fieldName)
            if profileField.IsValid() && profileField.CanSet() {
                profileField.Set(reqField)
            }
        }
    }

    // обновляем профиль с новыми значениями
    if err := repository.UpdateProfile(h.DB, profile); err != nil {
        return nil, err
    }

    return &pb.UpdateProfileResponse{Message: "Профиль обновлен успешно"}, nil
}