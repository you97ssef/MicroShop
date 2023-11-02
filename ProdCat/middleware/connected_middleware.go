package middleware

import (
	"ProdCat/controllers"

	"github.com/gin-gonic/gin"
)

func (m *Middleware) Connected() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := m.Server.Jwt.VerifyTokenFromGinContext(c)

		if err != nil {
			controllers.Unauthorized(c, err.Error())
			return
		}

		c.Set("claims", claims)

		c.Next()
	}
}