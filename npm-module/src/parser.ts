import zlib from 'zlib';

import { Crosslink } from './models';

export const parse = (content: Buffer): Record<string, Crosslink[]> => {
  // Decompress the gzipped data
  const decompressedData = zlib.gunzipSync(content);

  // Parse the JSON content
  return JSON.parse(decompressedData.toString());
};

export default {
  parse,
};
