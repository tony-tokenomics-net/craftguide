// Pirate Ship -- 18x7, 12 layers
(function() {
  'use strict';

  const blocks = [];
  function ab(x, y, z, type) { blocks.push({ x, y, z, type }); }

  // Hull profile: [x, zMin, zMax] -- ship tapers at bow and stern
  const hullProfile = [
    [0,3,3],[1,2,4],[2,1,5],[3,0,6],[4,0,6],[5,0,6],[6,0,6],[7,0,6],
    [8,0,6],[9,0,6],[10,0,6],[11,0,6],[12,0,6],[13,1,5],[14,1,5],[15,2,4],[16,3,3],[17,3,3]
  ];

  // Hull walls y=0..2 (spruce planks)
  hullProfile.forEach(([x, zMin, zMax]) => {
    for (let z = zMin; z <= zMax; z++) {
      for (let y = 0; y <= 2; y++) {
        if (z === zMin || z === zMax || y === 0) ab(x, y, z, 'spruce_planks');
      }
    }
  });

  // Deck y=3 (oak planks)
  hullProfile.forEach(([x, zMin, zMax]) => {
    for (let z = zMin; z <= zMax; z++) ab(x, 3, z, 'oak_planks');
  });

  // Stern cabin x=1..3, z=1..5, y=4..6
  for (let x = 1; x <= 3; x++) {
    for (let z = 1; z <= 5; z++) {
      for (let y = 4; y <= 6; y++) {
        if (x === 1 || x === 3 || z === 1 || z === 5 || y === 4) ab(x, y, z, 'spruce_planks');
      }
    }
  }
  // Cabin roof y=7
  for (let x = 1; x <= 3; x++) for (let z = 1; z <= 5; z++) ab(x, 7, z, 'dark_oak_planks');
  // Cabin windows
  ab(2, 5, 1, 'glass'); ab(2, 5, 5, 'glass'); ab(3, 5, 3, 'glass');

  // Mast x=9, z=3, y=4..10
  for (let y = 4; y <= 10; y++) ab(9, y, 3, 'oak_fence');

  // Sails (white wool) x=9, z=1..5 (not z=3 mast), y=5..9
  for (let y = 5; y <= 9; y++) {
    for (let z = 1; z <= 5; z++) {
      if (z !== 3) ab(9, y, z, 'wool_white');
    }
  }

  // Crow's nest at y=10
  ab(8, 10, 3, 'oak_planks'); ab(10, 10, 3, 'oak_planks');
  ab(9, 10, 2, 'oak_planks'); ab(9, 10, 4, 'oak_planks');

  // Bowsprit (forward pole at y=4, z=3, x=13..16)
  for (let x = 13; x <= 16; x++) ab(x, 4, 3, 'oak_fence');

  // Deck railings (fence along outer edge, midship sections)
  hullProfile.slice(3, 13).forEach(([x, zMin, zMax]) => {
    ab(x, 4, zMin, 'oak_fence');
    ab(x, 4, zMax, 'oak_fence');
  });

  // Torch on deck
  ab(6, 4, 3, 'torch');

  window.CraftGuide.registerBuild({
    id: 'pirate-ship',
    name: 'Pirate Ship',
    category: 'vehicle',
    difficulty: 3,
    description: 'A fearsome pirate ship ready to sail the Minecraft seas. Spruce plank hull with a pointed bow, oak deck, a stern cabin, and a tall mast with white wool sails. Anchor it in your harbor or set sail for adventure.',
    tips: [
      'Build the hull shape first -- widest in the middle, narrows at both ends',
      'The mast is just fence posts stacked tall -- use oak fence',
      'Wool sails: place them in rows on both sides of the mast',
      'Add a chest below deck for your loot storage',
      'Use water blocks underneath to make it look like it is floating'
    ],
    size: { x: 18, y: 12, z: 7 },
    blocks,
  });

})();
