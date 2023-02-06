package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

var BUILD_RESOURCE_PATH = "resources/crosslinks.min.json"
var NPM_RESOURCE_PATH = "npm-module/resources/crosslinks.json"
var README_PATH = "README.md"
var NPM_README_PATH = "npm-module/README.md"

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

func copyFile(source string, destination string) error {
	sourceBytes, err := ioutil.ReadFile(source)

	if err != nil {
		return err
	}

	err = ioutil.WriteFile(destination, sourceBytes, 0644)

	return err
}

func updateResourceFile(source string, destination string) {
	if fileExists(destination) {
		deleteError := deleteFile(destination)
		if deleteError != nil {
			fmt.Println(deleteError)
		}
	}

	copyError := copyFile(source, destination)

	if copyError != nil {
		fmt.Println(copyError)
	} else {
		fmt.Println("Updated " + destination + " resource!")
	}
}

func main() {
	updateResourceFile(BUILD_RESOURCE_PATH, NPM_RESOURCE_PATH)
	updateResourceFile(README_PATH, NPM_README_PATH)
}
