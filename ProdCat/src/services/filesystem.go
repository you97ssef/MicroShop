package services

import (
	"encoding/json"
	"io"
	"os"
	"path/filepath"
)

type Filesystem struct {
}

func (f *Filesystem) FileExists(path string) bool {
	_, err := os.Stat(path)

	return err == nil
}

func (f *Filesystem) CreateEmptyFile(path string) error {
	err := os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		return err
	}

	file, err := os.Create(path)

	if err != nil {
		return err
	}
	
	defer file.Close()
	
	return nil
}

func (f *Filesystem) CreateJSONFile(path string, data interface{}) error {
	err := os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		return err
	}
	
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	jsonData, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}

	_, err = file.Write(jsonData)
	if err != nil {
		return err
	}

	return nil
}

func (f *Filesystem) ReadJSONFromFile(path string, target interface{}) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	jsonData, err := io.ReadAll(file)
	if err != nil {
		return err
	}

	err = json.Unmarshal(jsonData, target)
	if err != nil {
		return err
	}

	return nil
}
