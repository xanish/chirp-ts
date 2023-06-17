import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '..', '.env'),
});
