import { DictionarySource, getCrosslinks } from '../src';

describe('Crosslinks tests', () => {
  test('Crosslinks contain correct amount of slug entries', () => {
    const result = getCrosslinks();

    expect(Object.keys(result).length).toBe(27434);
  });

  test('Crosslinks contain correct amount of summed individual links', () => {
    const result = getCrosslinks();
    let sum = 0;

    Object.keys(result).forEach((key) => {
      sum += result[key].length;
    });

    expect(sum).toEqual(62577);
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
  });
});
