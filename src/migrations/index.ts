import * as migration_20250328_143035 from './20250328_143035';
import * as migration_20250328_162207 from './20250328_162207';
import * as migration_20250329_085838 from './20250329_085838';
import * as migration_20250329_142735 from './20250329_142735';
import * as migration_20250331_104934 from './20250331_104934';
import * as migration_20250404_111558 from './20250404_111558';
import * as migration_20250408_083331 from './20250408_083331';

export const migrations = [
  {
    up: migration_20250328_143035.up,
    down: migration_20250328_143035.down,
    name: '20250328_143035',
  },
  {
    up: migration_20250328_162207.up,
    down: migration_20250328_162207.down,
    name: '20250328_162207',
  },
  {
    up: migration_20250329_085838.up,
    down: migration_20250329_085838.down,
    name: '20250329_085838',
  },
  {
    up: migration_20250329_142735.up,
    down: migration_20250329_142735.down,
    name: '20250329_142735',
  },
  {
    up: migration_20250331_104934.up,
    down: migration_20250331_104934.down,
    name: '20250331_104934',
  },
  {
    up: migration_20250404_111558.up,
    down: migration_20250404_111558.down,
    name: '20250404_111558',
  },
  {
    up: migration_20250408_083331.up,
    down: migration_20250408_083331.down,
    name: '20250408_083331'
  },
];
