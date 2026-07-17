import HeroWebGLCanvas from './HeroWebGLCanvas';
import {
  createGlowTexture,
  createRoundedRectGeometry,
  createShieldGeometry,
  damp,
  easeOutCubic,
} from './sceneShared';

const clampProgress = (elapsed, delay, duration) => (
  easeOutCubic(Math.min(Math.max((elapsed - delay) / duration, 0), 1))
);

const createExperience = ({ THREE, scene, camera, renderer, isSmallViewport }) => {
  const backMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x07111f,
    metalness: 0.72,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xb9ffe8,
    metalness: 0.05,
    roughness: 0.08,
    transmission: 0.72,
    thickness: 1.35,
    transparent: true,
    opacity: 0.52,
    clearcoat: 1,
  });
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x25c990,
    emissive: 0x0c805d,
    emissiveIntensity: 1.3,
    metalness: 0.18,
    roughness: 0.22,
    transparent: true,
    opacity: 0.92,
  });

  const root = new THREE.Group();
  const backLayer = new THREE.Mesh(
    createShieldGeometry({ width: 3.55, height: 4.45, depth: 0.28 }),
    backMaterial
  );
  const glassLayer = new THREE.Mesh(
    createShieldGeometry({ width: 3.25, height: 4.1, depth: 0.18 }),
    glassMaterial
  );
  const coreLayer = new THREE.Mesh(
    createShieldGeometry({ width: 2.5, height: 3.25, depth: 0.12 }),
    coreMaterial
  );
  const layerProgress = { back: 0, glass: 0, core: 0 };

  backLayer.position.z = -2.8;
  glassLayer.position.z = 2.4;
  coreLayer.position.z = 3.4;
  root.add(backLayer, glassLayer, coreLayer);

  const whiteEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(backLayer.geometry, 24),
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    })
  );
  const mintEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(glassLayer.geometry, 24),
    new THREE.LineBasicMaterial({
      color: 0x8fffd9,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    })
  );
  backLayer.add(whiteEdges);
  glassLayer.add(mintEdges);

  const markMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf4fffb,
    emissive: 0x25c990,
    emissiveIntensity: 0.38,
    metalness: 0.08,
    roughness: 0.2,
    clearcoat: 1,
  });
  const healioMark = new THREE.Group();
  const markLeft = new THREE.Mesh(
    createRoundedRectGeometry({ width: 0.16, height: 0.82, depth: 0.08, radius: 0.07 }),
    markMaterial
  );
  const markRight = new THREE.Mesh(
    createRoundedRectGeometry({ width: 0.16, height: 0.82, depth: 0.08, radius: 0.07 }),
    markMaterial
  );
  const markBridge = new THREE.Mesh(
    createRoundedRectGeometry({ width: 0.62, height: 0.15, depth: 0.08, radius: 0.065 }),
    markMaterial
  );
  markLeft.position.x = -0.24;
  markRight.position.x = 0.24;
  healioMark.position.z = 0.13;
  healioMark.add(markLeft, markRight, markBridge);
  coreLayer.add(healioMark);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createGlowTexture('#5EE0B1'),
      color: 0x5ee0b1,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  glow.position.set(0, -2.36, -0.55);
  glow.scale.set(4.6, 1.28, 1);
  root.add(glow);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3.4, 4.2, 5.5);
  const edgeLight = new THREE.PointLight(0x67ffd0, 7.5, 12, 2);
  edgeLight.position.set(3.1, 0.8, 4.2);
  scene.add(keyLight, edgeLight);

  root.rotation.x = -0.025;
  root.rotation.y = -0.07;
  root.scale.setScalar(isSmallViewport ? 0.82 : 1);
  scene.add(root);

  camera.position.z = isSmallViewport ? 10.8 : 10;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  const restingZ = { back: -0.34, glass: 0, core: 0.3 };
  const tilt = { x: 0, y: 0 };

  return {
    update: ({ elapsed, introProgress, pointer }) => {
      layerProgress.back = clampProgress(elapsed, 0, 0.88);
      layerProgress.glass = clampProgress(elapsed, 0.14, 0.92);
      layerProgress.core = clampProgress(elapsed, 0.28, 0.92);

      backLayer.position.z = THREE.MathUtils.lerp(-2.8, restingZ.back, layerProgress.back);
      glassLayer.position.z = THREE.MathUtils.lerp(2.4, restingZ.glass, layerProgress.glass);
      coreLayer.position.z = THREE.MathUtils.lerp(3.4, restingZ.core, layerProgress.core);

      tilt.x = damp(tilt.x, pointer.y * 0.065, 0.045);
      tilt.y = damp(tilt.y, pointer.x * 0.1, 0.045);
      root.rotation.x = -0.025 + tilt.x;
      root.rotation.y = -0.07 + tilt.y;
      root.position.y = Math.sin(elapsed * 0.52) * 0.06 * introProgress;

      const lightSweep = (Math.sin(elapsed * 0.42) + 1) / 2;
      edgeLight.position.x = THREE.MathUtils.lerp(-3.1, 3.1, lightSweep);
      edgeLight.position.y = 0.72 + (Math.cos(elapsed * 0.31) * 0.22);
      whiteEdges.material.opacity = 0.34 + (lightSweep * 0.12);
      mintEdges.material.opacity = 0.54 + (lightSweep * 0.12);
    },
    resize: ({ width, height }) => {
      const compactScale = width < 768 ? 0.82 : 1;
      const shortScale = height < 560 ? 0.88 : 1;
      root.scale.setScalar(compactScale * shortScale);
    },
  };
};

const GlassShieldScene = ({ onReady, onError }) => (
  <HeroWebGLCanvas createExperience={createExperience} onReady={onReady} onError={onError} />
);

export default GlassShieldScene;
