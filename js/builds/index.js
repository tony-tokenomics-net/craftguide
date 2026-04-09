// CraftGuide -- All builds registry + shared data
// Global: window.CraftGuide.builds, window.CraftGuide.BLOCK_COLORS, etc.

(function() {
  'use strict';

  // Block color map -- from DESIGN.md Appendix A
  const BLOCK_COLORS = {
    stone:              '#8B8B8B',
    cobblestone:        '#7A7A7A',
    stone_bricks:       '#7D7D7D',
    mossy_stone_bricks: '#6B7D5E',
    brick:              '#966A5B',
    nether_bricks:      '#2D1520',
    obsidian:           '#0F0A18',
    iron_block:         '#D8D8D8',
    gold_block:         '#F8D64E',
    sand:               '#DBD3A0',
    glass:              'rgba(200, 230, 255, 0.5)',
    oak_planks:         '#BC9862',
    spruce_planks:      '#6B4E30',
    birch_planks:       '#C5B77B',
    dark_oak_planks:    '#3E2912',
    oak_log:            '#6B5433',
    oak_door:           '#8B6F47',
    oak_fence:          '#BC9862',
    chest:              '#A0692B',
    grass_block:        '#6B8E23',
    dirt:               '#866043',
    water:              'rgba(40, 100, 200, 0.6)',
    lava:               '#CF4A0C',
    redstone_block:     '#A81414',
    redstone_dust:      '#FF0000',
    tnt:                '#DB2B00',
    piston:             '#9E8B63',
    sticky_piston:      '#6B9E3B',
    hopper:             '#4A4A4A',
    dispenser:          '#8B8B8B',
    torch:              '#FFAA00',
    glowstone:          '#AB8432',
    wool_white:         '#E8E8E8',
    wool_red:           '#A12722',
  };

  // Human-readable block names for inventory display
  const BLOCK_NAMES = {
    stone:              'Stone',
    cobblestone:        'Cobblestone',
    stone_bricks:       'Stone Bricks',
    mossy_stone_bricks: 'Mossy Stone Bricks',
    brick:              'Bricks',
    nether_bricks:      'Nether Bricks',
    obsidian:           'Obsidian',
    iron_block:         'Iron Block',
    gold_block:         'Gold Block',
    sand:               'Sand',
    glass:              'Glass',
    oak_planks:         'Oak Planks',
    spruce_planks:      'Spruce Planks',
    birch_planks:       'Birch Planks',
    dark_oak_planks:    'Dark Oak Planks',
    oak_log:            'Oak Log',
    oak_door:           'Oak Door',
    oak_fence:          'Oak Fence',
    chest:              'Chest',
    grass_block:        'Grass Block',
    dirt:               'Dirt',
    water:              'Water Bucket',
    lava:               'Lava Bucket',
    redstone_block:     'Redstone Block',
    redstone_dust:      'Redstone Dust',
    tnt:                'TNT',
    piston:             'Piston',
    sticky_piston:      'Sticky Piston',
    hopper:             'Hopper',
    dispenser:          'Dispenser',
    torch:              'Torch',
    glowstone:          'Glowstone',
    wool_white:         'White Wool',
    wool_red:           'Red Wool',
  };

  const CATEGORIES = [
    { id: 'all',       label: 'All Builds', icon: '\u2692\uFE0F' },
    { id: 'castle',    label: 'Castles',    icon: '\u2694\uFE0F' },
    { id: 'vehicle',   label: 'Vehicles',   icon: '\uD83D\uDEA2' },
    { id: 'redstone',  label: 'Redstone',   icon: '\u26A1' },
    { id: 'favorites', label: 'My Builds',  icon: '\u2764\uFE0F' },
  ];

  // Namespace
  window.CraftGuide = window.CraftGuide || {};
  window.CraftGuide.BLOCK_COLORS = BLOCK_COLORS;
  window.CraftGuide.BLOCK_NAMES = BLOCK_NAMES;
  window.CraftGuide.CATEGORIES = CATEGORIES;
  window.CraftGuide._buildsRaw = [];

  // Register a build -- called by each build file
  window.CraftGuide.registerBuild = function(build) {
    window.CraftGuide._buildsRaw.push(build);
  };

})();
