import fs from 'node:fs';

export const read = (location: string) : Buffer => fs.readFileSync(location);

export default {
  read,
};
