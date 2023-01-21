import fs from 'fs';

export const read = (location: string) : Buffer => fs.readFileSync(location);

export default {
  read,
};
