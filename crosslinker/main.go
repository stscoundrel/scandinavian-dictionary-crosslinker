package main

import (
	"fmt"

	"github.com/stscoundrel/scandinavian-dictionary-crosslinker/internal/crosslinks"
	"github.com/stscoundrel/scandinavian-dictionary-crosslinker/internal/sitemaps"
)

func main() {
	sitemapData := sitemaps.GetSitemaps()
	result := crosslinks.GetCrosslinks(sitemapData)

	for slug, links := range result {
		fmt.Println(slug)
		for _, link := range links {
			fmt.Println(link.Url)
		}
	}

	fmt.Println(len(result))
}
