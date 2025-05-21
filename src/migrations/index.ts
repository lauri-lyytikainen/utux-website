import * as migration_20250328_143035 from './20250328_143035';
import * as migration_20250328_162207 from './20250328_162207';
import * as migration_20250329_085838 from './20250329_085838';
import * as migration_20250329_142735 from './20250329_142735';
import * as migration_20250331_104934 from './20250331_104934';
import * as migration_20250404_111558 from './20250404_111558';
import * as migration_20250408_083331 from './20250408_083331';
import * as migration_20250408_100953 from './20250408_100953';
import * as migration_20250422_110609 from './20250422_110609';
import * as migration_20250521_171245 from './20250521_171245';

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
    name: '20250408_083331',
  },
  {
    up: migration_20250408_100953.up,
    down: migration_20250408_100953.down,
    name: '20250408_100953',
  },
  {
    up: migration_20250422_110609.up,
    down: migration_20250422_110609.down,
    name: '20250422_110609',
  },
  {
    up: migration_20250521_171245.up,
    down: migration_20250521_171245.down,
    name: '20250521_171245'
  },
];
