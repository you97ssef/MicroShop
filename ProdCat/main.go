package main

import (
	"ProdCat/controllers"
	"ProdCat/middleware"
	"ProdCat/models"
	"ProdCat/routes"
	"ProdCat/src"
)

func main() {
	server := &src.Server{}

	server.Initialize("./environment.json")

	models.Migrate(server)
	models.Seed(server)

	models.InitGlobals(server)

	controllers := &controllers.Controller{
		Server: server,
	}

	routes := &routes.Routes{
		Server: server,
	}

	middleware := &middleware.Middleware{
		Server: server,
	}

	routes.RegisterCors()
	routes.RegisterRoutes(controllers, middleware)

	server.Run()
}
