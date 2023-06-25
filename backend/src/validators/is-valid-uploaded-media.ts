import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isValidUploadedMedia = async (attachment: string) => {
  const mediaPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'temp',
    attachment
  );

  if (!fs.existsSync(mediaPath)) {
    throw new Error('The specified attachment is invalid or does not exist');
  }
};

export default isValidUploadedMedia;
