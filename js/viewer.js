// viewer.js -- Three.js 3D block viewer for CraftGuide
// Global: window.CraftGuide.BuildViewer, window.CraftGuide.renderCardPreview
// Requires Three.js and OrbitControls loaded via <script> tags first.

(function() {
  'use strict';

  const BLOCK_SIZE = 1;
  const HIDDEN_Y = -5000;

  function resolveColor(colorStr) {
    if (!colorStr) return '#8B8B8B';
    if (colorStr.startsWith('rgba')) {
      const match = colorStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return 'rgb(' + match[1] + ',' + match[2] + ',' + match[3] + ')';
    }
    return colorStr;
  }

  function getBlockOpacity(colorStr) {
    if (!colorStr) return 1;
    if (colorStr.startsWith('rgba')) {
      const match = colorStr.match(/,\s*([\d.]+)\)$/);
      if (match) return parseFloat(match[1]);
    }
    return 1;
  }

  // =============================================
  // BuildViewer -- interactive 3D viewer
  // =============================================
  function BuildViewer(containerId) {
    this.containerId = containerId;
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.meshGroups = [];
    this.groundMeshes = [];
    this.currentBuild = null;
    this.currentLayerMax = 999;
    this.animFrameId = null;
    this.isDisposed = false;
    this._resizeObserver = null;
    this._boundAnimate = this._animate.bind(this);
  }

  BuildViewer.prototype.init = function() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    const w = this.container.clientWidth || 600;
    const h = this.container.clientHeight || 400;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0D1B2A');

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 500);
    this.camera.position.set(18, 14, 18);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'default' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    // Lights
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    var sun = new THREE.DirectionalLight(0xfffde8, 0.85);
    sun.position.set(-8, 20, -4);
    this.scene.add(sun);
    var fill = new THREE.DirectionalLight(0xd0e8ff, 0.25);
    fill.position.set(8, 4, 10);
    this.scene.add(fill);

    // OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 120;
    this.controls.enablePan = true;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    };
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };

    // Resize observer
    var self = this;
    this._resizeObserver = new ResizeObserver(function() { self._onResize(); });
    this._resizeObserver.observe(this.container);

    this._animate();
  };

  BuildViewer.prototype.loadBuild = function(build) {
    this._clearScene();
    this.currentBuild = build;
    this.currentLayerMax = build.size.y - 1;

    var cx = build.size.x / 2;
    var cy = build.size.y / 2;
    var cz = build.size.z / 2;
    var span = Math.max(build.size.x, build.size.y, build.size.z);
    var dist = span * 1.6 + 6;
    this.camera.position.set(cx + dist * 0.65, cy + dist * 0.45, cz + dist * 0.65);
    this.controls.target.set(cx, cy, cz);
    this.controls.update();

    this._buildMeshes(build);
    this._buildGround(build.size);
    this._applyLayerFilter();
  };

  BuildViewer.prototype._buildMeshes = function(build) {
    var BLOCK_COLORS = window.CraftGuide.BLOCK_COLORS;
    var byType = new Map();
    build.blocks.forEach(function(b) {
      if (!byType.has(b.type)) byType.set(b.type, []);
      byType.get(b.type).push(b);
    });

    var boxGeo = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    var self = this;

    byType.forEach(function(blockList, type) {
      var colorStr = BLOCK_COLORS[type] || '#8B8B8B';
      var hexColor = resolveColor(colorStr);
      var opacity = getBlockOpacity(colorStr);
      var transparent = opacity < 0.99;

      var mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(hexColor),
        transparent: transparent,
        opacity: transparent ? opacity : 1.0,
      });

      var mesh = new THREE.InstancedMesh(boxGeo, mat, blockList.length);
      mesh.userData.type = type;
      mesh.userData.blockList = blockList;
      mesh.frustumCulled = false;

      var mtx = new THREE.Matrix4();
      blockList.forEach(function(b, i) {
        mtx.makeTranslation(b.x + 0.5, b.y + 0.5, b.z + 0.5);
        mesh.setMatrixAt(i, mtx);
      });
      mesh.instanceMatrix.needsUpdate = true;
      self.scene.add(mesh);
      self.meshGroups.push({ mesh: mesh, blockList: blockList, type: type });

      // Wireframe edge overlay (darker color)
      var edgeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hexColor).multiplyScalar(0.45),
        transparent: true,
        opacity: 0.5,
        wireframe: true,
      });
      var edgeMesh = new THREE.InstancedMesh(boxGeo, edgeMat, blockList.length);
      edgeMesh.userData.blockList = blockList;
      edgeMesh.frustumCulled = false;
      blockList.forEach(function(b, i) {
        mtx.makeTranslation(b.x + 0.5, b.y + 0.5, b.z + 0.5);
        edgeMesh.setMatrixAt(i, mtx);
      });
      edgeMesh.instanceMatrix.needsUpdate = true;
      self.scene.add(edgeMesh);
      self.meshGroups.push({ mesh: edgeMesh, blockList: blockList, type: type + '_edge', isEdge: true });
    });
  };

  BuildViewer.prototype._buildGround = function(size) {
    var groundGeo = new THREE.PlaneGeometry(size.x + 6, size.z + 6);
    var groundMat = new THREE.MeshLambertMaterial({ color: new THREE.Color('#3D5C14') });
    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(size.x / 2, -0.01, size.z / 2);
    this.scene.add(ground);
    this.groundMeshes.push(ground);

    var gridSize = Math.max(size.x + 6, size.z + 6);
    var grid = new THREE.GridHelper(gridSize, Math.max(size.x + 6, size.z + 6), '#2A4010', '#2A4010');
    grid.position.set(size.x / 2, 0.01, size.z / 2);
    this.scene.add(grid);
    this.groundMeshes.push(grid);
  };

  BuildViewer.prototype.setLayerMax = function(layerIndex) {
    this.currentLayerMax = layerIndex;
    this._applyLayerFilter();
  };

  BuildViewer.prototype._applyLayerFilter = function() {
    var mtx = new THREE.Matrix4();
    var maxLayer = this.currentLayerMax;

    this.meshGroups.forEach(function(group) {
      var mesh = group.mesh;
      var blockList = group.blockList;
      var changed = false;

      blockList.forEach(function(b, i) {
        var visible = b.y <= maxLayer;
        var targetY = visible ? b.y + 0.5 : HIDDEN_Y;
        mesh.getMatrixAt(i, mtx);
        var currentY = mtx.elements[13];
        if (Math.abs(currentY - targetY) > 0.001) {
          mtx.makeTranslation(b.x + 0.5, targetY, b.z + 0.5);
          mesh.setMatrixAt(i, mtx);
          changed = true;
        }
      });

      if (changed) mesh.instanceMatrix.needsUpdate = true;
    });
  };

  BuildViewer.prototype.resetCamera = function(build) {
    if (!build) return;
    var cx = build.size.x / 2;
    var cy = build.size.y / 2;
    var cz = build.size.z / 2;
    var span = Math.max(build.size.x, build.size.y, build.size.z);
    var dist = span * 1.6 + 6;
    this.camera.position.set(cx + dist * 0.65, cy + dist * 0.45, cz + dist * 0.65);
    this.controls.target.set(cx, cy, cz);
    this.controls.update();
  };

  BuildViewer.prototype._clearScene = function() {
    this.meshGroups.forEach(function(group) {
      group.mesh.parent && group.mesh.parent.remove(group.mesh);
      group.mesh.geometry.dispose();
      group.mesh.material.dispose();
    });
    this.meshGroups = [];

    this.groundMeshes.forEach(function(m) {
      m.parent && m.parent.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this.groundMeshes = [];
  };

  BuildViewer.prototype._animate = function() {
    if (this.isDisposed) return;
    this.animFrameId = requestAnimationFrame(this._boundAnimate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  BuildViewer.prototype._onResize = function() {
    if (!this.container || !this.renderer || this.isDisposed) return;
    var w = this.container.clientWidth;
    var h = this.container.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  BuildViewer.prototype.dispose = function() {
    this.isDisposed = true;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this._clearScene();
    if (this._resizeObserver) this._resizeObserver.disconnect();
    if (this.controls) this.controls.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      var el = this.renderer.domElement;
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
  };

  // =============================================
  // Card Preview -- persistent singleton renderer
  // =============================================
  var _cardRenderer = null;
  var _cardScene = null;
  var _cardCamera = null;
  var _cardGround = null;
  var CARD_W = 200;
  var CARD_H = 150;
  var _cardMeshes = [];

  function _initCardRenderer() {
    if (_cardRenderer) return;
    var canvas = document.createElement('canvas');
    canvas.width = CARD_W;
    canvas.height = CARD_H;
    _cardRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
    _cardRenderer.setSize(CARD_W, CARD_H, false);
    _cardRenderer.setPixelRatio(1);

    _cardScene = new THREE.Scene();
    _cardScene.background = new THREE.Color('#0D1B2A');

    _cardCamera = new THREE.PerspectiveCamera(45, CARD_W / CARD_H, 0.1, 500);

    _cardScene.add(new THREE.AmbientLight(0xffffff, 0.65));
    var sun = new THREE.DirectionalLight(0xfffde8, 0.85);
    sun.position.set(-8, 20, -4);
    _cardScene.add(sun);
  }

  function _clearCardMeshes() {
    _cardMeshes.forEach(function(m) {
      _cardScene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    _cardMeshes = [];
    if (_cardGround) {
      _cardScene.remove(_cardGround);
      _cardGround.geometry.dispose();
      _cardGround.material.dispose();
      _cardGround = null;
    }
  }

  function renderCardPreview(build, destCanvas) {
    _initCardRenderer();
    _clearCardMeshes();

    var BLOCK_COLORS = window.CraftGuide.BLOCK_COLORS;
    var cx = build.size.x / 2;
    var cy = build.size.y / 2;
    var cz = build.size.z / 2;
    var span = Math.max(build.size.x, build.size.y, build.size.z);
    var dist = span * 1.6 + 6;
    _cardCamera.position.set(cx + dist * 0.65, cy + dist * 0.45, cz + dist * 0.65);
    _cardCamera.lookAt(cx, cy, cz);

    // Ground plane
    var gGeo = new THREE.PlaneGeometry(build.size.x + 6, build.size.z + 6);
    var gMat = new THREE.MeshLambertMaterial({ color: new THREE.Color('#3D5C14') });
    _cardGround = new THREE.Mesh(gGeo, gMat);
    _cardGround.rotation.x = -Math.PI / 2;
    _cardGround.position.set(cx, -0.01, cz);
    _cardScene.add(_cardGround);

    // Group by type
    var byType = new Map();
    build.blocks.forEach(function(b) {
      if (!byType.has(b.type)) byType.set(b.type, []);
      byType.get(b.type).push(b);
    });

    byType.forEach(function(blockList, type) {
      var colorStr = BLOCK_COLORS[type] || '#8B8B8B';
      var hexColor = resolveColor(colorStr);
      var opacity = getBlockOpacity(colorStr);
      var transparent = opacity < 0.99;

      var boxGeo = new THREE.BoxGeometry(1, 1, 1);
      var mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(hexColor),
        transparent: transparent,
        opacity: transparent ? opacity : 1.0,
      });
      var mesh = new THREE.InstancedMesh(boxGeo, mat, blockList.length);
      var mtx = new THREE.Matrix4();
      blockList.forEach(function(b, i) {
        mtx.makeTranslation(b.x + 0.5, b.y + 0.5, b.z + 0.5);
        mesh.setMatrixAt(i, mtx);
      });
      mesh.instanceMatrix.needsUpdate = true;
      _cardScene.add(mesh);
      _cardMeshes.push(mesh);
    });

    _cardRenderer.render(_cardScene, _cardCamera);

    // Copy to destination 2D canvas
    var ctx = destCanvas.getContext('2d');
    ctx.drawImage(_cardRenderer.domElement, 0, 0, destCanvas.width, destCanvas.height);
  }

  // Expose on namespace
  window.CraftGuide = window.CraftGuide || {};
  window.CraftGuide.BuildViewer = BuildViewer;
  window.CraftGuide.renderCardPreview = renderCardPreview;

})();
