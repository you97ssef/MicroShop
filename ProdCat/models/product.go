package models

import (
	"ProdCat/src"
	"ProdCat/src/utils"
	"fmt"

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

func SeedProduct(s *src.Server, q int, categories int) {
	for i := 0; i < q; i++ {
		p := Product{
			Name:         "Product-" + fmt.Sprint(i),
			Description:  "Description-" + utils.RandomString(10),
			Price:        utils.RandomFloat(1, 100),
			Image:        nil,
			Availability: utils.RandomInt(0, 100),
			CategoryID:   utils.RandomInt(1, categories),
		}

		s.Context.Create(&p)
	}
}
