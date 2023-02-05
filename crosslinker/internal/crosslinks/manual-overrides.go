package crosslinks

func getManualAliases() map[string]string {
	// Slugs. Generally west norse as key, east norse as value.
	return map[string]string{
		"afi":         "storfadhir",
		"aldri":       "aldrigh",
		"amma":        "stormodhir",
		"brodir":      "brodhir",
		"daudr":       "dodher",
		"drengskapr":  "dreng-skapr",
		"dreng-skapr": "drangskaper",
		"drengiligr":  "drangeliker",
		"drengr":      "dranger",
		"drepa":       "drapa",
		"dvergr":      "dvargher",
		"ekki":        "angin-2",
		"fadir":       "fadhir",
		"forfadir":    "forfadhir",
		"fostbrodir":  "fosterbrodhir",
		"fostrdottir": "fosterdottir",
		"fostrfadir":  "fosterfadhir",
		"fostrmodir":  "fostermodhir",
		"geirlaukr":   "hvitloker",
		"guddottir":   "gudhdottir",
		"gudfadir":    "gudhfadhir",
		"hvalr":       "hval",
		"hvitskinn":   "hvitskinande-2",
		"leikbrodir":  "lekbrodhir-3",
		"modir":       "modhir",
		"sambrodir":   "sambrodhir",
		"svaribrodir": "stalbrodhir",
		"stjopdottir": "stiupdottir",
		"stjopfadir":  "stiupfadhir",
		"stjopmodir":  "stiupmodhir",
		"tidindi":     "tidhing",
		// Note: east norse first to avoid duplicate key.
		"drangskaper": "drengskapr",
	}
}
