import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const createRoundedPanelGeometry = (width, height, depth, radius) => {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.06,
    bevelThickness: 0.05,
    curveSegments: 12,
  });
};

const createLabelTexture = (label, accent = '#5EE0B1') => {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 220;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(7, 17, 31, 0.96)');
  gradient.addColorStop(1, 'rgba(18, 52, 59, 0.9)');
  context.fillStyle = gradient;
  context.roundRect(8, 8, canvas.width - 16, canvas.height - 16, 52);
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = 'rgba(255,255,255,0.2)';
  context.stroke();
  context.fillStyle = accent;
  context.roundRect(48, 42, 110, 14, 7);
  context.fill();
  context.fillStyle = '#ffffff';
  context.font = '700 64px Manrope, Inter, sans-serif';
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(label, 48, 132);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const createLabelSprite = (label, accent) => {
  const texture = createLabelTexture(label, accent);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.6, 0.8, 1);
  return sprite;
};

const SceneFallback = ({ centerLabel, labels }) => (
  <div className="absolute inset-0 grid place-items-center px-5">
    <div className="relative h-[340px] w-full max-w-[520px]">
      <div className="absolute left-1/2 top-1/2 grid h-36 w-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/15 bg-white/[0.08] text-center shadow-2xl shadow-home-mint/10 backdrop-blur-xl">
        <span className="font-display text-lg font-bold text-white">{centerLabel}</span>
      </div>
      {labels.map((label, index) => {
        const positions = [
          'left-0 top-5',
          'right-0 top-16',
          'bottom-4 left-1/2 -translate-x-1/2',
        ];
        return (
          <div
            key={label}
            className={`absolute ${positions[index]} rounded-2xl border border-white/15 bg-home-midnight/80 px-4 py-3 font-display text-sm font-bold text-white shadow-xl`}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-home-mint" />
            {label}
          </div>
        );
      })}
    </div>
  </div>
);

const HomeProtectionScene = ({ reducedMotion = false, centerLabel, labels }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let renderer;
    let frameId = 0;
    let resizeObserver;
    let disposed = false;
    let didSignalReady = false;
    let targetRotationX = -0.08;
    let targetRotationY = 0.18;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.25, 10.6);

    scene.add(new THREE.AmbientLight(0xc7fff0, 1.4));
    const keyLight = new THREE.PointLight(0x5ee0b1, 22, 24, 2);
    keyLight.position.set(4, 4, 6);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x7aa7ff, 14, 20, 2);
    fillLight.position.set(-5, -2, 5);
    scene.add(fillLight);

    const protectionGroup = new THREE.Group();
    protectionGroup.rotation.set(targetRotationX, targetRotationY, 0);
    scene.add(protectionGroup);

    const passGeometry = createRoundedPanelGeometry(3.5, 2.2, 0.24, 0.34);
    passGeometry.center();
    const passMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b1a2b,
      metalness: 0.12,
      roughness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25,
      transparent: true,
      opacity: 0.94,
    });
    const pass = new THREE.Mesh(passGeometry, passMaterial);
    protectionGroup.add(pass);

    const passGlow = new THREE.Mesh(
      new THREE.RingGeometry(0.52, 0.68, 64),
      new THREE.MeshBasicMaterial({ color: 0x5ee0b1, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
    );
    passGlow.position.set(0, 0.16, 0.22);
    protectionGroup.add(passGlow);

    const coreTexture = createLabelTexture(centerLabel, '#5EE0B1');
    const coreMaterial = new THREE.SpriteMaterial({ map: coreTexture, transparent: true });
    const coreLabel = new THREE.Sprite(coreMaterial);
    coreLabel.scale.set(2.45, 0.75, 1);
    coreLabel.position.set(0, -0.72, 0.34);
    protectionGroup.add(coreLabel);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x5ee0b1,
      transparent: true,
      opacity: 0.28,
    });
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.018, 8, 160), orbitMaterial);
    orbit.rotation.x = Math.PI / 2.25;
    orbit.rotation.z = -0.18;
    protectionGroup.add(orbit);

    const modulePositions = [
      new THREE.Vector3(-2.9, 1.95, 0.35),
      new THREE.Vector3(3.05, 1.3, -0.2),
      new THREE.Vector3(0.65, -2.35, 0.55),
    ];
    const moduleAccents = ['#5EE0B1', '#8CCBFF', '#C0A8FF'];

    labels.forEach((label, index) => {
      const sprite = createLabelSprite(label, moduleAccents[index]);
      sprite.position.copy(modulePositions[index]);
      protectionGroup.add(sprite);
    });

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      if (!didSignalReady) {
        didSignalReady = true;
        setReady(true);
      }
    };

    const handlePointerMove = (event) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = 0.18 + normalizedX * 0.22;
      targetRotationX = -0.08 + normalizedY * 0.14;
    };

    const handlePointerLeave = () => {
      targetRotationX = -0.08;
      targetRotationY = 0.18;
    };

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      const elapsed = clock.getElapsedTime();
      protectionGroup.rotation.x += (targetRotationX - protectionGroup.rotation.x) * 0.045;
      protectionGroup.rotation.y += (targetRotationY - protectionGroup.rotation.y) * 0.045;
      if (!reducedMotion) {
        orbit.rotation.z = -0.18 + elapsed * 0.055;
        pass.position.y = Math.sin(elapsed * 0.7) * 0.08;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) frameId = requestAnimationFrame(animate);
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    resize();
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.filter(Boolean).forEach((material) => {
          material.map?.dispose?.();
          material.dispose?.();
        });
      });
      renderer.dispose();
    };
  }, [centerLabel, labels, reducedMotion]);

  return (
    <div ref={containerRef} className="relative h-full min-h-[420px] w-full" aria-hidden="true">
      <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <SceneFallback centerLabel={centerLabel} labels={labels} />
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default HomeProtectionScene;
