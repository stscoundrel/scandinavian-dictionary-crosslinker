package main

import "os"

func fileExists(filepath string) bool {
	info, err := os.Stat(filepath)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

func deleteFile(filepath string) error {
	return os.Remove(filepath)
}

func deleteIfExists(filepath string) {
	if fileExists(filepath) {
		deleteFile(filepath)
	}
}
