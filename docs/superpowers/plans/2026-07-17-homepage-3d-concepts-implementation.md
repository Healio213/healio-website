# Healio Homepage 3D Concepts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zwei klar unterschiedliche, lokal umschaltbare 3D-Hero-Konzepte bauen: einen ruhigen Premium-Glasschutzschild und einen dynamischeren Protection Core.

**Architecture:** Eine gemeinsame WebGL-Laufzeit übernimmt Renderer, Sichtbarkeit, Größenänderung, Pointer-Dämpfung und Cleanup. Die zwei Szenen liefern ausschließlich ihre eigenen Three.js-Objekte und Animationslogik. Scharfe HTML-Labels, Fallback und URL-basierte Konzeptauswahl bleiben außerhalb des Canvas.

**Tech Stack:** React 18, Vite, Three.js, Tailwind CSS, React Router, Node-basierter Homepage-Vertrag

## Global Constraints

- Nur im isolierten Worktree und auf `feat/homepage-zusatzversicherung` arbeiten; kein Deployment und keine Änderung an `main`.
- Zwei getrennte Beispiele: `A · Glass Shield` und `B · Protection Core`; nicht als eine Mischszene umsetzen.
- Lokale Auswahl über `?hero=glass` und `?hero=core`; der sichtbare Schalter wird nur mit `import.meta.env.DEV` gerendert.
- H1, Beschreibung und CTAs bleiben in beiden Varianten identisch.
- Keine sichtbaren Texte als Canvas-Texturen; Ambulant, Zahn und Stationär bleiben scharfes HTML.
- Der bisherige Kreis mit `Dein Schutz` und die alte Text-Sprite-Logik werden vollständig entfernt.
- Maximaler Pixelratio: Desktop `1.5`, kleine Geräte `1.25`.
- Animation pausiert bei unsichtbarem Hero oder inaktivem Browser-Tab und respektiert `prefers-reduced-motion`.
- Keine Gerätesensorsteuerung, keine externen Texturen, kein schweres Bloom-Postprocessing.
- Desktopbreite 1280 Pixel und Mobilbreite 390 Pixel dürfen keinen horizontalen Überlauf zeigen.
- Alle sichtbaren deutschen Texte verwenden echte Umlaute; kein Deployment.

---

### Task 1: Gemeinsame WebGL-Laufzeit und Geometrie-Helfer

**Files:**
- Create: `src/components/home/protection/HeroWebGLCanvas.jsx`
- Create: `src/components/home/protection/sceneShared.js`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**
- Consumes: Three.js aus der bestehenden Abhängigkeit.
- Produces: `HeroWebGLCanvas({ createExperience, onReady, onError, className })`; `createShieldGeometry(options)`; `createRoundedRectGeometry(options)`; `createGlowTexture(color)`; `disposeObject3D(root)`; `damp(current, target, smoothing)`; `easeOutCubic(value)`.

- [ ] **Step 1: Failing contract for the shared runtime**

Add these reads and assertions before `console.log` in `scripts/check-homepage-contract.mjs`:

```js
const heroWebGlCanvas = readText('src/components/home/protection/HeroWebGLCanvas.jsx');
const protectionSceneShared = readText('src/components/home/protection/sceneShared.js');

assert.match(heroWebGlCanvas, /IntersectionObserver/);
assert.match(heroWebGlCanvas, /visibilitychange/);
assert.match(heroWebGlCanvas, /isSmallViewport \? 1\.25 : 1\.5/);
assert.match(heroWebGlCanvas, /cancelAnimationFrame/);
assert.match(heroWebGlCanvas, /renderer\.dispose\(\)/);
assert.match(protectionSceneShared, /export const createShieldGeometry/);
assert.match(protectionSceneShared, /export const disposeObject3D/);
```

- [ ] **Step 2: Verify RED**

Run: `npm run test:homepage`  
Expected: FAIL because `HeroWebGLCanvas.jsx` does not exist.

- [ ] **Step 3: Implement the shared helpers**

Implement `sceneShared.js` with these exact public exports:

```js
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
```

Implement `HeroWebGLCanvas.jsx` so it:

```jsx
const experience = createExperience({ THREE, scene, camera, renderer, isSmallViewport });
// experience.update({ elapsed, delta, introProgress, pointer })
// experience.resize?.({ width, height })
// experience.dispose?.()
```

The component must use `ResizeObserver`, `IntersectionObserver`, `document.visibilitychange`, damped pointer coordinates, `renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallViewport ? 1.25 : 1.5))`, and cleanup every listener, observer, frame, scene resource and renderer. Render one absolutely positioned canvas with `aria-hidden="true"`.

- [ ] **Step 4: Verify GREEN**

Run: `npm run test:homepage && npm run lint`  
Expected: Homepage contract passes and ESLint reports no errors.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-homepage-contract.mjs src/components/home/protection/HeroWebGLCanvas.jsx src/components/home/protection/sceneShared.js
git commit -m "feat: add reusable homepage 3d runtime"
```

---

### Task 2: Beispiel A – Premium Glass Shield

**Files:**
- Create: `src/components/home/protection/GlassShieldScene.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**
- Consumes: `HeroWebGLCanvas`; all geometry and animation helpers from `sceneShared.js`.
- Produces: `GlassShieldScene({ onReady, onError })`.

- [ ] **Step 1: Failing contract for Glass Shield**

Add:

```js
const glassShieldScene = readText('src/components/home/protection/GlassShieldScene.jsx');
assert.match(glassShieldScene, /createShieldGeometry/);
assert.match(glassShieldScene, /MeshPhysicalMaterial/);
assert.match(glassShieldScene, /transmission:/);
assert.match(glassShieldScene, /layerProgress/);
assert.doesNotMatch(glassShieldScene, /TorusGeometry/);
```

- [ ] **Step 2: Verify RED**

Run: `npm run test:homepage`  
Expected: FAIL because `GlassShieldScene.jsx` does not exist.

- [ ] **Step 3: Build the premium material scene**

Create a `createExperience` callback with:

```js
const root = new THREE.Group();
const backLayer = new THREE.Mesh(createShieldGeometry({ width: 3.55, height: 4.45, depth: 0.28 }), backMaterial);
const glassLayer = new THREE.Mesh(createShieldGeometry({ width: 3.25, height: 4.1, depth: 0.18 }), glassMaterial);
const coreLayer = new THREE.Mesh(createShieldGeometry({ width: 2.5, height: 3.25, depth: 0.12 }), coreMaterial);
const layerProgress = { back: 0, glass: 0, core: 0 };
```

Material direction:

```js
const backMaterial = new THREE.MeshPhysicalMaterial({ color: 0x07111f, metalness: 0.72, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.12 });
const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xb9ffe8, metalness: 0.05, roughness: 0.08, transmission: 0.72, thickness: 1.35, transparent: true, opacity: 0.52, clearcoat: 1 });
const coreMaterial = new THREE.MeshPhysicalMaterial({ color: 0x25c990, emissive: 0x0c805d, emissiveIntensity: 1.3, metalness: 0.18, roughness: 0.22, transparent: true, opacity: 0.92 });
```

Add white and mint edge lines from `THREE.EdgesGeometry`, a restrained Healio-H made from three rounded rectangular meshes, a soft ground glow and two controlled lights. Animate the three layer Z positions from `-2.8`, `2.4`, and `3.4` to their resting positions with staggered `easeOutCubic`. After the intro, only damped pointer tilt, a slow edge-light sweep and vertical movement no larger than `0.06` units remain.

- [ ] **Step 4: Verify GREEN**

Run: `npm run test:homepage && npm run lint`  
Expected: Both pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-homepage-contract.mjs src/components/home/protection/GlassShieldScene.jsx
git commit -m "feat: add premium glass shield concept"
```

---

### Task 3: Beispiel B – Protection Core

**Files:**
- Create: `src/components/home/protection/ProtectionCoreScene.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**
- Consumes: `HeroWebGLCanvas`; all geometry and animation helpers from `sceneShared.js`.
- Produces: `ProtectionCoreScene({ onReady, onError })`.

- [ ] **Step 1: Failing contract for Protection Core**

Add:

```js
const protectionCoreScene = readText('src/components/home/protection/ProtectionCoreScene.jsx');
assert.match(protectionCoreScene, /createShieldGeometry/);
assert.match(protectionCoreScene, /TorusGeometry/);
assert.match(protectionCoreScene, /CatmullRomCurve3/);
assert.match(protectionCoreScene, /PointsMaterial/);
assert.match(protectionCoreScene, /activationProgress/);
```

- [ ] **Step 2: Verify RED**

Run: `npm run test:homepage`  
Expected: FAIL because `ProtectionCoreScene.jsx` does not exist.

- [ ] **Step 3: Build the energetic scene**

The core experience must contain:

```js
const system = new THREE.Group();
const shield = new THREE.Mesh(createShieldGeometry({ width: 2.9, height: 3.65, depth: 0.18 }), shieldMaterial);
const energyCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.74, 3), coreMaterial);
const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.022, 8, 220), orbitMaterial);
const moduleAnchors = [
  new THREE.Vector3(-2.65, 1.75, 0.2),
  new THREE.Vector3(2.8, 1.2, -0.2),
  new THREE.Vector3(0.85, -2.35, 0.45),
];
const activationProgress = { core: 0, orbit: 0, modules: [0, 0, 0] };
```

Create three connector tubes from `THREE.CatmullRomCurve3`, one small glowing anchor sphere per module, 120–180 background points using `THREE.PointsMaterial`, two thin orbit rings at different rotations and a glow sprite behind the core. Animate core assembly, orbit draw-in and module activation in the 2.5 second sequence. In idle state, orbit speed remains below `0.08` radians per second, vertical movement below `0.08` units, and energy pulses travel no more than once every three seconds.

- [ ] **Step 4: Verify GREEN**

Run: `npm run test:homepage && npm run lint`  
Expected: Both pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-homepage-contract.mjs src/components/home/protection/ProtectionCoreScene.jsx
git commit -m "feat: add protection core concept"
```

---

### Task 4: Scharfe Labels, Fallback und A/B-Umschaltung integrieren

**Files:**
- Create: `src/components/home/protection/ProtectionLabels.jsx`
- Create: `src/components/home/protection/HomeProtectionFallback.jsx`
- Replace: `src/components/home/HomeProtectionScene.jsx`
- Modify: `src/components/home/HomeHero.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**
- Consumes: `GlassShieldScene({ onReady, onError })`, `ProtectionCoreScene({ onReady, onError })`, translated `labels: string[]`, and `reducedMotion: boolean`.
- Produces: `HomeProtectionScene({ concept, reducedMotion, labels })`; URL-backed `concept` state in `HomeHero`.

- [ ] **Step 1: Failing integration contract**

Replace the old protection-scene assertions with:

```js
const protectionScene = readText('src/components/home/HomeProtectionScene.jsx');
const protectionLabels = readText('src/components/home/protection/ProtectionLabels.jsx');
const protectionFallback = readText('src/components/home/protection/HomeProtectionFallback.jsx');

assert.match(homeHero, /URLSearchParams/);
assert.match(homeHero, /searchParams\.set\('hero', concept\)/);
assert.match(homeHero, /'glass'/);
assert.match(homeHero, /'core'/);
assert.match(homeHero, /import\.meta\.env\.DEV/);
assert.match(protectionScene, /GlassShieldScene/);
assert.match(protectionScene, /ProtectionCoreScene/);
assert.match(protectionScene, /reducedMotion/);
assert.match(protectionLabels, /labels\.map/);
assert.match(protectionLabels, /data-concept/);
assert.match(protectionFallback, /data-fallback-concept/);
assert.doesNotMatch(protectionScene, /createLabelTexture|createLabelSprite|centerLabel/);
```

- [ ] **Step 2: Verify RED**

Run: `npm run test:homepage`  
Expected: FAIL because the integration components do not exist and the old scene still contains Canvas labels.

- [ ] **Step 3: Implement labels and fallback**

`ProtectionLabels` renders three decorative HTML modules with `aria-hidden="true"`, a `data-concept` attribute, staggered CSS animation delays and concept-specific positioning. Use the existing translated `labels` array only; do not hard-code German text.

`HomeProtectionFallback` renders three nested shield silhouettes, one mint core and the same `ProtectionLabels`. It receives `{ concept, labels }` and sets `data-fallback-concept={concept}`.

- [ ] **Step 4: Replace the scene wrapper**

Use lazy scene imports and only mount the selected scene:

```jsx
const GlassShieldScene = lazy(() => import('./protection/GlassShieldScene'));
const ProtectionCoreScene = lazy(() => import('./protection/ProtectionCoreScene'));

const Scene = concept === 'core' ? ProtectionCoreScene : GlassShieldScene;

if (reducedMotion || failed) {
  return <HomeProtectionFallback concept={concept} labels={labels} />;
}
```

Keep the fallback behind the canvas until `onReady` fires, then fade it out. Render `ProtectionLabels` above the canvas. The wrapper remains `aria-hidden="true"`.

- [ ] **Step 5: Add the local selector**

In `HomeHero`, initialize with:

```js
const readConcept = () => new URLSearchParams(window.location.search).get('hero') === 'core' ? 'core' : 'glass';
const [heroConcept, setHeroConcept] = useState(readConcept);
```

The selector handler must update `URLSearchParams`, call `window.history.replaceState`, and update React state. Render the two buttons only inside `{import.meta.env.DEV && (...)}` with visible labels `A · Glass Shield` and `B · Protection Core`. Pass `concept={heroConcept}`, `labels={sceneLabels}` and `reducedMotion={reducedMotion}` to `HomeProtectionScene`. Remove `centerLabel` from this path.

- [ ] **Step 6: Verify GREEN and build**

Run: `npm run test:homepage && npm run lint && npm run build`  
Expected: Contract, lint and production build pass. The build may report existing SEO article preload failures when offline; it must still exit with code 0.

- [ ] **Step 7: Commit**

```bash
git add scripts/check-homepage-contract.mjs src/components/home/HomeHero.jsx src/components/home/HomeProtectionScene.jsx src/components/home/protection/ProtectionLabels.jsx src/components/home/protection/HomeProtectionFallback.jsx
git commit -m "feat: add local homepage 3d concept switcher"
```

---

### Task 5: Browserabnahme für A und B

**Files:**
- Modify if needed: `src/components/home/HomeHero.jsx`
- Modify if needed: `src/components/home/HomeProtectionScene.jsx`
- Modify if needed: `src/components/home/protection/*.jsx`
- Modify if needed: `src/components/home/protection/sceneShared.js`
- Test: `scripts/check-homepage-contract.mjs`

**Interfaces:**
- Consumes: vollständig integrierte lokale Varianten unter `/?hero=glass` und `/?hero=core`.
- Produces: vier Abnahmebilder und eine fehlerfreie responsive Vorschau.

- [ ] **Step 1: Start local preview**

Run: `npm run dev -- --host 127.0.0.1`  
Expected: Vite serves `http://127.0.0.1:3000/` or the next free local port.

- [ ] **Step 2: Verify desktop variants**

Open `/?hero=glass` and `/?hero=core` at 1280 × 720. For each variant verify in one bounded browser evaluation:

```js
({
  h1Count: document.querySelectorAll('h1').length,
  canvasCount: document.querySelectorAll('canvas').length,
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  concept: document.querySelector('[data-concept]')?.getAttribute('data-concept'),
  labels: Array.from(document.querySelectorAll('[data-protection-label]')).map((node) => node.textContent.trim()),
})
```

Expected: `h1Count: 1`, `canvasCount: 1`, `horizontalOverflow: false`, selected concept matches URL and all three labels exist.

- [ ] **Step 3: Verify mobile variants**

Repeat both URLs at 390 × 844. Confirm H1 and both CTAs are visible before the scene, all three labels remain inside the viewport, Nita does not cover them, and horizontal overflow is false.

- [ ] **Step 4: Write regression test before every visual fix**

If the browser reveals a structural bug, first add the smallest source-contract assertion reproducing it to `scripts/check-homepage-contract.mjs`, run `npm run test:homepage` and observe RED. Then change production code and rerun to GREEN. Pure spacing or color tuning that cannot be meaningfully source-tested may be adjusted and verified through the four screenshots.

- [ ] **Step 5: Final verification**

Run: `npm run test:homepage && npm run lint && npm run build && git diff --check`  
Expected: all commands exit 0; only the known offline SEO preload messages may appear.

- [ ] **Step 6: Commit visual corrections**

```bash
git add scripts/check-homepage-contract.mjs src/components/home/HomeHero.jsx src/components/home/HomeProtectionScene.jsx src/components/home/protection
git commit -m "fix: polish homepage 3d concept previews"
```

Skip this commit only when Task 5 produces no source changes.
