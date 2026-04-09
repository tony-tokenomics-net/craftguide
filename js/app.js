// app.js -- CraftGuide main application
// Navigation, favorites, page routing, category filtering
// Runs after all build files and viewer.js are loaded via <script> tags

(function() {
  'use strict';

  var CG = window.CraftGuide;

  // =============================================
  // STATE
  // =============================================
  var state = {
    currentPage: 'home',
    currentBuild: null,
    currentCategory: 'all',
    favorites: loadFavorites(),
    viewer: null,
    activeTab: 'instructions',
    currentLayer: null,
  };

  // =============================================
  // FAVORITES -- localStorage
  // =============================================
  function loadFavorites() {
    try {
      var raw = localStorage.getItem('craftguide_favorites');
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  }

  function saveFavorites() {
    localStorage.setItem('craftguide_favorites', JSON.stringify(state.favorites));
  }

  function isFavorited(buildId) {
    return state.favorites.indexOf(buildId) !== -1;
  }

  function toggleFavorite(buildId) {
    if (isFavorited(buildId)) {
      state.favorites = state.favorites.filter(function(id) { return id !== buildId; });
    } else {
      state.favorites.push(buildId);
    }
    saveFavorites();
    updateFavoriteButtons(buildId);
    // If we are on the favorites tab, re-render the grid
    if (state.currentCategory === 'favorites') {
      var grid = document.getElementById('builds-grid');
      if (grid) {
        grid.innerHTML = renderBuildGrid();
        attachGridEvents();
        renderCardPreviews();
      }
    }
  }

  function updateFavoriteButtons(buildId) {
    var favored = isFavorited(buildId);
    var btns = document.querySelectorAll('[data-fav-id="' + buildId + '"]');
    btns.forEach(function(btn) {
      btn.textContent = favored ? '\u2665' : '\u2661';
      if (favored) btn.classList.add('favored');
      else btn.classList.remove('favored');
    });
  }

  // =============================================
  // LAYER INSTRUCTIONS -- auto-generated from block data
  // =============================================
  function generateLayerInstructions(build) {
    var byLayer = {};
    build.blocks.forEach(function(b) {
      if (!byLayer[b.y]) byLayer[b.y] = [];
      byLayer[b.y].push(b);
    });

    var layers = Object.keys(byLayer).map(Number).sort(function(a, b) { return a - b; });
    return layers.map(function(layer) {
      var blockArr = byLayer[layer];
      var typeCounts = {};
      blockArr.forEach(function(b) {
        typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
      });
      var desc = Object.keys(typeCounts)
        .sort(function(a, b) { return typeCounts[b] - typeCounts[a]; })
        .map(function(type) { return typeCounts[type] + 'x ' + (CG.BLOCK_NAMES[type] || type); })
        .join(', ');
      return { layer: layer + 1, desc: desc, count: blockArr.length };
    });
  }

  // =============================================
  // MATERIALS LIST
  // =============================================
  function computeMaterials(build) {
    var counts = {};
    build.blocks.forEach(function(b) {
      counts[b.type] = (counts[b.type] || 0) + 1;
    });
    return Object.keys(counts)
      .sort(function(a, b) { return counts[b] - counts[a]; })
      .map(function(type) { return { type: type, count: counts[type] }; });
  }

  function resolveBlockColor(colorStr) {
    if (!colorStr) return '#8B8B8B';
    if (colorStr.startsWith('rgba')) {
      var match = colorStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return 'rgb(' + match[1] + ',' + match[2] + ',' + match[3] + ')';
    }
    return colorStr;
  }

  // =============================================
  // HOME PAGE
  // =============================================
  function renderHome() {
    var app = document.getElementById('app');
    app.innerHTML = '<div class="page-home">' +
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<div class="site-logo"><span class="logo-text">CRAFTGUIDE</span></div>' +
          '<div class="header-tagline">Your Build Companion</div>' +
        '</div>' +
      '</header>' +
      '<main class="home-main">' +
        '<nav class="category-tabs" role="tablist">' +
          CG.CATEGORIES.map(function(cat) {
            return '<button class="mc-tab' + (state.currentCategory === cat.id ? ' active' : '') + '" data-category="' + cat.id + '" role="tab" aria-selected="' + (state.currentCategory === cat.id) + '">' + cat.icon + ' ' + cat.label + '</button>';
          }).join('') +
        '</nav>' +
        '<div class="builds-grid" id="builds-grid">' + renderBuildGrid() + '</div>' +
      '</main>' +
    '</div>';

    document.querySelectorAll('.mc-tab[data-category]').forEach(function(tab) {
      tab.addEventListener('click', function() {
        state.currentCategory = tab.dataset.category;
        document.querySelectorAll('.mc-tab[data-category]').forEach(function(t) {
          t.classList.toggle('active', t.dataset.category === state.currentCategory);
          t.setAttribute('aria-selected', t.dataset.category === state.currentCategory);
        });
        document.getElementById('builds-grid').innerHTML = renderBuildGrid();
        attachGridEvents();
        renderCardPreviews();
      });
    });

    attachGridEvents();
    renderCardPreviews();
  }

  function renderBuildGrid() {
    var builds = CG._buildsRaw;

    if (state.currentCategory === 'favorites') {
      builds = builds.filter(function(b) { return isFavorited(b.id); });
      if (builds.length === 0) {
        return '<div class="empty-state">' +
          '<div class="empty-icon">\u2661</div>' +
          '<p class="empty-text">No builds saved yet</p>' +
          '<p class="empty-sub">Tap the \u2665 on any build to save it here</p>' +
        '</div>';
      }
    } else if (state.currentCategory !== 'all') {
      builds = builds.filter(function(b) { return b.category === state.currentCategory; });
    }

    return builds.map(function(build) { return renderBuildCard(build); }).join('');
  }

  function renderBuildCard(build) {
    var favored = isFavorited(build.id);
    var pickaxes = '\u26CF\uFE0F'.repeat(build.difficulty);
    var categoryLabels = { castle: 'Castle', vehicle: 'Vehicle', redstone: 'Redstone' };
    var categoryLabel = categoryLabels[build.category] || build.category;
    var blockCount = build.blocks.length;

    return '<div class="build-card" data-build-id="' + build.id + '">' +
      '<div class="card-preview-wrap">' +
        '<canvas class="card-canvas" data-build-id="' + build.id + '" width="200" height="150"></canvas>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta">' +
          '<span class="category-badge category-' + build.category + '">' + categoryLabel + '</span>' +
          '<button class="fav-btn' + (favored ? ' favored' : '') + '" data-fav-id="' + build.id + '" aria-label="Favorite ' + build.name + '">' +
            (favored ? '\u2665' : '\u2661') +
          '</button>' +
        '</div>' +
        '<h3 class="card-title">' + build.name + '</h3>' +
        '<div class="card-footer">' +
          '<span class="difficulty" title="Difficulty">' + pickaxes + '</span>' +
          '<span class="block-count">' + blockCount + ' blocks</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function attachGridEvents() {
    document.querySelectorAll('.build-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.classList.contains('fav-btn') || e.target.closest('.fav-btn')) return;
        var buildId = card.dataset.buildId;
        var build = CG._buildsRaw.find(function(b) { return b.id === buildId; });
        if (build) navigateToDetail(build);
      });
    });

    document.querySelectorAll('.fav-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favId);
      });
    });
  }

  function renderCardPreviews() {
    var canvases = document.querySelectorAll('.card-canvas');
    if (!canvases.length) return;

    var idx = 0;
    function renderNext() {
      if (idx >= canvases.length) return;
      var destCanvas = canvases[idx++];
      var buildId = destCanvas.dataset.buildId;
      var build = CG._buildsRaw.find(function(b) { return b.id === buildId; });

      if (build) {
        try {
          CG.renderCardPreview(build, destCanvas);
        } catch(err) {
          console.warn('Card preview failed for', buildId, err);
          drawFallbackPreview(destCanvas, build);
        }
      }
      setTimeout(renderNext, 40);
    }
    renderNext();
  }

  function drawFallbackPreview(canvas, build) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1A2A4A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFAA00';
    ctx.font = '8px monospace';
    ctx.fillText(build.name, 8, canvas.height / 2);
  }

  // =============================================
  // DETAIL PAGE
  // =============================================
  function navigateToDetail(build) {
    state.currentPage = 'detail';
    state.currentBuild = build;
    state.activeTab = 'instructions';
    state.currentLayer = build.size.y - 1;

    if (state.viewer) {
      state.viewer.dispose();
      state.viewer = null;
    }

    renderDetail(build);
  }

  function navigateToHome() {
    state.currentPage = 'home';
    if (state.viewer) {
      state.viewer.dispose();
      state.viewer = null;
    }
    state.currentBuild = null;
    renderHome();
  }

  function renderDetail(build) {
    var favored = isFavorited(build.id);
    var pickaxes = '\u26CF\uFE0F'.repeat(build.difficulty);
    var categoryLabels = { castle: 'Castle', vehicle: 'Vehicle', redstone: 'Redstone' };
    var categoryLabel = categoryLabels[build.category] || build.category;
    var maxLayer = build.size.y - 1;
    var materials = computeMaterials(build);

    var app = document.getElementById('app');
    app.innerHTML = '<div class="page-detail">' +
      '<header class="detail-header">' +
        '<button class="mc-button back-btn" id="back-btn">&#8592; Back</button>' +
        '<div class="detail-header-info">' +
          '<h1 class="detail-title">' + build.name + '</h1>' +
          '<div class="detail-meta">' +
            '<span class="category-badge category-' + build.category + '">' + categoryLabel + '</span>' +
            '<span class="difficulty">' + pickaxes + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="fav-btn detail-fav' + (favored ? ' favored' : '') + '" data-fav-id="' + build.id + '" aria-label="Favorite">' +
          (favored ? '\u2665' : '\u2661') +
        '</button>' +
      '</header>' +
      '<div class="detail-body">' +
        '<div class="viewer-panel">' +
          '<div class="viewer-container" id="viewer-container"></div>' +
          '<div class="layer-controls">' +
            '<div class="layer-label" id="layer-label">Layer ' + (state.currentLayer + 1) + ' of ' + build.size.y + '</div>' +
            '<input type="range" class="layer-slider" id="layer-slider" min="0" max="' + maxLayer + '" value="' + maxLayer + '" aria-label="Layer filter">' +
            '<div class="layer-hint">Drag to show layers</div>' +
          '</div>' +
          '<button class="mc-button reset-view-btn" id="reset-view-btn">Reset View</button>' +
        '</div>' +
        '<div class="info-panel">' +
          '<nav class="tab-nav" role="tablist">' +
            ['instructions','materials','tips'].map(function(tab) {
              return '<button class="mc-tab' + (state.activeTab === tab ? ' active' : '') + '" data-tab="' + tab + '" role="tab">' +
                (tab.charAt(0).toUpperCase() + tab.slice(1)) + '</button>';
            }).join('') +
          '</nav>' +
          '<div class="tab-content" id="tab-content">' +
            renderTabContent(build, state.activeTab, materials) +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // Back button
    document.getElementById('back-btn').addEventListener('click', navigateToHome);

    // Favorite button
    document.querySelector('.detail-fav').addEventListener('click', function(e) {
      toggleFavorite(e.currentTarget.dataset.favId);
    });

    // Tab navigation
    document.querySelectorAll('.tab-nav .mc-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        state.activeTab = tab.dataset.tab;
        document.querySelectorAll('.tab-nav .mc-tab').forEach(function(t) {
          t.classList.toggle('active', t.dataset.tab === state.activeTab);
        });
        document.getElementById('tab-content').innerHTML = renderTabContent(build, state.activeTab, materials);
      });
    });

    // Layer slider
    var slider = document.getElementById('layer-slider');
    var layerLabel = document.getElementById('layer-label');
    slider.addEventListener('input', function() {
      var val = parseInt(slider.value, 10);
      state.currentLayer = val;
      layerLabel.textContent = 'Layer ' + (val + 1) + ' of ' + build.size.y;
      if (state.viewer) state.viewer.setLayerMax(val);
    });

    // Reset view
    document.getElementById('reset-view-btn').addEventListener('click', function() {
      if (state.viewer) state.viewer.resetCamera(build);
    });

    // Init 3D viewer
    state.viewer = new CG.BuildViewer('viewer-container');
    state.viewer.init();
    state.viewer.loadBuild(build);
  }

  function renderTabContent(build, tab, materials) {
    if (tab === 'instructions') return renderInstructionsTab(build);
    if (tab === 'materials') return renderMaterialsTab(materials);
    if (tab === 'tips') return renderTipsTab(build);
    return '';
  }

  function renderInstructionsTab(build) {
    var instructions = generateLayerInstructions(build);
    return '<div class="instructions-tab">' +
      '<p class="build-description">' + build.description + '</p>' +
      '<div class="layer-list">' +
        '<div class="layer-list-header">Layer by Layer</div>' +
        instructions.map(function(inst) {
          return '<div class="layer-item">' +
            '<div class="layer-num">Layer ' + inst.layer + '</div>' +
            '<div class="layer-desc">' + inst.desc + '</div>' +
            '<div class="layer-total">' + inst.count + ' blocks</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  function renderMaterialsTab(materials) {
    var slots = materials.slice();
    while (slots.length % 9 !== 0) slots.push(null);
    if (slots.length < 18) while (slots.length < 18) slots.push(null);

    var total = materials.reduce(function(s, m) { return s + m.count; }, 0);

    return '<div class="materials-tab">' +
      '<div class="materials-header">Total: ' + total + ' blocks</div>' +
      '<div class="inventory-grid">' +
        slots.map(function(slot) {
          if (!slot) return '<div class="inventory-slot empty"></div>';
          var color = resolveBlockColor(CG.BLOCK_COLORS[slot.type] || '#8B8B8B');
          var name = CG.BLOCK_NAMES[slot.type] || slot.type;
          return '<div class="inventory-slot" title="' + name + ': ' + slot.count + '" tabindex="0" aria-label="' + name + ', ' + slot.count + ' needed">' +
            '<div class="block-swatch" style="background-color:' + color + ';"></div>' +
            '<span class="count">' + slot.count + '</span>' +
            '<div class="slot-tooltip">' + name + '<br>' + slot.count + ' blocks</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  function renderTipsTab(build) {
    return '<div class="tips-tab">' +
      '<ul class="tips-list">' +
        build.tips.map(function(tip) {
          return '<li class="tip-item">' +
            '<span class="tip-icon">&#9658;</span>' +
            '<span class="tip-text">' + tip + '</span>' +
          '</li>';
        }).join('') +
      '</ul>' +
    '</div>';
  }

  // =============================================
  // BOOTSTRAP
  // =============================================
  function boot() {
    if (!CG || !CG._buildsRaw || CG._buildsRaw.length === 0) {
      console.error('CraftGuide: no builds registered. Check build script loading order.');
    }
    renderHome();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
