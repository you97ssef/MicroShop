package utils

import (
	"math/rand"
	"time"
)

// Numbers
func RandomInt(min, max int) int {
	return min + rand.Intn(max-min)
}

func RandomFloat(min, max float32) float32 {
	return min + rand.Float32()*(max-min)
}

// Strings
func RandomString(length int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	b := make([]rune, length)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func RandomStringWithCharset(length int, charset string) string {
	var letters = []rune(charset)
	b := make([]rune, length)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

// Date
func RandomDate(start, end time.Time) time.Time {
	return start.Add(time.Duration(rand.Int63n(end.Unix()-start.Unix())) * time.Second)
}

// Bool
func RandomBool() bool {
	return rand.Intn(2) == 1
}
