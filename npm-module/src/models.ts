export enum DictionarySource {
  OldNorse = 'old-norse',
  OldIcelandic = 'old-icelandic',
  OldNorwegian = 'old-norwegian',
  OldSwedish = 'old-swedish'
}

export interface Crosslink{
  url: string,
  source: DictionarySource,
}
