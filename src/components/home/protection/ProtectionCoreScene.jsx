import HeroWebGLCanvas from './HeroWebGLCanvas';
import {
  createGlowTexture,
  createShieldGeometry,
  damp,
  easeOutCubic,
} from './sceneShared';

const ACTIVATION_DURATION = 2.5;
const MODULE_DELAYS = [0.95, 1.45, 1.95];

const clampProgress = (elapsed, delay, duration) => (
  easeOutCubic(Math.min(Math.max((elapsed - delay) / duration, 0), 1))
);

const setDrawProgress = (geometry, progress) => {
  const availableCount = geometry.index?.count ?? geometry.attributes.position.count;
  const drawCount = Math.floor((availableCount * progress) / 3) * 3;
  geometry.setDrawRange(0, drawCount);
};

const createExperience = ({ THREE, scene, camera, renderer, isSmallViewport }) => {
  const shieldMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0b2230,
    emissive: 0x073b32,
    emissiveIntensity: 0.28,
    metalness: 0.58,
    roughness: 0.24,
    clearcoat: 0.9,
    clearcoatRoughness: 0.16,
    transparent: true,
    opacity: 0,
  });
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe8fff7,
    emissive: 0x22bd8a,
    emissiveIntensity: 1.35,
    metalness: 0.12,
    roughness: 0.18,
    clearcoat: 1,
    transparent: true,
    opacity: 0,
  });
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xbfffea,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const secondaryOrbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xf4fffb,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });

  const system = new THREE.Group();
  const shield = new THREE.Mesh(createShieldGeometry({ width: 2.9, height: 3.65, depth: 0.18 }), shieldMaterial);
  const energyCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.74, 3), coreMaterial);
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.022, 8, 220), orbitMaterial);
  const secondaryOrbit = new THREE.Mesh(
    new THREE.TorusGeometry(2.72, 0.014, 8, 180),
    secondaryOrbitMaterial
  );
  const moduleAnchors = [
    new THREE.Vector3(-2.65, 1.75, 0.2),
    new THREE.Vector3(2.8, 1.2, -0.2),
    new THREE.Vector3(0.85, -2.35, 0.45),
  ];
  const activationProgress = { core: 0, orbit: 0, modules: [0, 0, 0] };

  shield.position.z = -1.8;
  shield.scale.setScalar(0.72);
  energyCore.position.z = 1.4;
  energyCore.scale.setScalar(0.05);
  orbit.rotation.set(Math.PI * 0.53, 0.16, -0.12);
  secondaryOrbit.rotation.set(-0.3, Math.PI * 0.48, 0.38);
  orbit.scale.setScalar(0.86);
  secondaryOrbit.scale.setScalar(0.82);
  orbit.geometry.setDrawRange(0, 0);
  secondaryOrbit.geometry.setDrawRange(0, 0);
  system.add(shield, energyCore, orbit, secondaryOrbit);

  const shieldEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(shield.geometry, 24),
    new THREE.LineBasicMaterial({
      color: 0xdffff4,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  shield.add(shieldEdges);

  const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createGlowTexture('#5EE0B1'),
      color: 0x5ee0b1,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  coreGlow.position.set(0, 0, -0.62);
  coreGlow.scale.set(1.4, 1.4, 1);
  system.add(coreGlow);

  const connectorCurves = moduleAnchors.map((anchor, index) => {
    const startDirection = anchor.clone().normalize();
    const start = new THREE.Vector3(
      startDirection.x * 0.68,
      startDirection.y * 0.68,
      0.28
    );
    const bend = anchor.clone().multiplyScalar(0.52);
    bend.z += index === 1 ? 0.55 : -0.18;
    return new THREE.CatmullRomCurve3([start, bend, anchor.clone()]);
  });

  const connectors = connectorCurves.map((curve) => {
    const material = new THREE.MeshBasicMaterial({
      color: 0x82e9c7,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const connector = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 56, 0.024, 8, false),
      material
    );
    connector.geometry.setDrawRange(0, 0);
    system.add(connector);
    return connector;
  });

  const anchorGeometry = new THREE.SphereGeometry(0.12, 24, 16);
  const moduleNodes = moduleAnchors.map((anchor) => {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xeafff8,
      emissive: 0x2acb98,
      emissiveIntensity: 0.2,
      metalness: 0.1,
      roughness: 0.18,
      transparent: true,
      opacity: 0,
    });
    const node = new THREE.Mesh(anchorGeometry, material);
    node.position.copy(anchor);
    node.scale.setScalar(0.01);
    system.add(node);
    return node;
  });

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 12),
    new THREE.MeshBasicMaterial({
      color: 0xf4fffb,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  pulse.visible = false;
  system.add(pulse);

  const pointCount = 150;
  const pointPositions = new Float32Array(pointCount * 3);
  for (let index = 0; index < pointCount; index += 1) {
    const angle = index * 2.399963;
    const radius = 3.8 + (((index * 17) % 41) / 41) * 3.2;
    pointPositions[(index * 3)] = Math.cos(angle) * radius;
    pointPositions[(index * 3) + 1] = Math.sin(angle) * radius * 0.72;
    pointPositions[(index * 3) + 2] = -1.4 - (((index * 29) % 37) / 37) * 4.2;
  }
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  const backgroundPoints = new THREE.Points(
    pointGeometry,
    new THREE.PointsMaterial({
      color: 0xbdeedf,
      size: isSmallViewport ? 0.034 : 0.042,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  scene.add(backgroundPoints);

  const ambientLight = new THREE.HemisphereLight(0xe5fff7, 0x07111f, 1.45);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(-3.8, 4.4, 5.8);
  const coreLight = new THREE.PointLight(0x5ee0b1, 6.2, 9, 2);
  coreLight.position.set(0.2, 0.1, 2.2);
  scene.add(ambientLight, keyLight, coreLight, system);

  system.rotation.set(-0.045, 0.03, 0);
  system.scale.setScalar(isSmallViewport ? 0.72 : 0.93);
  camera.position.z = isSmallViewport ? 12.4 : 11.2;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const tilt = { x: 0, y: 0 };
  const orbitSpeed = 0.045;
  const secondaryOrbitSpeed = 0.032;
  const pulseInterval = 3.2;
  const pulseTravelDuration = 1.1;

  return {
    update: ({ elapsed, pointer }) => {
      activationProgress.core = clampProgress(elapsed, 0, 0.82);
      activationProgress.orbit = clampProgress(elapsed, 0.34, 1.08);
      activationProgress.modules.forEach((_, index) => {
        activationProgress.modules[index] = clampProgress(elapsed, MODULE_DELAYS[index], 0.55);
      });

      shield.position.z = THREE.MathUtils.lerp(-1.8, -0.34, activationProgress.core);
      shield.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, activationProgress.core));
      shieldMaterial.opacity = 0.8 * activationProgress.core;
      shieldEdges.material.opacity = 0.34 * activationProgress.core;

      const coreBreath = 1 + (((Math.sin(elapsed * 1.08) + 1) / 2) * 0.018);
      energyCore.position.z = THREE.MathUtils.lerp(1.4, 0.36, activationProgress.core);
      energyCore.scale.setScalar(
        THREE.MathUtils.lerp(0.05, 1, activationProgress.core) * coreBreath
      );
      energyCore.rotation.x = elapsed * 0.055;
      energyCore.rotation.y = elapsed * 0.07;
      coreMaterial.opacity = 0.96 * activationProgress.core;
      coreMaterial.emissiveIntensity = 0.72 + (activationProgress.core * 0.72);
      coreGlow.material.opacity = 0.22 * activationProgress.core;
      const glowScale = THREE.MathUtils.lerp(1.4, 4.1, activationProgress.core);
      coreGlow.scale.set(glowScale, glowScale, 1);

      const secondaryOrbitProgress = clampProgress(elapsed, 0.58, 1.02);
      setDrawProgress(orbit.geometry, activationProgress.orbit);
      setDrawProgress(secondaryOrbit.geometry, secondaryOrbitProgress);
      orbitMaterial.opacity = 0.52 * activationProgress.orbit;
      secondaryOrbitMaterial.opacity = 0.34 * secondaryOrbitProgress;
      orbit.scale.setScalar(THREE.MathUtils.lerp(0.86, 1, activationProgress.orbit));
      secondaryOrbit.scale.setScalar(THREE.MathUtils.lerp(0.82, 1, secondaryOrbitProgress));
      orbit.rotation.y = 0.16 + (elapsed * orbitSpeed);
      secondaryOrbit.rotation.x = -0.3 - (elapsed * secondaryOrbitSpeed);

      activationProgress.modules.forEach((progress, index) => {
        const connector = connectors[index];
        const node = moduleNodes[index];
        setDrawProgress(connector.geometry, progress);
        connector.material.opacity = 0.48 * progress;
        node.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, progress));
        node.material.opacity = 0.96 * progress;
        node.material.emissiveIntensity = THREE.MathUtils.lerp(0.2, 1.25, progress);
      });

      const pulseElapsed = elapsed - ACTIVATION_DURATION;
      if (pulseElapsed >= 0) {
        const pulseCycle = Math.floor(pulseElapsed / pulseInterval);
        const pulseTime = pulseElapsed % pulseInterval;
        pulse.visible = pulseTime <= pulseTravelDuration;
        if (pulse.visible) {
          const curve = connectorCurves[pulseCycle % connectorCurves.length];
          const travelProgress = easeOutCubic(pulseTime / pulseTravelDuration);
          pulse.position.copy(curve.getPointAt(travelProgress));
          pulse.material.opacity = Math.sin(Math.PI * travelProgress) * 0.9;
        }
      } else {
        pulse.visible = false;
      }

      tilt.x = damp(tilt.x, pointer.y * 0.045, 0.04);
      tilt.y = damp(tilt.y, pointer.x * 0.075, 0.04);
      system.rotation.x = -0.045 + tilt.x;
      system.rotation.y = 0.03 + tilt.y;
      system.position.y = Math.sin(elapsed * 0.46) * 0.055 * activationProgress.core;
      backgroundPoints.rotation.z = elapsed * 0.006;
      backgroundPoints.material.opacity = 0.22 * clampProgress(elapsed, 0.2, 1.3);
    },
    resize: ({ width, height }) => {
      const compactScale = width < 768 ? 0.72 : 0.93;
      const shortScale = height < 560 ? 0.88 : 1;
      system.scale.setScalar(compactScale * shortScale);
      backgroundPoints.material.size = width < 768 ? 0.034 : 0.042;
    },
  };
};

const ProtectionCoreScene = ({ onReady, onError }) => (
  <HeroWebGLCanvas createExperience={createExperience} onReady={onReady} onError={onError} />
);

export default ProtectionCoreScene;
