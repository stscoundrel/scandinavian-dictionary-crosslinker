package sitemaps

import (
	"encoding/xml"
)

func parseSitemap(rawSitemaps map[string][]byte) map[string][]string {
	dictionaryLinks := map[string][]string{}

	for language, rawSitemap := range rawSitemaps {
		var rawEntries Sitemap
		xml.Unmarshal(rawSitemap, &rawEntries)

		links := []string{}

		for _, link := range rawEntries.Entries {
			links = append(links, link.Location)
		}

		dictionaryLinks[language] = links
	}

	return dictionaryLinks
}
