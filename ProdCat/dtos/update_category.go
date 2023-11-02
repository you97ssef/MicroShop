package dtos

type UpdateCategory struct {
	Name        *string `json:"name" binding:"omitempty"`
	Description *string `json:"description" binding:"omitempty"`
	Image       *string `json:"image" binding:"omitempty"`
}
