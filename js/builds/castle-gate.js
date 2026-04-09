// Castle Gate with Drawbridge
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // LEFT TOWER (x: 0-3, z: 0-3, y: 0-9)
  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x <= 3; x++) {
      for (let z = 0; z <= 3; z++) {
        if (x === 0 || x === 3 || z === 0 || z === 3) ab(x, y, z, 'stone_bricks');
      }
    }
  }
  // Left tower floors
  [[1,1],[1,2],[2,1],[2,2]].forEach(([x,z]) => { ab(x, 0, z, 'oak_planks'); ab(x, 5, z, 'oak_planks'); ab(x, 9, z, 'oak_planks'); });

  // RIGHT TOWER (x: 10-13, z: 0-3, y: 0-9)
  for (let y = 0; y <= 9; y++) {
    for (let x = 10; x <= 13; x++) {
      for (let z = 0; z <= 3; z++) {
        if (x === 10 || x === 13 || z === 0 || z === 3) ab(x, y, z, 'stone_bricks');
      }
    }
  }
  [[11,1],[11,2],[12,1],[12,2]].forEach(([x,z]) => { ab(x, 0, z, 'oak_planks'); ab(x, 5, z, 'oak_planks'); ab(x, 9, z, 'oak_planks'); });

  // GATE FACE (x: 4-9, z: 0-1)
  // Gate opening: x=5,6,7,8, y=0-3 is empty
  for (let y = 0; y <= 9; y++) {
    for (let x = 4; x <= 9; x++) {
      // Arch pillars (x=4 and x=9 are solid all the way)
      // Top arch beam (y>=4 is solid above the opening)
      if (x === 4 || x === 9 || y >= 4) {
        ab(x, y, 0, 'stone_bricks');
        ab(x, y, 1, 'stone_bricks');
      }
    }
  }

  // Walkway connecting towers at y=10 (oak planks, z=0..3)
  for (let x = 0; x <= 13; x++) {
    for (let z = 0; z <= 3; z++) {
      ab(x, 10, z, 'oak_planks');
    }
  }

  // Battlements y=11 on both towers
  [0,2].forEach(dx => {
    [0,2].forEach(dz => { ab(dx, 11, dz, 'stone_bricks'); ab(10+dx, 11, dz, 'stone_bricks'); });
  });
  [0,2].forEach(dx => {
    [1,3].forEach(dz => { ab(dx, 11, dz, 'stone_bricks'); ab(10+dx, 11, dz, 'stone_bricks'); });
  });

  // Gate top battlements y=11
  [4,6,8].forEach(x => ab(x, 11, 0, 'stone_bricks'));

  // Drawbridge (oak planks, z=4..7 extending south from gate)
  for (let z = 4; z <= 7; z++) {
    for (let x = 5; x <= 8; x++) ab(x, 0, z, 'oak_planks');
  }

  // Gate torches
  ab(4, 3, 0, 'torch'); ab(9, 3, 0, 'torch');

  // Fence railings on tower tops
  for (let x = 0; x <= 3; x++) ab(x, 11, 3, 'oak_fence');
  for (let x = 10; x <= 13; x++) ab(x, 11, 3, 'oak_fence');

  window.CraftGuide.registerBuild({
    id: 'castle-gate',
    name: 'Castle Gate',
    category: 'castle',
    difficulty: 2,
    description: 'An imposing castle gate flanked by two square towers. The central archway is big enough for any hero. The drawbridge extends out front. Connect walls on both sides for a complete fortress entrance.',
    tips: [
      'Build both towers first before connecting with the gate arch',
      'The drawbridge is oak planks -- use dark oak for a weathered look',
      'Add iron bars or fence across the gate opening for a portcullis',
      'Put a chest inside each tower for guard supplies',
      'Connect to walls on both sides for a complete castle entrance'
    ],
    size: { x: 14, y: 12, z: 10 },
    blocks,
  });

})();
