package services

import (
	"fmt"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Jwt struct {
	SecretKey string
}

func (js *Jwt) GenerateToken(claims jwt.MapClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(js.SecretKey))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func (js *Jwt) VerifyToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(js.SecretKey), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, fmt.Errorf("invalid token")
}

func (js *Jwt) VerifyTokenFromGinContext(c *gin.Context) (jwt.MapClaims, error) {
	auth := c.GetHeader("Authorization")

	if len(auth) == 0 {
		return nil, fmt.Errorf("no token provided")
	}

	token := strings.Replace(auth, "Bearer ", "", 1)

	claims, err := js.VerifyToken(token)

	if err != nil {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
