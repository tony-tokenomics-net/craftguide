// Wizard Tower -- 9x9 octagonal, 18 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // 9x9 octagon wall detection (cuts 4 corner blocks)
  function isOctWall(x, z) {
    if (x === 0 && z === 0) return false;
    if (x === 8 && z === 0) return false;
    if (x === 0 && z === 8) return false;
    if (x === 8 && z === 8) return false;
    return x === 0 || x === 8 || z === 0 || z === 8;
  }

  function isOctInterior(x, z) {
    if (x === 0 && z === 0) return false;
    if (x === 8 && z === 0) return false;
    if (x === 0 && z === 8) return false;
    if (x === 8 && z === 8) return false;
    return x >= 1 && x <= 7 && z >= 1 && z <= 7;
  }

  // Layers 0-7: stone brick lower section
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 8; x++) {
      for (let z = 0; z <= 8; z++) {
        if (isOctWall(x, z)) ab(x, y, z, 'stone_bricks');
      }
    }
  }

  // Ground floor
  for (let x = 1; x <= 7; x++) for (let z = 1; z <= 7; z++) if (isOctInterior(x,z)) ab(x, 0, z, 'oak_planks');
  // Mid floor y=4
  for (let x = 1; x <= 7; x++) for (let z = 1; z <= 7; z++) if (isOctInterior(x,z)) ab(x, 4, z, 'oak_planks');

  // Door at y=0,1
  ab(4, 0, 8, 'oak_door'); ab(4, 1, 8, 'oak_door');

  // Glowstone at y=3
  ab(0, 3, 4, 'glowstone'); ab(8, 3, 4, 'glowstone');
  ab(4, 3, 0, 'glowstone'); ab(4, 3, 8, 'glowstone');

  // Layer 8: Obsidian ring
  for (let x = 0; x <= 8; x++) for (let z = 0; z <= 8; z++) if (isOctWall(x,z)) ab(x, 8, z, 'obsidian');

  // Layers 9-13: Nether brick upper section
  for (let y = 9; y <= 13; y++) {
    for (let x = 0; x <= 8; x++) {
      for (let z = 0; z <= 8; z++) {
        if (isOctWall(x, z)) ab(x, y, z, 'nether_bricks');
      }
    }
  }

  // Upper floor y=9
  for (let x = 1; x <= 7; x++) for (let z = 1; z <= 7; z++) if (isOctInterior(x,z)) ab(x, 9, z, 'oak_planks');

  // Glowstone at y=11
  ab(0, 11, 4, 'glowstone'); ab(8, 11, 4, 'glowstone');
  ab(4, 11, 0, 'glowstone'); ab(4, 11, 8, 'glowstone');

  // Pointed dark oak roof (tapering, y=14-17)
  const roofLayers = [
    { y: 14, coords: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[1,2],[1,3],[1,4],[1,5],[1,6],[7,2],[7,3],[7,4],[7,5],[7,6]] },
    { y: 15, coords: [[2,2],[3,2],[4,2],[5,2],[6,2],[2,6],[3,6],[4,6],[5,6],[6,6],[2,3],[2,4],[2,5],[6,3],[6,4],[6,5]] },
    { y: 16, coords: [[3,3],[4,3],[5,3],[3,5],[4,5],[5,5],[3,4],[5,4]] },
    { y: 17, coords: [[4,4]] },
  ];
  roofLayers.forEach(({ y, coords }) => coords.forEach(([x,z]) => ab(x, y, z, 'dark_oak_planks')));

  // Spiral staircase (oak planks stepping up interior)
  const spiral = [[2,1,2],[2,2,3],[2,3,4],[2,4,5],[3,5,6],[4,6,6],[5,7,6],[6,8,5],[6,9,4],[6,10,3],[6,11,2],[5,12,2]];
  spiral.forEach(([x,y,z]) => ab(x, y, z, 'oak_planks'));

  window.CraftGuide.registerBuild({
    id: 'wizard-tower',
    name: 'Wizard Tower',
    category: 'castle',
    difficulty: 2,
    description: 'An ancient wizard tower reaching into the sky. Stone bricks transition to nether bricks above an obsidian ring. Glowstone glows from embedded niches. The pointed dark oak roof tapers to a peak.',
    tips: [
      'The octagonal shape is wider in the middle -- build each layer from the pattern',
      'Obsidian is hard to mine -- have a diamond pickaxe ready',
      'Glowstone in the walls beats torches for a magical look',
      'Build the spiral staircase slowly going up -- it is tight inside',
      'Add a brewing stand and enchanting table inside for authenticity'
    ],
    size: { x: 9, y: 18, z: 9 },
    blocks,
  });

})();
