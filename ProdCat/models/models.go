package models

import "ProdCat/src"

func Migrate(s *src.Server) {
	s.Data.Migrate("categories", &Category{})
	s.Data.Migrate("products", &Product{})
}

func Seed(s *src.Server) {
	s.Data.Seed("categories", CategoryFactory, 100)
	s.Data.Seed("products", ProductFactory, 100)
}
