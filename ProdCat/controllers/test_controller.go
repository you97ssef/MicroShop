package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
)

func (ctl *Controller) HelloWorld(c *gin.Context) {
	grettings := "Hello World at " + time.Now().Local().Format("2006-01-02 15:04:05")

	ctl.Server.Logger.Info(grettings)

	Ok(c, ctl.Server.Globals, grettings)
}
