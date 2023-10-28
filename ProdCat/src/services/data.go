package services

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Data struct {
	*gorm.DB
	Connection *string
}

type migration struct {
	gorm.Model
	Text string `json:"text"`
}

func (s *Data) Initialize()  {
	s.DB, _ = gorm.Open(sqlite.Open(*s.Connection), &gorm.Config{})
	
	s.AutoMigrate(&migration{})
	s.Migrate("migrations", &migration{})
}

func (s *Data) checkMigration(text string) bool {
	var migration migration
	s.First(&migration, "text = ?", text)
	return migration.ID > 0
}

func (s *Data) Migrate(text string, model interface{}) {
	if s.checkMigration(text) {
		return
	}

	s.Create(&migration{Text: text})
	s.AutoMigrate(model)
}

func (s *Data) Seed(text string, factory func() interface{}, q int) {
	text = "seed-" + text

	if s.checkMigration(text) {
		return
	}

	s.Create(&migration{Text: text})

	for i := 0; i < q; i++ {
		model := factory()
		s.Create(model)
	}
}
