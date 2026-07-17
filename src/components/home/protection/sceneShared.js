import * as THREE from 'three';

export const easeOutCubic = (value) => 1 - ((1 - value) ** 3);
export const damp = (current, target, smoothing) => current + ((target - current) * smoothing);

export const createShieldGeometry = ({ width = 3.4, height = 4.2, depth = 0.24, bevel = 0.08 } = {}) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(0, halfHeight);
  shape.bezierCurveTo(halfWidth * 0.34, halfHeight, halfWidth * 0.76, halfHeight * 0.88, halfWidth, halfHeight * 0.66);
  shape.lineTo(halfWidth * 0.88, -halfHeight * 0.22);
  shape.bezierCurveTo(halfWidth * 0.74, -halfHeight * 0.68, halfWidth * 0.32, -halfHeight * 0.92, 0, -halfHeight);
  shape.bezierCurveTo(-halfWidth * 0.32, -halfHeight * 0.92, -halfWidth * 0.74, -halfHeight * 0.68, -halfWidth * 0.88, -halfHeight * 0.22);
  shape.lineTo(-halfWidth, halfHeight * 0.66);
  shape.bezierCurveTo(-halfWidth * 0.76, halfHeight * 0.88, -halfWidth * 0.34, halfHeight, 0, halfHeight);
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: bevel,
    bevelThickness: bevel * 0.75,
    curveSegments: 18,
  }).center();
};

export const createRoundedRectGeometry = ({ width, height, depth = 0.1, radius = 0.16 }) => {
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
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.02, bevelSegments: 3 }).center();
};

export const createGlowTexture = (color = '#5EE0B1') => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.2, `${color}CC`);
  gradient.addColorStop(1, `${color}00`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const disposeObject3D = (root) => {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => {
      material.map?.dispose?.();
      material.dispose?.();
    });
  });
};
