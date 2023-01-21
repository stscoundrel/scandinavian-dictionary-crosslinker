package sitemaps

import (
	"encoding/xml"
)

func parseSitemap(rawSitemaps map[string][]byte) map[string][]Link {
	dictionaryLinks := map[string][]Link{}

	for language, rawSitemap := range rawSitemaps {
		var rawEntries Sitemap
		xml.Unmarshal(rawSitemap, &rawEntries)

		dictionaryLinks[language] = rawEntries.Entries
	}

	return dictionaryLinks
}
