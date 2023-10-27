package services

import (
	"fmt"
	"os"
	"time"
)

type Logger struct {
	Src string
}

func (l *Logger) writeToFile(message string) {
	file, _ := os.OpenFile(l.Src, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	defer file.Close()

	file.WriteString(message + "\n")
}

func (l *Logger) log(message interface{}, c string, t string) {
	message = "[ " + t + " - " + time.Now().Format("02/01/2006 15:04:05") + " ] - " + fmt.Sprintf("%v", message)

	l.writeToFile(fmt.Sprintf("%v", message))

	fmt.Println("\033[" + c + fmt.Sprintf("%v", message) + "\033[0m")
}

const (
	info    = "32m"
	alert   = "31m"
	warning = "33m"
)

func (l *Logger) Info(message interface{}) {
	l.log(message, info, "Info")
}

func (l *Logger) Alert(message interface{}) {
	l.log(message, alert, "Alert")
}

func (l *Logger) Warning(message interface{}) {
	l.log(message, warning, "Warning")
}
