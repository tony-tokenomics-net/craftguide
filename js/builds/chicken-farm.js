// Auto Chicken Farm -- 7x7, 7 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // y=0: Stone foundation
  for (let x = 0; x <= 6; x++) for (let z = 0; z <= 6; z++) ab(x, 0, z, 'stone_bricks');

  // y=1: Collection layer -- outer walls + chest + hoppers
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 6; z++) {
      if (x === 0 || x === 6 || z === 0 || z === 6) ab(x, 1, z, 'stone_bricks');
    }
  }
  ab(3, 1, 3, 'chest');
  ab(2, 1, 3, 'hopper'); ab(4, 1, 3, 'hopper');
  ab(3, 1, 2, 'hopper'); ab(3, 1, 4, 'hopper');

  // y=2: Water flow + stone floor
  for (let x = 1; x <= 5; x++) {
    for (let z = 1; z <= 5; z++) {
      if (x === 3 && z === 3) ab(x, 2, z, 'water');
      else ab(x, 2, z, 'stone');
    }
  }
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 6; z++) {
      if (x === 0 || x === 6 || z === 0 || z === 6) ab(x, 2, z, 'stone_bricks');
    }
  }

  // y=3: Lava/dispenser cooking layer
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 6; z++) {
      if (x === 0 || x === 6 || z === 0 || z === 6) {
        if ((x === 0 && z === 3) || (x === 6 && z === 3)) ab(x, 3, z, 'dispenser');
        else ab(x, 3, z, 'stone_bricks');
      } else if (x === 1 && z === 3) {
        ab(x, 3, z, 'lava');
      } else {
        ab(x, 3, z, 'stone');
      }
    }
  }

  // y=4: Glass pen base -- glass walls, oak plank floor for chickens
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 6; z++) {
      if (x === 0 || x === 6 || z === 0 || z === 6) ab(x, 4, z, 'glass');
      else ab(x, 4, z, 'oak_planks');
    }
  }

  // y=5: Glass pen walls (with door opening front z=6, x=3..4)
  for (let x = 0; x <= 6; x++) {
    for (let z = 0; z <= 6; z++) {
      if (x === 0 || x === 6 || z === 0 || z === 6) {
        if (z === 6 && (x === 3 || x === 4)) continue; // door opening
        ab(x, 5, z, 'glass');
      }
    }
  }

  // y=6: Glass roof
  for (let x = 0; x <= 6; x++) for (let z = 0; z <= 6; z++) ab(x, 6, z, 'glass');

  // Redstone power source
  ab(0, 4, 3, 'redstone_block');

  window.CraftGuide.registerBuild({
    id: 'chicken-farm',
    name: 'Auto Chicken Farm',
    category: 'redstone',
    difficulty: 2,
    description: 'A fully automatic chicken farm that collects eggs and cooks them without you doing anything. Chickens live in the glass pen on top, eggs fall through hoppers below, and a dispenser with lava handles the cooking.',
    tips: [
      'Spawn chickens by throwing eggs into the glass pen',
      'Baby chickens fit through slabs -- keep that in mind',
      'The lava should be in a dispenser activated by a clock circuit',
      'Hoppers must point into the chest -- place the chest first, then the hopper',
      'Glass walls let you see how many chickens you have at a glance'
    ],
    size: { x: 7, y: 7, z: 7 },
    blocks,
  });

})();
