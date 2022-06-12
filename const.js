import * as path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const OPERATION_FAILED = 'Operation failed';
export const INVALID_INPUT = 'Invalid input';