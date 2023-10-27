package services

import (
	"fmt"
	"net/smtp"
)

type Mailer struct {
	Username string
	Password string
	Host     string
	Port     string
}

func (es *Mailer) SendEmail(to []string, subject, body string) error {
	auth := smtp.PlainAuth("", es.Username, es.Password, es.Host)

	msg := fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Subject: %s\r\n"+
		"\r\n"+
		"%s\r\n", es.Username, to, subject, body)

	err := smtp.SendMail(es.Host+":"+es.Port, auth, es.Username, to, []byte(msg))
	if err != nil {
		return err
	}

	return nil
}
