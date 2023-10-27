package controllers

import (
	"ProdCat/src"

	"net/http"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	Server *src.Server
}

func Ok(c *gin.Context, data any, message string) {
	if message == "" {
		message = "Ok"
	}

	c.JSON(http.StatusOK, gin.H{
		"message": message,
		"data":    &data,
	})
}

func Created(c *gin.Context, data any, message string) {
	if message == "" {
		message = "Created"
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": message,
		"data":    &data,
	})
}

func NoContent(c *gin.Context) {
	c.JSON(http.StatusNoContent, nil)
}

func BadRequest(c *gin.Context, message string) {
	if message == "" {
		message = "Bad Request"
	}

	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		"message": message,
	})
}

func Unauthorized(c *gin.Context, message string) {
	if message == "" {
		message = "Unauthorized"
	}

	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
		"message": message,
	})
}

func Forbidden(c *gin.Context, message string) {
	if message == "" {
		message = "Forbidden"
	}

	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
		"message": message,
	})
}

func NotFound(c *gin.Context, message string) {
	if message == "" {
		message = "Not Found"
	}

	c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
		"message": message,
	})
}

func Error(c *gin.Context, data any, message string) {
	if message == "" {
		message = "Error"
	}

	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
		"message": message,
		"data":    &data,
	})
}
