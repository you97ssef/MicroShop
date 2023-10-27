package middleware

import "github.com/gin-gonic/gin"

func (m *Middleware) TestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// before request

		c.Next()

		// after request
	}
}