import std/json
import std/enumerate
import std/strutils

var jsonNode = parseFile("../resources/crosslinks.json")


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


for slug, links in jsonNode:
  # Minify content.
  for index, link in enumerate(links):
    jsonNode[slug][index]["a"] = newJString(minify_link(link["url"].getStr()))
    jsonNode[slug][index]["b"] = newJString(minify_source(link["source"].getStr()))

    # Drop old content keys.
    jsonNode[slug][index].delete("url")
    jsonNode[slug][index].delete("source")


# Minify & save.
var minified = ""
toUgly(minified, jsonNode)
writeFile("../resources/crosslinks.min.json", minified)