package crosslinks

import (
	"path"
	"regexp"
)

type Link struct {
	Url    string `json:"url"`
	Slug   string `json:"slug"`
	Source string `json:"source"`
}

func parseLinks(sitemaps map[string][]string) map[string][]Link {
	parsedDictionaryLinks := map[string][]Link{}

	for language, links := range sitemaps {
		parsedLinks := []Link{}
		for _, link := range links {
			parsedLinks = append(parsedLinks, Link{link, path.Base(link), language})
		}

		parsedDictionaryLinks[language] = parsedLinks
	}

	return parsedDictionaryLinks
}

func dropEmpties(crosslinks map[string][]Link) map[string][]Link {
	filtered := map[string][]Link{}

	// Drop single links, ie. no cross links.
	for slug, links := range crosslinks {
		if len(links) > 1 {
			filtered[slug] = links
		}
	}

	return filtered
}

func GetCrosslinks(sitemaps map[string][]string) map[string][]Link {
	crosslinks := map[string][]Link{}
	sitemapLinks := parseLinks(sitemaps)

	for _, links := range sitemapLinks {
		for _, link := range links {
			if !regexp.MustCompile(`\d`).MatchString(link.Slug) {
				crosslinks[link.Slug] = append(crosslinks[link.Slug], link)
			}
		}
	}

	return dropEmpties(crosslinks)
}
