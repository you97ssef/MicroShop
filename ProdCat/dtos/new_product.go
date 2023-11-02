package dtos

type NewProduct struct {
	Name         string  `json:"name" binding:"required"`
	Description  string  `json:"description" binding:"required"`
	Price        float32 `json:"price" binding:"required"`
	Availability int     `json:"availability" binding:"required"`
	CategoryID   int     `json:"category_id" binding:"required"`
}

