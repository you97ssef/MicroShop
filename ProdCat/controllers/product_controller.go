package controllers

import (
	"ProdCat/dtos"
	"ProdCat/models"

	"github.com/gin-gonic/gin"
)

func (ctl *Controller) NewProduct(c *gin.Context) {
	var product dtos.NewProduct

	if err := c.ShouldBindJSON(&product); err != nil {
		BadRequest(c, err.Error())
		return
	}

	var p models.Product = models.Product{
		Name:         product.Name,
		Description:  product.Description,
		Price:        product.Price,
		CategoryID:   product.CategoryID,
		Availability: product.Availability,
	}

	ctl.Server.Data.Create(&p)

	Created(c, p, "Product created successfully")
}

func (ctl *Controller) UpdateProduct(c *gin.Context) {
	var product dtos.UpdateProduct

	if err := c.ShouldBindJSON(&product); err != nil {
		BadRequest(c, err.Error())
		return
	}

	ip := c.Param("id")

	var p models.Product

	if err := ctl.Server.Data.First(&p, ip).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	if product.Name != nil {
		p.Name = *product.Name
	}
	if product.Description != nil {
		p.Description = *product.Description
	}
	if product.Price != nil {
		p.Price = *product.Price
	}
	if product.Availability != nil {
		p.Availability = *product.Availability
	}
	if product.CategoryID != nil {
		p.CategoryID = *product.CategoryID
	}

	ctl.Server.Data.Save(&p)

	NoContent(c)
}

func (ctl *Controller) DeleteProduct(c *gin.Context) {
	ip := c.Param("id")

	var p models.Product

	if err := ctl.Server.Data.First(&p, ip).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	ctl.Server.Data.Delete(&p)

	NoContent(c)
}

func (ctl *Controller) GetCategoryProducts(c *gin.Context) {
	ip := c.Param("id")

	var products []models.Product

	if err := ctl.Server.Data.Where("category_id = ?", ip).Find(&products).Error; err != nil {
		NotFound(c, err.Error())
		return
	}

	Ok(c, products, "Products found successfully")
}

func (ctl *Controller) ProductsByIds(c *gin.Context) {
	var ids []int

	if err := c.ShouldBindJSON(&ids); err != nil {
		BadRequest(c, err.Error())
		return
	}

	var products []models.Product

	if err := ctl.Server.Data.Where("id IN (?)", ids).Find(&products).Error; err != nil {
		NotFound(c, err.Error())
		return
	}


	Ok(c, products, "Products found successfully")
}