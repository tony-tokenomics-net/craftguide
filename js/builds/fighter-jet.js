// Fighter Jet -- 14x10, 5 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // Fuselage body (x=2..13, z=4..5, y=1..2) -- iron blocks
  for (let x = 2; x <= 13; x++) {
    ab(x, 1, 4, 'iron_block'); ab(x, 1, 5, 'iron_block');
    ab(x, 2, 4, 'iron_block'); ab(x, 2, 5, 'iron_block');
  }

  // Belly y=0 (wider base section)
  for (let x = 3; x <= 12; x++) {
    ab(x, 0, 4, 'iron_block'); ab(x, 0, 5, 'iron_block');
  }

  // Glass cockpit canopy (x=10..12, y=3, z=4..5) + y=2 front
  ab(10, 2, 4, 'glass'); ab(10, 2, 5, 'glass');
  ab(11, 3, 4, 'glass'); ab(11, 3, 5, 'glass');
  ab(12, 3, 4, 'glass'); ab(12, 3, 5, 'glass');

  // Nose tip
  ab(13, 1, 4, 'iron_block'); ab(13, 1, 5, 'iron_block');
  ab(13, 2, 4, 'iron_block'); ab(13, 2, 5, 'iron_block');

  // Left wing (swept delta, z=6..9)
  const lWing = [[10,1,6],[9,1,6],[9,1,7],[8,1,7],[8,1,8],[7,1,8],[7,1,7],[6,1,8],[6,1,9],[5,1,9],[5,1,8],[4,1,9],[4,1,8],[4,1,7],[3,1,8],[3,1,7],[3,1,6]];
  lWing.forEach(([x,y,z]) => ab(x, y, z, 'iron_block'));

  // Right wing (mirrored, z=0..3)
  const rWing = [[10,1,3],[9,1,3],[9,1,2],[8,1,2],[8,1,1],[7,1,1],[7,1,2],[6,1,1],[6,1,0],[5,1,0],[5,1,1],[4,1,0],[4,1,1],[4,1,2],[3,1,1],[3,1,2],[3,1,3]];
  rWing.forEach(([x,y,z]) => ab(x, y, z, 'iron_block'));

  // Tail fin (x=0..2, y=1..4)
  for (let y = 1; y <= 4; y++) {
    const tx = y >= 3 ? 1 : 0;
    ab(tx, y, 4, 'iron_block'); ab(tx, y, 5, 'iron_block');
  }
  ab(2, 2, 4, 'iron_block'); ab(2, 2, 5, 'iron_block');

  // Horizontal stabilizers at tail
  [1,2,3].forEach(z => ab(2, 1, z, 'iron_block'));
  [6,7,8].forEach(z => ab(2, 1, z, 'iron_block'));

  // Engine exhaust (dark oak at tail)
  ab(0, 1, 4, 'dark_oak_planks'); ab(0, 1, 5, 'dark_oak_planks');
  ab(0, 2, 4, 'dark_oak_planks'); ab(0, 2, 5, 'dark_oak_planks');

  // Landing gear
  ab(4, 0, 4, 'cobblestone'); ab(4, 0, 5, 'cobblestone');
  ab(10, 0, 4, 'cobblestone'); ab(10, 0, 5, 'cobblestone');

  window.CraftGuide.registerBuild({
    id: 'fighter-jet',
    name: 'Fighter Jet',
    category: 'vehicle',
    difficulty: 2,
    description: 'A sleek fighter jet built for air superiority. Iron block fuselage, swept delta wings, glass cockpit canopy, and a tall tail fin. Hang it on a hillside or build a runway.',
    tips: [
      'Iron blocks are expensive -- mine a lot of iron before you start',
      'The swept wings look best with the diagonal pattern at the front',
      'Glass for the cockpit canopy -- 2 blocks makes it look real',
      'Add a runway of smooth stone for the full airbase effect',
      'Try iron trapdoors for added landing gear detail'
    ],
    size: { x: 14, y: 5, z: 10 },
    blocks,
  });

})();
