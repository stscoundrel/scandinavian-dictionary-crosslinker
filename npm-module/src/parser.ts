import zlib from 'node:zlib';

import type { Crosslink } from './models';

export const parse = (content: Buffer): Record<string, Crosslink[]> => {
  // Decompress the gzipped data
  const decompressedData = zlib.gunzipSync(content);

  // Parse the JSON content
  return JSON.parse(decompressedData.toString());
};

export default {
  parse,
};
