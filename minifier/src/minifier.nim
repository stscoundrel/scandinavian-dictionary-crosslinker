import std/json
import std/enumerate
import std/strutils
import zippy

var originalJsonContent = parseFile("../resources/crosslinks.json")
var jsonContent = parseFile("../resources/crosslinks.json")


proc minify_link(link: string): string =
  return link
    .replace("https://old-icelandic.vercel.app/word/", "")
    .replace("https://old-norwegian-dictionary.vercel.app/word/", "")
    .replace("https://old-swedish-dictionary.vercel.app/word/", "")
    .replace("https://cleasby-vigfusson-dictionary.vercel.app/word/", "")


proc minify_source(link: string): string =
  return link
    .replace("old-norwegian", "onr")
    .replace("old-swedish", "os")
    .replace("old-norse", "on")
    .replace("old-icelandic", "oi")


for slug, links in jsonContent:
  # Minify content.
  for index, link in enumerate(links):
    jsonContent[slug][index]["a"] = newJString(minify_link(link["url"].getStr()))
    jsonContent[slug][index]["b"] = newJString(minify_source(link["source"].getStr()))

    # Drop old content keys.
    jsonContent[slug][index].delete("url")
    jsonContent[slug][index].delete("source")


# Minify & save.
var minified = ""
toUgly(minified, jsonContent)
writeFile("../resources/crosslinks.min.json", minified)

# Also save gzipped variants.
writeFile("../resources/crosslinks.json.gz", compress($originalJsonContent, BestSpeed, dfGzip))
writeFile("../resources/crosslinks.min.json.gz", compress(minified, BestSpeed, dfGzip))
