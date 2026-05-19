import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';

const drawRoundRect = (context, x, y, width, height, radius) => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
};

const createLabelTexture = (lines, options = {}) => {
  const canvas = document.createElement('canvas');
  canvas.width = options.width || 640;
  canvas.height = options.height || 320;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, options.backgroundFrom || 'rgba(15, 23, 42, 0.94)');
  gradient.addColorStop(1, options.backgroundTo || 'rgba(20, 184, 166, 0.38)');

  drawRoundRect(context, 24, 24, canvas.width - 48, canvas.height - 48, options.radius || 42);
  context.fillStyle = gradient;
  context.fill();
  context.strokeStyle = options.border || 'rgba(255,255,255,0.28)';
  context.lineWidth = options.borderWidth || 5;
  context.stroke();

  if (options.accent) {
    context.fillStyle = options.accent;
    drawRoundRect(context, 48, 46, 112, 20, 10);
    context.fill();
  }

  context.fillStyle = options.color || '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = options.font || '900 64px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  const lineHeight = options.lineHeight || 70;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2 + (options.offsetY || 0);
  lines.forEach((line, index) => context.fillText(line, canvas.width / 2, startY + index * lineHeight));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const createLabelPlane = (lines, width, height, options = {}) => {
  const texture = createLabelTexture(lines, options);
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    })
  );
};

const createGlassPanel = (width, height, color = 0x14b8a6, opacity = 0.22) => {
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.08),
    new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness: 0.18,
      metalness: 0.16,
      transmission: 0.16,
      thickness: 0.35,
      clearcoat: 0.78,
      clearcoatRoughness: 0.18,
    })
  );
  panel.castShadow = true;
  panel.receiveShadow = true;
  return panel;
};

const createCoinTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(84, 62, 10, 128, 128, 126);
  gradient.addColorStop(0, '#fff8c7');
  gradient.addColorStop(0.48, '#e8b94e');
  gradient.addColorStop(1, '#9b621c');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  context.strokeStyle = 'rgba(104, 62, 12, 0.44)';
  context.lineWidth = 14;
  context.beginPath();
  context.arc(128, 128, 92, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = '#6b3f0b';
  context.font = '900 58px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('700+', 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const createCoin = (texture, radius = 0.14, depth = 0.035) => {
  const side = new THREE.MeshStandardMaterial({ color: 0xa66b1f, roughness: 0.22, metalness: 0.62 });
  const face = new THREE.MeshStandardMaterial({ color: 0xf7cb61, map: texture, roughness: 0.18, metalness: 0.64 });
  const coin = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 64), [side, face, face]);
  coin.rotation.x = Math.PI / 2;
  coin.castShadow = true;
  return coin;
};

const createBudgetCard = (value, label) => {
  const group = new THREE.Group();
  const card = createLabelPlane([value, label], 1.48, 0.82, {
    width: 720,
    height: 400,
    backgroundFrom: 'rgba(255, 251, 235, 0.98)',
    backgroundTo: 'rgba(252, 211, 77, 0.9)',
    border: 'rgba(255,255,255,0.9)',
    color: '#713f12',
    font: '900 66px system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 76,
    accent: '#10b981',
  });
  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.86, 0.055),
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.28,
      metalness: 0.12,
    })
  );
  backing.position.z = -0.035;
  backing.castShadow = true;
  backing.receiveShadow = true;
  group.add(backing, card);

  const coinTexture = createCoinTexture();
  for (let index = 0; index < 7; index += 1) {
    const coin = createCoin(coinTexture, 0.115 + (index % 2) * 0.018);
    coin.position.set(-0.58 + index * 0.16, -0.55 + (index % 3) * 0.035, 0.12);
    coin.rotation.z = -0.3 + index * 0.22;
    group.add(coin);
  }

  return group;
};

const createShield = () => {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.42);
  shape.lineTo(0.34, 0.26);
  shape.bezierCurveTo(0.32, 0.02, 0.22, -0.24, 0, -0.42);
  shape.bezierCurveTo(-0.22, -0.24, -0.32, 0.02, -0.34, 0.26);
  shape.lineTo(0, 0.42);

  const shield = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, {
      depth: 0.055,
      bevelEnabled: true,
      bevelSize: 0.022,
      bevelThickness: 0.016,
      bevelSegments: 4,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x14b8a6,
      emissive: 0x047857,
      emissiveIntensity: 0.18,
      roughness: 0.24,
      metalness: 0.22,
      clearcoat: 0.75,
    })
  );
  shield.position.z = -0.03;
  shield.castShadow = true;
  group.add(shield);

  const label = createLabelPlane(['98%', 'bleibt'], 0.6, 0.4, {
    width: 420,
    height: 280,
    backgroundFrom: 'rgba(236,253,245,0.96)',
    backgroundTo: 'rgba(167,243,208,0.9)',
    border: 'rgba(255,255,255,0.82)',
    color: '#064e3b',
    font: '900 56px system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 58,
  });
  label.position.set(0, 0.04, 0.07);
  group.add(label);
  return group;
};

const drawCharacter = (happy) => {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 560;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 320, 560);

  context.save();
  context.translate(happy ? 10 : -8, happy ? -4 : 12);
  context.shadowColor = 'rgba(2, 6, 23, 0.28)';
  context.shadowBlur = 18;
  context.shadowOffsetY = 12;

  const jacket = context.createLinearGradient(90, 190, 235, 420);
  jacket.addColorStop(0, happy ? '#10b981' : '#64748b');
  jacket.addColorStop(1, happy ? '#047857' : '#334155');
  context.fillStyle = jacket;
  drawRoundRect(context, 95, 190, 130, 210, 44);
  context.fill();

  context.fillStyle = '#f8fafc';
  drawRoundRect(context, 132, 202, 56, 132, 18);
  context.fill();

  context.fillStyle = happy ? '#0f766e' : '#475569';
  drawRoundRect(context, 104, 360, 48, 150, 22);
  context.fill();
  drawRoundRect(context, 168, 360, 48, 150, 22);
  context.fill();

  context.fillStyle = '#0f172a';
  drawRoundRect(context, 93, 494, 70, 30, 15);
  context.fill();
  drawRoundRect(context, 160, 494, 70, 30, 15);
  context.fill();

  context.strokeStyle = happy ? '#059669' : '#64748b';
  context.lineWidth = 22;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(106, 220);
  context.quadraticCurveTo(happy ? 62 : 78, happy ? 282 : 304, happy ? 74 : 92, happy ? 352 : 374);
  context.stroke();
  context.beginPath();
  context.moveTo(214, 220);
  context.quadraticCurveTo(happy ? 258 : 242, happy ? 280 : 306, happy ? 244 : 230, happy ? 342 : 370);
  context.stroke();

  context.fillStyle = '#f1c6a8';
  context.beginPath();
  context.arc(160, 128, 54, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#1f2937';
  context.beginPath();
  context.ellipse(154, 93, 58, 36, -0.18, 0, Math.PI * 2);
  context.fill();
  context.fillRect(106, 100, 22, 48);

  context.fillStyle = '#0f172a';
  context.beginPath();
  context.arc(140, 128, 4.5, 0, Math.PI * 2);
  context.arc(180, 128, 4.5, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#0f172a';
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.beginPath();
  if (happy) {
    context.moveTo(137, 154);
    context.quadraticCurveTo(160, 174, 184, 154);
  } else {
    context.moveTo(137, 166);
    context.quadraticCurveTo(160, 150, 184, 166);
  }
  context.stroke();

  if (happy) {
    context.strokeStyle = '#bbf7d0';
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(124, 204);
    context.lineTo(196, 204);
    context.stroke();
  }

  context.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const createPersonSprite = () => {
  const sadMap = drawCharacter(false);
  const happyMap = drawCharacter(true);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: sadMap,
      transparent: true,
      depthWrite: false,
    })
  );
  sprite.scale.set(0.68, 1.18, 1);
  return { sprite, sadMap, happyMap };
};

const IkkSwitch3DScene = () => {
  const { t } = useTranslation('ambulant');
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x07111f, 6.5, 11);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambient = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.6, 4.2, 4.6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8ee7ff, 1.1);
    rimLight.position.set(-3.2, 2.8, 3.6);
    scene.add(rimLight);

    const budgetLight = new THREE.PointLight(0xfacc15, 3.2, 5.5);
    budgetLight.position.set(3.1, 1.2, 1.35);
    scene.add(budgetLight);

    const group = new THREE.Group();
    scene.add(group);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8.8, 4.6),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.76,
        metalness: 0.08,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.24;
    floor.receiveShadow = true;
    group.add(floor);

    const bridgePoints = [
      new THREE.Vector3(-3.05, -0.44, 0.05),
      new THREE.Vector3(-1.45, 0.08, 0.18),
      new THREE.Vector3(0, 0.24, 0.28),
      new THREE.Vector3(1.42, 0.08, 0.18),
      new THREE.Vector3(3.05, -0.44, 0.05),
    ];
    const curve = new THREE.CatmullRomCurve3(bridgePoints);
    const bridgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ddbb2,
      emissive: 0x0f766e,
      emissiveIntensity: 0.2,
      roughness: 0.32,
      metalness: 0.22,
    });
    const deckMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8fff2,
      roughness: 0.36,
      metalness: 0.08,
    });
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x99f6e4,
      emissive: 0x0f766e,
      emissiveIntensity: 0.16,
      roughness: 0.24,
      metalness: 0.18,
    });

    const bridgeCore = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.045, 16, false), bridgeMaterial);
    bridgeCore.castShadow = true;
    group.add(bridgeCore);

    const makeOffsetCurve = (zOffset, yOffset = 0) =>
      new THREE.CatmullRomCurve3(
        bridgePoints.map((point) => new THREE.Vector3(point.x, point.y + yOffset, point.z + zOffset))
      );
    group.add(
      new THREE.Mesh(new THREE.TubeGeometry(makeOffsetCurve(-0.36, 0.18), 160, 0.014, 10, false), railMaterial),
      new THREE.Mesh(new THREE.TubeGeometry(makeOffsetCurve(0.36, 0.18), 160, 0.014, 10, false), railMaterial)
    );

    const plankGeometry = new THREE.BoxGeometry(0.32, 0.04, 0.62);
    for (let index = 0; index < 19; index += 1) {
      const tValue = index / 18;
      const point = curve.getPoint(tValue);
      const tangent = curve.getTangent(tValue);
      const plank = new THREE.Mesh(plankGeometry, deckMaterial);
      plank.position.set(point.x, point.y - 0.05, point.z);
      plank.rotation.y = -Math.atan2(tangent.z, tangent.x);
      plank.castShadow = true;
      plank.receiveShadow = true;
      group.add(plank);
    }

    const oldPanel = createGlassPanel(1.7, 0.94, 0x64748b, 0.22);
    oldPanel.position.set(-3.2, -0.66, -0.08);
    oldPanel.rotation.y = 0.24;
    group.add(oldPanel);
    const oldLabel = createLabelPlane(['AOK / TK', 'BARMER'], 1.9, 0.68, {
      width: 760,
      height: 340,
      backgroundFrom: 'rgba(15,23,42,0.9)',
      backgroundTo: 'rgba(71,85,105,0.72)',
      border: 'rgba(148,163,184,0.48)',
      color: '#e2e8f0',
      font: '900 72px system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: 82,
    });
    oldLabel.position.set(-3.02, -0.84, 0.78);
    oldLabel.rotation.set(-0.08, 0.22, 0.02);
    group.add(oldLabel);

    const shield = createShield();
    shield.position.set(0, 0.25, 0.78);
    shield.scale.setScalar(0.86);
    group.add(shield);

    const bonusPanel = createGlassPanel(1.72, 0.94, 0x10b981, 0.24);
    bonusPanel.position.set(3.14, -0.66, -0.08);
    bonusPanel.rotation.y = -0.24;
    group.add(bonusPanel);
    const bonusLabel = createLabelPlane(
      [t('ikkWechsel.threeD.bonusFund'), t('ikkWechsel.threeD.bonusShort')],
      1.86,
      0.68,
      {
        width: 760,
        height: 340,
        backgroundFrom: 'rgba(236,253,245,0.95)',
        backgroundTo: 'rgba(52,211,153,0.82)',
        border: 'rgba(255,255,255,0.76)',
        color: '#064e3b',
        font: '900 72px system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: 82,
      }
    );
    bonusLabel.position.set(3.1, -0.84, 0.8);
    bonusLabel.rotation.set(-0.08, -0.22, -0.02);
    group.add(bonusLabel);

    const budgetCard = createBudgetCard(t('ikkWechsel.threeD.budgetValue'), t('ikkWechsel.threeD.budgetLabel'));
    budgetCard.position.set(3.03, 0.38, 0.86);
    budgetCard.rotation.set(-0.1, -0.24, 0.035);
    group.add(budgetCard);

    const confetti = [];
    const confettiGeometry = new THREE.PlaneGeometry(0.034, 0.092);
    const confettiColors = [0xfacc15, 0xf59e0b, 0xfef3c7, 0x86efac];
    for (let index = 0; index < 34; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: confettiColors[index % confettiColors.length],
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(confettiGeometry, material);
      const base = new THREE.Vector3(
        2.35 + Math.random() * 1.28,
        1.42 + Math.random() * 0.48,
        0.66 + Math.random() * 0.62
      );
      mesh.position.copy(base);
      mesh.visible = false;
      confetti.push({
        mesh,
        base,
        phase: Math.random(),
        spin: 0.8 + Math.random() * 1.8,
        drift: -0.08 + Math.random() * 0.16,
      });
      group.add(mesh);
    }

    const person = createPersonSprite();
    group.add(person.sprite);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.25, 32),
      new THREE.MeshBasicMaterial({
        color: 0x020617,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    group.add(shadow);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(320, rect.width);
      const height = Math.max(260, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.set(0, width < 600 ? 0.12 : 0.04, width < 600 ? 8.4 : 7.15);
      camera.lookAt(0, -0.42, 0);
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let animationId;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const progress = reducedMotion ? 0.74 : (elapsed * 0.07) % 1;
      const point = curve.getPoint(progress);
      const mood = THREE.MathUtils.smoothstep(progress, 0.24, 0.9);
      const walk = Math.sin(elapsed * 7.2);

      person.sprite.position.set(point.x, point.y + 0.63 + Math.abs(walk) * 0.018, point.z + 0.46);
      person.sprite.scale.set(0.62 + mood * 0.12, 1.08 + mood * 0.08, 1);
      const nextMap = progress > 0.46 ? person.happyMap : person.sadMap;
      if (person.sprite.material.map !== nextMap) {
        person.sprite.material.map = nextMap;
        person.sprite.material.needsUpdate = true;
      }

      shadow.position.set(point.x, -1.215, point.z + 0.36);
      shadow.scale.setScalar(0.82 + mood * 0.18);
      shadow.material.opacity = 0.2 + mood * 0.1;

      bridgeMaterial.emissiveIntensity = 0.18 + mood * 0.18 + Math.sin(elapsed * 2.2) * 0.025;
      budgetCard.position.y = 0.38 + Math.sin(elapsed * 1.1 + 0.5) * 0.026;
      budgetLight.intensity = 2.8 + mood * 1.35 + Math.sin(elapsed * 1.8) * 0.18;
      const celebration = THREE.MathUtils.smoothstep(progress, 0.64, 0.84);
      confetti.forEach(({ mesh, base, phase, spin, drift }) => {
        const fall = (elapsed * 0.58 + phase) % 1;
        mesh.visible = celebration > 0.02;
        mesh.position.set(
          base.x + Math.sin(elapsed * 1.2 + phase * 8) * 0.08 + drift * fall,
          base.y - fall * 1.16,
          base.z + Math.cos(elapsed * 1.4 + phase * 6) * 0.08
        );
        mesh.rotation.set(elapsed * spin + phase * 4, elapsed * (spin * 0.7), phase * Math.PI);
        mesh.material.opacity = celebration * Math.max(0, 0.86 - fall * 0.34);
      });
      shield.rotation.y = Math.sin(elapsed * 0.55) * 0.045;
      group.rotation.y = Math.sin(elapsed * 0.32) * 0.045;
      group.rotation.x = -0.045 + Math.sin(elapsed * 0.28) * 0.012;

      renderer.render(scene, camera);
      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
      person.sadMap.dispose();
      person.happyMap.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => {
              if (material.map) material.map.dispose();
              material.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });
    };
  }, [t]);

  return (
    <div
      ref={containerRef}
      className="relative h-[380px] sm:h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-inner shadow-emerald-900/20"
      aria-label={t('ikkWechsel.threeD.ariaLabel')}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_74%_36%,rgba(250,204,21,0.12),transparent_32%),radial-gradient(ellipse_at_50%_18%,rgba(52,211,153,0.18),transparent_44%),linear-gradient(135deg,rgba(15,23,42,0.18),rgba(2,6,23,0.66))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(2,6,23,0.84),transparent)]" />
      <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-start justify-center text-center text-[11px] font-bold uppercase tracking-[0.14em]">
        <span className="rounded-2xl border border-emerald-300/25 bg-emerald-400/15 px-4 py-2 text-emerald-100 shadow-lg shadow-emerald-950/20 backdrop-blur-md">
          <span className="block">{t('ikkWechsel.threeD.stable')}</span>
          <span className="mt-0.5 block text-[10px] tracking-[0.1em] text-emerald-50/70">
            {t('ikkWechsel.threeD.stableLegal')}
          </span>
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 w-[min(90%,420px)] -translate-x-1/2 rounded-2xl border border-emerald-200/30 bg-emerald-50/95 px-5 py-3 text-center shadow-2xl shadow-emerald-950/30 backdrop-blur">
        <div className="text-xl font-black tracking-tight text-emerald-950 sm:text-2xl">{t('ikkWechsel.threeD.budget')}</div>
      </div>
    </div>
  );
};

export default IkkSwitch3DScene;
