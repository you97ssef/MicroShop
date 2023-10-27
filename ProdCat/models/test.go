package models

import (
	"ProdCat/src"

	"gorm.io/gorm"
)

type Test struct {
	Text string `json:"text"`
	gorm.Model
}

func SeedTest(s *src.Server, q int) {
	for i := 0; i < q; i++ {
		s.Context.Create(&Test{Text: "test"})
	}
}
