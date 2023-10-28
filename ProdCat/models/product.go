package models

import (
	"ProdCat/src/utils"

	"gorm.io/gorm"
)

type Product struct {
	Name         string  `json:"name"`
	Description  string  `json:"description"`
	Price        float32 `json:"price"`
	Image        *string `json:"image"`
	Availability int     `json:"availability"`
	CategoryID   int     `json:"category_id"`

	gorm.Model
}

func ProductFactory() interface{} {
	categories := 10

	return &Product{
		Name:         "Product-" + utils.RandomString(3),
		Description:  "Description-" + utils.RandomString(10),
		Price:        utils.RandomFloat(1, 100),
		Image:        nil,
		Availability: utils.RandomInt(0, 100),
		CategoryID:   utils.RandomInt(1, categories),
	}
}
