// TNT Cannon -- 9x3, 4 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // CHANNEL WALLS -- cobblestone U-shape
  // Bottom (y=0, full width)
  for (let x = 0; x <= 9; x++) {
    for (let z = 0; z <= 2; z++) ab(x, 0, z, 'cobblestone');
  }
  // Side walls (z=0 and z=2, y=1..2)
  for (let x = 0; x <= 9; x++) {
    ab(x, 1, 0, 'cobblestone'); ab(x, 2, 0, 'cobblestone');
    ab(x, 1, 2, 'cobblestone'); ab(x, 2, 2, 'cobblestone');
  }

  // WATER BLOCK (stops propellant from destroying cannon)
  ab(0, 1, 1, 'water');

  // DISPENSER (loads projectile TNT)
  ab(1, 1, 1, 'dispenser');

  // TNT PROPELLANT in channel
  ab(2, 1, 1, 'tnt');
  ab(3, 1, 1, 'tnt');
  ab(4, 1, 1, 'tnt');
  ab(5, 1, 1, 'tnt');
  ab(6, 1, 1, 'tnt');

  // PROJECTILE TNT (sits on top, gets launched)
  ab(7, 2, 1, 'tnt');

  // REDSTONE WIRING -- connects button to dispenser
  ab(0, 0, 1, 'redstone_dust');
  ab(1, 0, 1, 'redstone_dust');
  ab(2, 0, 1, 'redstone_dust');
  ab(3, 0, 1, 'redstone_dust');
  ab(4, 0, 1, 'redstone_dust');

  // REPEATERS for timing (piston color as placeholder)
  ab(2, 0, 0, 'piston');
  ab(4, 0, 0, 'piston');

  // BUTTON TRIGGER (redstone block represents the button/power)
  ab(0, 1, 0, 'redstone_block');

  // FRONT LAUNCH AID (angled slab assist)
  ab(8, 1, 1, 'stone_bricks');
  ab(9, 2, 1, 'stone_bricks');

  // Redstone wiring connecting to TNT
  ab(6, 0, 1, 'redstone_dust');
  ab(7, 0, 1, 'redstone_dust');

  window.CraftGuide.registerBuild({
    id: 'tnt-cannon',
    name: 'TNT Cannon',
    category: 'redstone',
    difficulty: 1,
    description: 'The classic Minecraft TNT cannon. Water in the channel stops the propellant TNT from blowing up the structure, while the projectile TNT launches hundreds of blocks. Simple, fast, and satisfying.',
    tips: [
      'The water block MUST be at the back of the channel -- it stops the cannon exploding itself',
      'Channel TNT is propellant. The TNT on top is the projectile',
      'Use a button not a lever -- you want a pulse, not a continuous signal',
      'Add more propellant TNT for longer range (up to 7 blocks in the channel)',
      'Aim by rotating the whole build -- TNT always fires forward'
    ],
    size: { x: 10, y: 4, z: 3 },
    blocks,
  });

})();
