import HeroWebGLCanvas from './HeroWebGLCanvas';
import {
  createGlowTexture,
  createShieldGeometry,
  damp,
  easeOutCubic,
} from './sceneShared';

const clampPhase = (value, start, end) => (
  easeOutCubic(Math.min(Math.max((value - start) / (end - start), 0), 1))
);

const createExperience = ({ THREE, scene, camera, renderer, isSmallViewport }) => {
  const createLayerMaterial = (color) => new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.16,
    metalness: 0.18,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    transparent: true,
    opacity: 0.58,
  });

  const system = new THREE.Group();
  const layerDefinitions = [
    { color: 0x5ee0b1, rest: new THREE.Vector3(-1.55, 0.75, 0.3), rotation: -0.18 },
    { color: 0x8ccbff, rest: new THREE.Vector3(1.65, 0.35, -0.1), rotation: 0.2 },
    { color: 0xb9a7ff, rest: new THREE.Vector3(0.45, -1.35, 0.55), rotation: 0.1 },
  ];
  const layers = layerDefinitions.map((definition, index) => new THREE.Mesh(
    createShieldGeometry({ width: 3.15 - (index * 0.16), height: 4 - (index * 0.18), depth: 0.14 }),
    createLayerMaterial(definition.color)
  ));
  const unfoldProgress = { current: 0 };

  const assembledDepths = [-0.08, 0, 0.08];
  const layerEdges = layers.map((layer, index) => {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(layer.geometry, 24),
      new THREE.LineBasicMaterial({
        color: layerDefinitions[index].color,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      })
    );
    layer.position.z = assembledDepths[index];
    layer.add(edges);
    system.add(layer);
    return edges;
  });

  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf1fff9,
    emissive: 0x25c990,
    emissiveIntensity: 1.25,
    metalness: 0.08,
    roughness: 0.18,
    clearcoat: 1,
    transparent: true,
    opacity: 0.94,
  });
  const sharedCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 3), coreMaterial);
  sharedCore.position.z = 0.74;
  system.add(sharedCore);

  const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createGlowTexture('#5EE0B1'),
      color: 0x5ee0b1,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  coreGlow.position.z = 0.22;
  coreGlow.scale.set(3.4, 3.4, 1);
  system.add(coreGlow);

  const ambientLight = new THREE.HemisphereLight(0xe6fff7, 0x07111f, 1.5);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.25);
  keyLight.position.set(-3.6, 4.4, 5.6);
  const coreLight = new THREE.PointLight(0x5ee0b1, 5.5, 10, 2);
  coreLight.position.set(0, 0.2, 2.4);
  scene.add(ambientLight, keyLight, coreLight, system);

  system.rotation.set(-0.04, -0.04, 0);
  system.scale.setScalar(isSmallViewport ? 0.72 : 0.92);
  camera.position.z = isSmallViewport ? 12.2 : 10.8;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  const tilt = { x: 0, y: 0 };

  return {
    update: ({ elapsed, pointer, scrollProgress }) => {
      unfoldProgress.current = damp(unfoldProgress.current, scrollProgress, 0.09);

      const layerProgress = clampPhase(unfoldProgress.current, 0.2, 0.8);
      const finishProgress = clampPhase(unfoldProgress.current, 0.75, 1);

      layers.forEach((layer, index) => {
        const definition = layerDefinitions[index];
        layer.position.x = THREE.MathUtils.lerp(0, definition.rest.x, layerProgress);
        layer.position.y = THREE.MathUtils.lerp(0, definition.rest.y, layerProgress);
        layer.position.z = THREE.MathUtils.lerp(
          assembledDepths[index],
          definition.rest.z,
          layerProgress
        );
        layer.rotation.z = THREE.MathUtils.lerp(0, definition.rotation, layerProgress);
        layer.material.emissiveIntensity = THREE.MathUtils.lerp(0.16, 0.28, finishProgress);
        layerEdges[index].material.opacity = THREE.MathUtils.lerp(0.3, 0.86, finishProgress);
      });

      coreGlow.material.opacity = THREE.MathUtils.lerp(0.34, 0.09, finishProgress);
      coreLight.intensity = THREE.MathUtils.lerp(5.5, 2.2, finishProgress);
      sharedCore.rotation.x = elapsed * 0.08;
      sharedCore.rotation.y = elapsed * 0.11;

      tilt.x = damp(tilt.x, pointer.y * 0.04, 0.045);
      tilt.y = damp(tilt.y, pointer.x * 0.065, 0.045);
      system.rotation.x = -0.04 + tilt.x;
      system.rotation.y = -0.04 + tilt.y;
      system.position.y = Math.sin(elapsed * 0.45) * 0.045;
    },
    resize: ({ width, height }) => {
      const compactScale = width < 768 ? 0.72 : 0.92;
      const shortScale = height < 560 ? 0.88 : 1;
      system.scale.setScalar(compactScale * shortScale);
    },
  };
};

const ScrollUnfoldScene = ({ onReady, onError }) => (
  <HeroWebGLCanvas
    createExperience={createExperience}
    onReady={onReady}
    onError={onError}
    trackScroll
  />
);

export default ScrollUnfoldScene;
