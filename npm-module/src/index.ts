import path from 'path';
import { Crosslink } from './models';
import { read } from './reader';

const JSON_PATH = path.join(`${__dirname}/../resources/crosslinks.json`);

export function getCrosslinks() : Record<string, Crosslink[]> {
  const content = read(JSON_PATH);
  const words = JSON.parse(content.toString());

  return words;
}

export { Crosslink, DictionarySource } from './models';
