package models

import (
	"ProdCat/src"

	"gorm.io/gorm"
)

func Migrate(s *src.Server) {
	s.Context.AutoMigrate(&Test{})
}

func Seed(s *src.Server) {
	if CheckMigration(s, "seed") {
		return
	}

	CreateMigration(s, "seed")

	SeedTest(s, 100)
}

func InitGlobals(s *src.Server) {
	s.Globals["test"] = "test"
}

type migration struct {
	gorm.Model
	Text string `json:"text"`
}

func CreateMigration(s *src.Server, text string) {
	s.Context.Create(&migration{Text: text})
}

func CheckMigration(s *src.Server, text string) bool {
	var migration migration
	s.Context.First(&migration, "text = ?", text)
	return migration.ID > 0
}
