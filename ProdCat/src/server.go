package src

import (
	"time"

	"ProdCat/src/services"
	"ProdCat/src/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Server struct {
	Router     *gin.Engine
	Logger     *services.Logger
	Config     *utils.Config
	Context    *gorm.DB
	Filesystem *services.Filesystem
	Mailer     *services.Mailer
	Hasher     *services.Hasher
	Jwt        *services.Jwt
	Globals    map[string]interface{}
}

func (s *Server) Run() {
	s.Router.Run(":" + s.Config.Port)
}

func (s *Server) Initialize(envFile string) {
	location, _ := time.LoadLocation(time.UTC.String())
	time.Local = location

	s.Filesystem = &services.Filesystem{}

	var environment interface{} = nil

	s.Filesystem.ReadJSONFromFile(envFile, &environment)

	s.Config = &utils.Config{
		Port:               environment.(map[string]interface{})["config"].(map[string]interface{})["port"].(string),
		LogFile:            environment.(map[string]interface{})["config"].(map[string]interface{})["log_file"].(string),
		DatabaseConnection: environment.(map[string]interface{})["config"].(map[string]interface{})["database_connection"].(string),
	}

	s.Globals = make(map[string]interface{})

	s.Logger = &services.Logger{
		Src: s.Config.LogFile,
	}

	s.Mailer = &services.Mailer{
		Host:     environment.(map[string]interface{})["mailer"].(map[string]interface{})["host"].(string),
		Port:     environment.(map[string]interface{})["mailer"].(map[string]interface{})["port"].(string),
		Username: environment.(map[string]interface{})["mailer"].(map[string]interface{})["username"].(string),
		Password: environment.(map[string]interface{})["mailer"].(map[string]interface{})["password"].(string),
	}

	s.Hasher = &services.Hasher{
		Cost: int(environment.(map[string]interface{})["hasher"].(map[string]interface{})["cost"].(float64)),
	}

	s.Jwt = &services.Jwt{
		SecretKey: environment.(map[string]interface{})["jwt"].(map[string]interface{})["secret_key"].(string),
	}

	checkSetup(s)

	s.Context, _ = gorm.Open(sqlite.Open(s.Config.DatabaseConnection), &gorm.Config{})
	s.Context.AutoMigrate()

	s.Router = gin.Default()
}

func checkSetup(s *Server) {
	checkFile(s, s.Config.LogFile)
	checkFile(s, s.Config.DatabaseConnection)
}

func checkFile(s *Server, file string) error {
	if !s.Filesystem.FileExists(file) {
		return s.Filesystem.CreateEmptyFile(file)
	}

	return nil
}
