// Hidden Piston Door 2x2 -- 7x5, 5 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // STONE BRICK WALL FACE (z=0, x=0..6, y=0..4)
  // 2x2 door opening at x=2..3, y=1..2
  for (let x = 0; x <= 6; x++) {
    for (let y = 0; y <= 4; y++) {
      if ((x === 2 || x === 3) && (y === 1 || y === 2)) continue;
      ab(x, y, 0, 'stone_bricks');
    }
  }

  // STICKY PISTONS behind the wall
  ab(1, 1, 1, 'sticky_piston'); ab(1, 2, 1, 'sticky_piston'); // left pair
  ab(4, 1, 1, 'sticky_piston'); ab(4, 2, 1, 'sticky_piston'); // right pair

  // DOOR BLOCKS (the blocks pistons push -- currently in door position)
  ab(2, 1, 1, 'stone_bricks'); ab(2, 2, 1, 'stone_bricks');
  ab(3, 1, 1, 'stone_bricks'); ab(3, 2, 1, 'stone_bricks');

  // REDSTONE WIRING (z=2)
  ab(1, 0, 2, 'redstone_dust'); ab(2, 0, 2, 'redstone_dust');
  ab(3, 0, 2, 'redstone_dust'); ab(4, 0, 2, 'redstone_dust');
  ab(1, 1, 2, 'redstone_dust'); ab(1, 2, 2, 'redstone_dust');
  ab(4, 1, 2, 'redstone_dust'); ab(4, 2, 2, 'redstone_dust');

  // REPEATERS (piston color as placeholder)
  ab(2, 0, 3, 'piston'); ab(4, 0, 3, 'piston');

  // BUTTON / TRIGGER
  ab(5, 1, 0, 'redstone_block');

  // BACK WALL
  for (let x = 0; x <= 6; x++) {
    for (let y = 0; y <= 4; y++) ab(x, y, 4, 'stone_bricks');
  }

  // FLOOR AND CEILING
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 4; z++) {
      ab(x, 0, z, 'stone');
      ab(x, 4, z, 'stone');
    }
  }

  // SIDE WALLS
  for (let y = 1; y <= 3; y++) {
    for (let z = 1; z <= 3; z++) {
      ab(0, y, z, 'stone');
      ab(6, y, z, 'stone');
    }
  }

  window.CraftGuide.registerBuild({
    id: 'piston-door',
    name: 'Hidden Piston Door',
    category: 'redstone',
    difficulty: 2,
    description: 'A seamless 2x2 hidden door built into a stone wall. Looks like solid stone when closed. Hit the button and the pistons fire -- two blocks retract on each side. Classic redstone engineering.',
    tips: [
      '4 sticky pistons are the most expensive part -- craft them first',
      'Redstone dust connects the button to both pistons on each side',
      'Use repeaters so the signal reaches all pistons at the same time',
      'The door blocks must face the right direction when placed',
      'Build the mechanism first, then hide it behind the stone wall'
    ],
    size: { x: 7, y: 5, z: 5 },
    blocks,
  });

})();
