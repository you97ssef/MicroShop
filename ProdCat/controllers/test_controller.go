package controllers

import (
	"github.com/gin-gonic/gin"
)

func (ctl *Controller) HelloWorld(c *gin.Context) {
	grettings := "Hello World!"

	ctl.Server.Logger.Info(grettings)

	Ok(c, ctl.Server.Globals, "Hello World!")
}
