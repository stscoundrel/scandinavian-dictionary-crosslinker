package crosslinks

import (
	"path"
	"regexp"
	"strings"
)

type Link struct {
	Url    string `json:"url"`
	Slug   string `json:"-"` // No JSON output.
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

func dropDoubles(crosslinks map[string][]Link) map[string][]Link {
	filtered := map[string][]Link{}

	// Manual crossappends may add doubles if more than two alternative slugs
	// Just drop extras.
	for slug, links := range crosslinks {
		uniques := []Link{}

		for _, link := range links {
			exists := false
			for _, unique := range uniques {
				if link == unique {
					exists = true
				}
			}

			if !exists {
				uniques = append(uniques, link)
			}
		}

		filtered[slug] = uniques
	}

	return filtered
}

func appendManualLinks(crosslinks map[string][]Link, manualLinks map[string]string) map[string][]Link {
	for firstSlug, secondSlug := range manualLinks {
		link1 := crosslinks[firstSlug]
		link2 := crosslinks[secondSlug]

		// Crossinject as valid sources for each other.
		crosslinks[firstSlug] = append(crosslinks[firstSlug], link2...)
		crosslinks[secondSlug] = append(crosslinks[secondSlug], link1...)
	}

	return crosslinks
}

func GetCrosslinks(sitemaps map[string][]string) map[string][]Link {
	crosslinks := map[string][]Link{}
	sitemapLinks := parseLinks(sitemaps)

	for _, links := range sitemapLinks {
		for _, link := range links {
			// Sanity: no numbers or very short slugs.
			if !regexp.MustCompile(`\d`).MatchString(link.Slug) && len(link.Slug) > 2 {
				// Should the slug contain dash, try to append dashless version too.
				// It is likely to produce additional match later on.
				// If not, it will anyway be dropped as "lone link" before return.
				if strings.Contains(link.Slug, "-") {
					dashless := strings.Replace(link.Slug, "-", "", -1)
					crosslinks[dashless] = append(crosslinks[dashless], link)
				}

				crosslinks[link.Slug] = append(crosslinks[link.Slug], link)
			}
		}
	}

	manualLinks := getManualAliases()

	return dropEmpties(dropDoubles(appendManualLinks(crosslinks, manualLinks)))
}
