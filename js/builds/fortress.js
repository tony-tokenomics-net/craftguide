// Stone Fortress with Courtyard -- 16x16, 11 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // 4 corner towers (4x4 each, 10 blocks tall)
  const corners = [[0,0],[12,0],[0,12],[12,12]];

  corners.forEach(([tx, tz]) => {
    for (let y = 0; y <= 9; y++) {
      for (let dx = 0; dx <= 3; dx++) {
        for (let dz = 0; dz <= 3; dz++) {
          if (dx === 0 || dx === 3 || dz === 0 || dz === 3) {
            ab(tx+dx, y, tz+dz, 'stone_bricks');
          }
        }
      }
    }
    // Tower floor at y=0
    [[1,1],[2,1],[1,2],[2,2]].forEach(([dx,dz]) => ab(tx+dx, 0, tz+dz, 'oak_planks'));
    // Tower top floor at y=9
    [[1,1],[2,1],[1,2],[2,2]].forEach(([dx,dz]) => ab(tx+dx, 9, tz+dz, 'oak_planks'));
  });

  // Tower battlements at y=10 (alternating)
  corners.forEach(([tx, tz]) => {
    [0,2].forEach(dx => [0,2].forEach(dz => ab(tx+dx, 10, tz+dz, 'stone_bricks')));
    [1,3].forEach(dx => { ab(tx+dx, 10, tz, 'stone_bricks'); ab(tx+dx, 10, tz+3, 'stone_bricks'); });
    [1,3].forEach(dz => { ab(tx, 10, tz+dz, 'stone_bricks'); ab(tx+3, 10, tz+dz, 'stone_bricks'); });
  });

  // NORTH WALL (z=0, x=4..11, y=0..5)
  for (let y = 0; y <= 5; y++) {
    for (let x = 4; x <= 11; x++) {
      ab(x, y, 0, 'stone_bricks');
      ab(x, y, 1, 'stone_bricks');
    }
  }
  // North wall walkway y=6
  for (let x = 4; x <= 11; x++) { ab(x, 6, 0, 'oak_planks'); ab(x, 6, 1, 'oak_planks'); }
  // North wall battlements y=7
  [4,6,8,10].forEach(x => { ab(x, 7, 0, 'stone_bricks'); ab(x, 7, 1, 'stone_bricks'); });

  // SOUTH WALL (z=15, x=4..11) WITH GATE (x=6..9, y=0..3 open)
  for (let y = 0; y <= 5; y++) {
    for (let x = 4; x <= 11; x++) {
      if (y <= 3 && x >= 6 && x <= 9) continue; // gate opening
      ab(x, y, 15, 'stone_bricks');
      ab(x, y, 14, 'stone_bricks');
    }
  }
  // Gate arch beam
  for (let x = 6; x <= 9; x++) {
    ab(x, 4, 15, 'stone_bricks'); ab(x, 4, 14, 'stone_bricks');
    ab(x, 5, 15, 'stone_bricks'); ab(x, 5, 14, 'stone_bricks');
  }
  // South walkway y=6
  for (let x = 4; x <= 11; x++) { ab(x, 6, 15, 'oak_planks'); ab(x, 6, 14, 'oak_planks'); }
  [4,6,8,10].forEach(x => ab(x, 7, 15, 'stone_bricks'));

  // WEST WALL (x=0..1, z=4..11, y=0..5)
  for (let y = 0; y <= 5; y++) {
    for (let z = 4; z <= 11; z++) {
      ab(0, y, z, 'stone_bricks');
      ab(1, y, z, 'stone_bricks');
    }
  }
  for (let z = 4; z <= 11; z++) { ab(0, 6, z, 'oak_planks'); ab(1, 6, z, 'oak_planks'); }
  [4,6,8,10].forEach(z => ab(0, 7, z, 'stone_bricks'));

  // EAST WALL (x=14..15, z=4..11, y=0..5)
  for (let y = 0; y <= 5; y++) {
    for (let z = 4; z <= 11; z++) {
      ab(15, y, z, 'stone_bricks');
      ab(14, y, z, 'stone_bricks');
    }
  }
  for (let z = 4; z <= 11; z++) { ab(15, 6, z, 'oak_planks'); ab(14, 6, z, 'oak_planks'); }
  [4,6,8,10].forEach(z => ab(15, 7, z, 'stone_bricks'));

  // COURTYARD grass (y=0, interior x=2..13, z=2..13)
  for (let x = 2; x <= 13; x++) {
    for (let z = 2; z <= 13; z++) {
      // Skip tower interiors
      const inCorner = (x <= 3 && z <= 3) || (x >= 12 && z <= 3) || (x <= 3 && z >= 12) || (x >= 12 && z >= 12);
      if (!inCorner) ab(x, 0, z, 'grass_block');
    }
  }

  // Torches
  ab(4, 4, 0, 'torch'); ab(11, 4, 0, 'torch');
  ab(0, 4, 4, 'torch'); ab(0, 4, 11, 'torch');
  ab(15, 4, 4, 'torch'); ab(15, 4, 11, 'torch');

  window.CraftGuide.registerBuild({
    id: 'fortress',
    name: 'Stone Fortress',
    category: 'castle',
    difficulty: 3,
    description: 'A complete fortress with four corner towers and stone brick walls enclosing a courtyard. The walls have a walkway on top. One side has the main gate. This is the centerpiece of any medieval world.',
    tips: [
      'Build all 4 corner towers first before connecting the walls',
      'The courtyard stays open -- dig it flat before you start',
      'Put the gate on whichever wall faces your main road',
      'The wall walkway is 1 block wide -- add oak fencing for safety',
      'Fill the courtyard with a barracks, stable, or well'
    ],
    size: { x: 16, y: 11, z: 16 },
    blocks,
  });

})();
