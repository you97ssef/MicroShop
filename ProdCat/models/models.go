package models

import "ProdCat/src"

func Migrate(s *src.Server) {
	s.Data.Migrate("categories", &Category{})
	s.Data.Migrate("products", &Product{})
}

func Seed(s *src.Server) {
	if s.Config.Mode != "production" {
		s.Data.Seed("categories", CategoryFactory, 20)
		s.Data.Seed("products", ProductFactory, 200)
	} else {
		s.Data.Seed("categories", CategoryFactory, 10)
		s.Data.Seed("products", ProductFactory, 100)
	}
}
