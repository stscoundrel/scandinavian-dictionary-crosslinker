package sitemaps

import "os"

var sitemapPaths = map[string]string{
	"old-norse":     "../resources/old-norse.xml",
	"old-icelandic": "../resources/old-icelandic.xml",
	"old-norwegian": "../resources/old-norwegian.xml",
	"old-swedish":   "../resources/old-swedish.xml",
}

func readXmlSitemaps() (map[string][]byte, error) {
	sitemaps := map[string][]byte{}

	for language, sitemapPath := range sitemapPaths {
		content, err := os.ReadFile(sitemapPath)

		if err != nil {
			return sitemaps, err
		}

		sitemaps[language] = content
	}

	return sitemaps, nil
}
