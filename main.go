package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

var BUILD_RESOURCE_PATH = "resources/crosslinks.json"
var NPM_RESOURCE_PATH = "npm-module/resources/crosslinks.json"

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

func main() {
	if fileExists(NPM_RESOURCE_PATH) {
		deleteError := deleteFile(NPM_RESOURCE_PATH)
		if deleteError != nil {
			fmt.Println(deleteError)
		}
	}

	// Replace with latest one from generated resources.
	copyError := copyFile(BUILD_RESOURCE_PATH, NPM_RESOURCE_PATH)

	if copyError != nil {
		fmt.Println(copyError)
	} else {
		fmt.Println("Updated crosslinks JSON resource to NPM module!")
	}
}
