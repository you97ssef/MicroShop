package models

import (
	"ProdCat/src/utils"

	"gorm.io/gorm"
)

type Category struct {
	Name        string  `json:"name"`
	Description *string `json:"description"`
	Image       *string `json:"image"`

	gorm.Model
}

func CategoryFactory() interface{} {
	return &Category{
		Name:        "Category-" + utils.RandomString(3),
		Description: nil,
		Image:       nil,
	}
}
