// Battle Tank -- 11x7, 5 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // Hull body: full solid box x=0..10, z=0..6, y=1..2
  for (let x = 0; x <= 10; x++) {
    for (let z = 0; z <= 6; z++) {
      ab(x, 1, z, 'iron_block');
      ab(x, 2, z, 'iron_block');
    }
  }

  // Hull top plate y=3
  for (let x = 0; x <= 10; x++) {
    for (let z = 0; z <= 6; z++) {
      ab(x, 3, z, 'iron_block');
    }
  }

  // TRACK PANELS -- dark oak planks on both sides
  for (let x = 0; x <= 10; x++) {
    // Left side (z=0 face)
    ab(x, 0, 0, 'dark_oak_planks');
    ab(x, 0, 1, 'dark_oak_planks');
    ab(x, 1, 0, 'dark_oak_planks');
    ab(x, 2, 0, 'dark_oak_planks');
    // Right side (z=6 face)
    ab(x, 0, 6, 'dark_oak_planks');
    ab(x, 0, 5, 'dark_oak_planks');
    ab(x, 1, 6, 'dark_oak_planks');
    ab(x, 2, 6, 'dark_oak_planks');
  }

  // Track road wheels (cobblestone, spaced every 2 blocks)
  [1,3,5,7,9].forEach(x => {
    ab(x, 0, 0, 'cobblestone');
    ab(x, 0, 6, 'cobblestone');
  });

  // TURRET box: x=3..7, z=1..5, y=4
  for (let x = 3; x <= 7; x++) {
    for (let z = 1; z <= 5; z++) {
      ab(x, 4, z, 'iron_block');
    }
  }

  // Turret top walls y=5
  for (let x = 3; x <= 7; x++) {
    for (let z = 1; z <= 5; z++) {
      if (x === 3 || x === 7 || z === 1 || z === 5) ab(x, 5, z, 'iron_block');
    }
  }

  // Turret hatch (dark oak)
  ab(4, 5, 2, 'dark_oak_planks');
  ab(5, 5, 3, 'dark_oak_planks');
  ab(6, 5, 4, 'dark_oak_planks');

  // BARREL (x=8..11, z=3, y=4)
  ab(8, 4, 3, 'iron_block');
  ab(9, 4, 3, 'iron_block');
  ab(10, 4, 3, 'iron_block');
  ab(11, 4, 3, 'cobblestone'); // muzzle tip

  // Exhaust vents at rear
  ab(0, 3, 2, 'dark_oak_planks');
  ab(0, 3, 4, 'dark_oak_planks');

  window.CraftGuide.registerBuild({
    id: 'tank',
    name: 'Battle Tank',
    category: 'vehicle',
    difficulty: 2,
    description: 'A heavy battle tank built to dominate the battlefield. Iron block hull with dark oak tread panels, an iron turret centered on top, and a barrel jutting forward. Blast through walls or defend your base.',
    tips: [
      'Build the rectangular hull first, then add the treads on the sides',
      'The turret sits on top centered -- use a 5x5 iron block box',
      'The barrel is just iron blocks extending forward from the turret',
      'Dark oak planks make great tank treads -- the right color',
      'Add a flag or banner on the turret hatch for extra detail'
    ],
    size: { x: 12, y: 6, z: 7 },
    blocks,
  });

})();
