package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"

	"github.com/stscoundrel/scandinavian-dictionary-crosslinker/internal/crosslinks"
	"github.com/stscoundrel/scandinavian-dictionary-crosslinker/internal/sitemaps"
)

func main() {
	sitemapData := sitemaps.GetSitemaps()
	result := crosslinks.GetCrosslinks(sitemapData)

	file, _ := json.MarshalIndent(result, "", " ")
	deleteIfExists("../resources/crosslinks.json")
	_ = ioutil.WriteFile("../resources/crosslinks.json", file, 0644)

	fmt.Println("Outputted " + strconv.Itoa(len(result)) + " crosslinks!")
}
