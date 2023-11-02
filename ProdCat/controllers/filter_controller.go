package controllers

import (
	"ProdCat/models"

	"github.com/gin-gonic/gin"
)

func (ctl *Controller) Search(c *gin.Context) {
	query := c.Query("q")

	if query == "" {
		BadRequest(c, "Missing query parameter")
		return
	}

	var categories []models.Category

	ctl.Server.Data.Where("name LIKE ?", "%"+query+"%").Find(&categories)

	var products []models.Product

	ctl.Server.Data.Where("name LIKE ?", "%"+query+"%").Find(&products)

	Ok(
		c,
		gin.H{
			"categories": categories,
			"products":   products,
		},
		"Search results",
	)
}


func (ctl *Controller) Filter(c *gin.Context) {
	max := c.Query("max")
	min := c.Query("min")

	if max == "" || min == "" {
		BadRequest(c, "Missing query parameter")
		return
	}

	var products []models.Product

	ctl.Server.Data.Where("price >= ? AND price <= ?", min, max).Find(&products)

	Ok(c, products,	"Filter results")
}