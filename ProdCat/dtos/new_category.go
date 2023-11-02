package dtos

type NewCategory struct {
	Name        string  `json:"name" binding:"required"`
	Description *string `json:"description" binding:"omitempty"`
	Image       *string `json:"image" binding:"omitempty"`
}
