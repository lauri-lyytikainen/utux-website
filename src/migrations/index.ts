import * as migration_20250328_143035 from './20250328_143035';
import * as migration_20250328_162207 from './20250328_162207';

export const migrations = [
  {
    up: migration_20250328_143035.up,
    down: migration_20250328_143035.down,
    name: '20250328_143035',
  },
  {
    up: migration_20250328_162207.up,
    down: migration_20250328_162207.down,
    name: '20250328_162207'
  },
];
