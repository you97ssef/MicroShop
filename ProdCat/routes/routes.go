package routes

import (
	"time"

	"ProdCat/controllers"
	"ProdCat/middleware"
	"ProdCat/src"

	"github.com/gin-contrib/cors"
)

type Routes struct {
	Server *src.Server
}

func (r *Routes) RegisterRoutes(c *controllers.Controller, m *middleware.Middleware) {
	api := r.Server.Router.Group("", m.TestMiddleware())
	api.GET("/", c.HelloWorld)

	api.GET("/categories", c.GetCategories)
	api.POST("/categories", c.NewCategory)
	api.PUT("/categories/:id", c.UpdateCategory)
	api.DELETE("/categories/:id", c.DeleteCategory)

	api.GET("/categories/:id/products", c.GetCategoryProducts)
	api.POST("/products", c.NewProduct)
	api.PUT("/products/:id", c.UpdateProduct)
	api.DELETE("/products/:id", c.DeleteProduct)

	api.GET("/search", c.Search)
}

func (r *Routes) RegisterCors() {
	r.Server.Router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "*"
		},
		MaxAge: 12 * time.Hour,
	}))
}
