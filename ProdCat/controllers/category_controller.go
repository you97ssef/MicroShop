package controllers

import (
	"ProdCat/dtos"
	"ProdCat/models"

	"github.com/gin-gonic/gin"
)

func (ctl *Controller) NewCategory(c *gin.Context) {
	var category dtos.NewCategory

	if err := c.ShouldBindJSON(&category); err != nil {
		BadRequest(c, err.Error())
		return
	}

	var cat models.Category = models.Category{
		Name:        category.Name,
		Description: category.Description,
		Image:       category.Image,
	}

	ctl.Server.Data.Create(&cat)

	Created(c, cat, "Created category successfully!")
}

func (ctl *Controller) UpdateCategory(c *gin.Context) {
	ip := c.Param("id")

	var category dtos.UpdateCategory

	if err := c.ShouldBindJSON(&category); err != nil {
		BadRequest(c, err.Error())
		return
	}

	var cat models.Category

	if err := ctl.Server.Data.First(&cat, ip).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	if category.Name != nil {
		cat.Name = *category.Name
	}
	if category.Description != nil {
		cat.Description = category.Description
	}
	if category.Image != nil {
		cat.Image = category.Image
	}

	ctl.Server.Data.Save(&cat)

	NoContent(c)
}

func (ctl *Controller) DeleteCategory(c *gin.Context) {
	ip := c.Param("id")

	var cat models.Category

	if err := ctl.Server.Data.First(&cat, ip).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	ctl.Server.Data.Delete(&cat)

	NoContent(c)
}

func (ctl *Controller) GetCategories(c *gin.Context) {
	var categories []models.Category

	if err := ctl.Server.Data.Find(&categories).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	Ok(c, categories, "Retrieved categories successfully!")
}
