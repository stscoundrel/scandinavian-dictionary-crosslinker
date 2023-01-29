import path from 'path';
import { Crosslink, DictionarySource } from './models';
import { read } from './reader';

const JSON_PATH = path.join(`${__dirname}/../resources/crosslinks.json`);

export function getCrosslinks() : Record<string, Crosslink[]> {
  const content = read(JSON_PATH);
  const words = JSON.parse(content.toString());

  return words;
}

const filterCrosslinksByLanguage = (
  slug: string,
  source: DictionarySource,
): Crosslink[] => getCrosslinks()[slug]
  .filter((link) => link.source !== source);

export const getOldIcelandicCrosslinks = (slug: string) : Crosslink[] => filterCrosslinksByLanguage(
  slug,
  DictionarySource.OldIcelandic,
);

export const getOldNorseCrosslinks = (slug: string) :Crosslink[] => filterCrosslinksByLanguage(
  slug,
  DictionarySource.OldNorse,
);

export const getOldINorwegianCrosslinks = (slug: string) :Crosslink[] => filterCrosslinksByLanguage(
  slug,
  DictionarySource.OldNorwegian,
);

export const getOldSwedishCrosslinks = (slug: string) :Crosslink[] => filterCrosslinksByLanguage(
  slug,
  DictionarySource.OldSwedish,
);

export { Crosslink, DictionarySource } from './models';
