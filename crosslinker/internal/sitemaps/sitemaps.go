package sitemaps

import "fmt"

type Link struct {
	Location string `xml:"loc"`
}

type Sitemap struct {
	Entries []Link `xml:"url"`
}

func GetSitemaps() map[string][]string {
	rawSitemap, err := readXmlSitemaps()

	if err != nil {
		fmt.Println(err)
	}

	return parseSitemap(rawSitemap)

}
