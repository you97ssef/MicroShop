package models

import (
	"ProdCat/src"
	"fmt"

	"gorm.io/gorm"
)

type Category struct {
	Name string `json:"name"`
	Description *string `json:"description"`
	Image *string `json:"image"`

	gorm.Model
}

func SeedCategory(s *src.Server, q int) {
	for i := 0; i < q; i++ {
		c := Category{
			Name: "Category-" + fmt.Sprint(i),
			Description: nil,
			Image: nil,
		}

		s.Context.Create(&c)
	}
}
