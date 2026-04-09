// Medieval Watchtower -- 8x8 base, 15 layers
(function() {
  'use strict';

  const blocks = [];

  function ring(y, minX, maxX, minZ, maxZ, type) {
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (x === minX || x === maxX || z === minZ || z === maxZ) {
          blocks.push({ x, y, z, type });
        }
      }
    }
  }

  function floor(y, minX, maxX, minZ, maxZ, type) {
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        blocks.push({ x, y, z, type });
      }
    }
  }

  // Layers 0-3: lower stone brick walls
  for (let y = 0; y <= 3; y++) ring(y, 0, 7, 0, 7, 'stone_bricks');

  // Ground floor oak planks
  for (let x = 1; x <= 6; x++) for (let z = 1; z <= 6; z++) blocks.push({ x, y: 0, z, type: 'oak_planks' });

  // Oak door south wall
  blocks.push({ x: 3, y: 0, z: 7, type: 'oak_door' });
  blocks.push({ x: 4, y: 0, z: 7, type: 'oak_door' });
  blocks.push({ x: 3, y: 1, z: 7, type: 'oak_door' });
  blocks.push({ x: 4, y: 1, z: 7, type: 'oak_door' });

  // Torches y=2
  blocks.push({ x: 0, y: 2, z: 3, type: 'torch' });
  blocks.push({ x: 7, y: 2, z: 3, type: 'torch' });
  blocks.push({ x: 3, y: 2, z: 0, type: 'torch' });

  // Layers 4-7: middle section
  for (let y = 4; y <= 7; y++) ring(y, 0, 7, 0, 7, 'stone_bricks');

  // Mid floor at y=4
  for (let x = 1; x <= 6; x++) for (let z = 1; z <= 6; z++) blocks.push({ x, y: 4, z, type: 'oak_planks' });

  // Ladder (oak planks along interior NW corner)
  for (let y = 1; y <= 11; y++) blocks.push({ x: 1, y, z: 1, type: 'oak_planks' });

  // Torches y=6
  blocks.push({ x: 0, y: 6, z: 3, type: 'torch' });
  blocks.push({ x: 7, y: 6, z: 3, type: 'torch' });
  blocks.push({ x: 3, y: 6, z: 0, type: 'torch' });

  // Layers 8-11: upper section
  for (let y = 8; y <= 11; y++) ring(y, 0, 7, 0, 7, 'stone_bricks');

  // Upper floor at y=8
  for (let x = 1; x <= 6; x++) for (let z = 1; z <= 6; z++) blocks.push({ x, y: 8, z, type: 'oak_planks' });

  // Torches y=10
  blocks.push({ x: 0, y: 10, z: 3, type: 'torch' });
  blocks.push({ x: 7, y: 10, z: 3, type: 'torch' });
  blocks.push({ x: 3, y: 10, z: 0, type: 'torch' });
  blocks.push({ x: 3, y: 10, z: 7, type: 'torch' });

  // Layer 12: roof walkway
  floor(12, 0, 7, 0, 7, 'oak_planks');

  // Battlements at y=13-14 (alternating)
  [0, 2, 4, 6].forEach(bx => {
    blocks.push({ x: bx, y: 13, z: 0, type: 'stone_bricks' });
    blocks.push({ x: bx, y: 13, z: 7, type: 'stone_bricks' });
    blocks.push({ x: bx, y: 14, z: 0, type: 'stone_bricks' });
    blocks.push({ x: bx, y: 14, z: 7, type: 'stone_bricks' });
  });
  [0, 2, 4, 6].forEach(bz => {
    blocks.push({ x: 0, y: 13, z: bz, type: 'stone_bricks' });
    blocks.push({ x: 7, y: 13, z: bz, type: 'stone_bricks' });
    blocks.push({ x: 0, y: 14, z: bz, type: 'stone_bricks' });
    blocks.push({ x: 7, y: 14, z: bz, type: 'stone_bricks' });
  });

  window.CraftGuide.registerBuild({
    id: 'watchtower',
    name: 'Medieval Watchtower',
    category: 'castle',
    difficulty: 1,
    description: 'A sturdy stone watchtower perfect for keeping watch over your territory. Square stone walls with oak plank floors every 4 layers, ladder up the interior, and classic battlements on top.',
    tips: [
      'Build the outer ring first, then fill in the floor planks',
      'Place torches every 3 blocks on the walls to stop mobs spawning inside',
      'The crenellations on top are every other block -- skip one, place one',
      'Use stone bricks not regular stone for the authentic medieval look',
      'Add a chest on the top floor to store supplies'
    ],
    size: { x: 8, y: 15, z: 8 },
    blocks,
  });

})();
