import {
  DictionarySource,
  getCrosslinks,
  getOldIcelandicCrosslinks,
  getOldINorwegianCrosslinks,
  getOldNorseCrosslinks,
  getOldSwedishCrosslinks,
} from '../src';

describe('Crosslinks tests', () => {
  test('Crosslinks contain correct amount of slug entries', () => {
    const result = getCrosslinks();

    expect(Object.keys(result).length).toBe(48294);
  });

  test('Crosslinks contain correct amount of summed individual links', () => {
    const result = getCrosslinks();
    let sum = 0;

    Object.keys(result).forEach((key) => {
      sum += result[key].length;
    });

    expect(sum).toEqual(128440);
  });

  test('Crosslink entries are returned in correct object format', () => {
    const result = getCrosslinks();

    Object.keys(result).forEach((key) => {
      // Only expected keys.
      result[key].forEach((link) => {
        expect(Object.keys(link)).toEqual(['url', 'source']);
      });
    });
  });

  test('Crosslinks contain expected content', () => {
    const result = getCrosslinks();

    expect(result.abyrgdarhlutr).toEqual(
      [
        {
          url: 'https://old-icelandic.vercel.app/word/abyrgdarhlutr',
          source: DictionarySource.OldIcelandic,
        },
        {
          url: 'https://old-norwegian-dictionary.vercel.app/word/abyrgdarhlutr',
          source: DictionarySource.OldNorwegian,
        },
      ],
    );

    expect(result.hneyking).toEqual(
      [
        {
          url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/hneyking',
          source: DictionarySource.OldNorse,
        },
        {
          url: 'https://old-icelandic.vercel.app/word/hneyking',
          source: DictionarySource.OldIcelandic,
        },
        {
          url: 'https://old-norwegian-dictionary.vercel.app/word/hneyking',
          source: DictionarySource.OldNorwegian,
        },
      ],
    );

    expect(result.skurfir).toEqual(
      [
        {
          url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/skurfir',
          source: DictionarySource.OldNorse,
        },
        {
          url: 'https://old-norwegian-dictionary.vercel.app/word/skurfir',
          source: DictionarySource.OldNorwegian,
        },
      ],
    );

    expect(result.ylan).toEqual([
      {
        url: 'https://old-norwegian-dictionary.vercel.app/word/ylan',
        source: DictionarySource.OldNorwegian,
      },
      {
        url: 'https://old-swedish-dictionary.vercel.app/word/ylan',
        source: DictionarySource.OldSwedish,
      },
    ]);

    expect(result['otta-lauss']).toEqual([
      {
        source: DictionarySource.OldNorse,
        url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/otta-lauss',
      },
      {
        source: DictionarySource.OldIcelandic,
        url: 'https://old-icelandic.vercel.app/word/ottalauss',
      },
      {
        url: 'https://old-norwegian-dictionary.vercel.app/word/ottalauss',
        source: DictionarySource.OldNorwegian,
      },
    ]);
  });
});

describe('Crosslinks by language tests', () => {
  test('Filters entries by given language, removing self-referencing links', () => {
    // Abbadis is expected to appear in all languages.
    const norwegianResult = getOldINorwegianCrosslinks('abbadis');
    const norseResult = getOldNorseCrosslinks('abbadis');
    const icelandicResult = getOldIcelandicCrosslinks('abbadis');
    const swedishResult = getOldSwedishCrosslinks('abbadis');

    // Each should've filtered away their own language.
    expect(norwegianResult.length).toEqual(3);
    expect(norseResult.length).toEqual(3);
    expect(icelandicResult.length).toEqual(3);
    expect(swedishResult.length).toEqual(3);

    const sourcesToResults = {
      'old-icelandic': icelandicResult,
      'old-norse': norseResult,
      'old-norwegian': norwegianResult,
      'old-swedish': swedishResult,
    };

    // Results should not contain their own language
    Object.keys(sourcesToResults).forEach((key) => {
      expect(sourcesToResults[key].filter((link) => link.source === key).length).toEqual(0);
    });
  });
});
