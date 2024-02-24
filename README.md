# Scandinavian dictionary crosslinker

Finds shared entries in sitemaps of linguistically related dictionaries. Builds a mapping of relations that allows individual dictionaries to crosslink to related sources. Usually having same word in multiple dictionaries of different languages would not be too helpful, but in case of scandinavian languages from 8th to 16th century all of the languages are closely enough related to be useful as crossreference.

Parses sources from following dictionary projects:
- [Old Norse Dictionary](https://cleasby-vigfusson-dictionary.vercel.app/)
- [Old Icelandic Dictionary](https://old-icelandic.vercel.app/)
- [Old Norwegian Dictionary](https://old-norwegian-dictionary.vercel.app/)
- [Old Swedish Dictionary](https://old-swedish-dictionary.vercel.app/)
- [Old Danish Dictionary](https://old-danish-dictionary.vercel.app/)


The parser finds over 1 000 entries that are present in all four dictionaries. There are also over 20 000 entries that appear in at least two different dictionaries, making them worth a crosslink.

### Install

`yarn add scandinavian-dictionary-crosslinker`


### Download sitemaps.

Run `cargo run` in `downloader` folder. Downloads latest XML sitemaps to `resources` folder.