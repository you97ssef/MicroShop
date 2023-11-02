package dtos

type UpdateProduct struct {
	Name         *string  `json:"name" binding:"omitempty"`
	Description  *string  `json:"description" binding:"omitempty"`
	Price        *float32 `json:"price" binding:"omitempty"`
	Availability *int     `json:"availability" binding:"omitempty"`
	CategoryID   *int     `json:"category_id" binding:"omitempty"`
}
