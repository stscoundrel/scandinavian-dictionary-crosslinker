import { Crosslink, DictionarySource } from './models';

const SOURCE_MAP = new Map();
SOURCE_MAP.set('onr', 'old-norwegian');
SOURCE_MAP.set('os', 'old-swedish');
SOURCE_MAP.set('on', 'old-norse');
SOURCE_MAP.set('oi', 'old-icelandic');

const LINK_MAP = new Map();
LINK_MAP.set(DictionarySource.OldIcelandic, 'https://old-icelandic.vercel.app/word/');
LINK_MAP.set(DictionarySource.OldNorse, 'https://cleasby-vigfusson-dictionary.vercel.app/word/');
LINK_MAP.set(DictionarySource.OldNorwegian, 'https://old-norwegian-dictionary.vercel.app/word/');
LINK_MAP.set(DictionarySource.OldSwedish, 'https://old-swedish-dictionary.vercel.app/word/');

const appendBaseUrls = (links: Crosslink[]): Crosslink[] => links.map((link) => ({
  url: `${LINK_MAP.get(link.source)}${link.url}`,
  source: link.source,
}));

function parseEntry(this: any, key: string, value: unknown): unknown {
  if (key === 'a') {
    this.url = value;
    return;
  }

  if (key === 'b') {
    this.source = SOURCE_MAP.get(value);
    return;
  }

  // eslint-disable-next-line consistent-return
  return value;
}

export const parse = (content: Buffer) : Record<string, Crosslink[]> => {
  const result: Record<string, Crosslink[]> = {};

  const words: Record<string, Crosslink[]> = JSON.parse(
    content.toString(),
    parseEntry,
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const [slug, links] of Object.entries(words)) {
    result[slug] = appendBaseUrls(links);
  }

  return result;
};

export default {
  parse,
};
