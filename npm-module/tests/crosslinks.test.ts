import test, { describe } from 'node:test';
import {
  type Crosslink,
  DictionarySource,
  getCrosslinks,
  getOldIcelandicCrosslinks,
  getOldINorwegianCrosslinks,
  getOldNorseCrosslinks,
  getOldSwedishCrosslinks,
} from '../src';
import assert from 'node:assert';

describe('Crosslinks tests', () => {
  test('Crosslinks contain correct amount of slug entries', () => {
    const result = getCrosslinks();

    assert.equal(Object.keys(result).length, 48307);
  });

  test('Crosslinks contain correct amount of summed individual links', () => {
    const result = getCrosslinks();
    let sum = 0;
    
    for (const [_, value] of Object.entries(result)) {
      sum += value.length;
    };

    assert.equal(sum, 128513);
  });

  test('Crosslink entries are returned in correct object format', () => {
    const result = getCrosslinks();

    for (const key in Object.keys(result)) {
      // Only expected keys.
      for (const link in result[key]) {
        assert.equal(Object.keys(link), ['url', 'source']);
      };
    };
  });

  test('Crosslinks contain expected content', () => {
    const result = getCrosslinks();

    assert.deepEqual(result.abyrgdarhlutr,
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

    assert.deepEqual(result.hneyking,
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

    assert.deepEqual(result.skurfir,
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

    assert.deepEqual(result.ylan, [
      {
        url: 'https://old-norwegian-dictionary.vercel.app/word/ylan',
        source: DictionarySource.OldNorwegian,
      },
      {
        url: 'https://old-swedish-dictionary.vercel.app/word/ylan',
        source: DictionarySource.OldSwedish,
      },
    ]);

    assert.deepEqual(result['otta-lauss'], [
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
    assert.equal(norwegianResult.length, 3);
    assert.equal(norseResult.length, 3);
    assert.equal(icelandicResult.length, 3);
    assert.equal(swedishResult.length, 3);

    const sourcesToResults = {
      'old-icelandic': icelandicResult,
      'old-norse': norseResult,
      'old-norwegian': norwegianResult,
      'old-swedish': swedishResult,
    };

    // Results should not contain their own language
    for (const [key, value] of Object.entries(sourcesToResults)) {
      assert.equal(value.filter((link: Crosslink) => link.source === key).length, 0);
    };
  });
});
