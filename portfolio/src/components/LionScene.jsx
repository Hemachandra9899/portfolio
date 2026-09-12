import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import './LionScene.css';

// All geometry is built locally: no model downloads or loading screen.
function makeLion() {
  const lion = new THREE.Group();
  const materials = {};
  for (const [key, color] of Object.entries({ fur: 0xffd773, light: 0xffe891, mane: 0xb63220, nose: 0x654252, white: 0xfffbed, pupil: 0x392039, freckle: 0xad3827 })) {
    materials[key] = new THREE.MeshLambertMaterial({ color });
  }
  function box(parent, size, position, material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), materials[material]);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  box(lion, [1.85, 1.5, 1.35], [0, 0.93, -0.42], 'fur');
  const legs = [];
  for (const side of [-1, 1]) {
    for (const back of [true, false]) {
      const leg = new THREE.Group();
      leg.position.set(side * (back ? 1.4 : 0.47), 1.22, back ? -0.3 : 0.55);
      lion.add(leg);
      const limb = box(leg, [back ? 0.65 : 0.46, 1.05, 0.58], [0, -0.45, 0], 'fur');
      limb.rotation.z = back ? -side * 0.2 : 0;
      box(leg, [0.82, 0.4, 0.94], [side * (back ? 0.08 : 0), -1, 0.15], 'fur');
      leg.userData.phase = (side === -1) !== back ? 0 : Math.PI;
      legs.push(leg);
    }
  }
  const tail = new THREE.Group();
  tail.position.set(-0.7, 0.5, -1);
  lion.add(tail);
  const tailStem = box(tail, [0.26, 1.55, 0.26], [-0.48, 0.35, -0.25], 'fur');
  tailStem.rotation.z = 0.8;
  box(tail, [0.44, 0.47, 0.42], [-1.03, 0.88, -0.25], 'mane');
  const head = new THREE.Group();
  head.position.set(0, 2.69, 0);
  lion.add(head);
  box(head, [3.45, 3.45, 0.43], [0, 0, 0], 'mane');
  for (const side of [-1, 1]) box(head, [0.46, 0.49, 0.36], [side * 1.08, 1.1, 0.36], 'light');
  box(head, [2.12, 1.93, 0.98], [0, 0.08, 0.64], 'light');
  box(head, [0.95, 0.61, 0.66], [0, -0.97, 0.73], 'fur');
  const eyes = [];
  const pupils = [];
  for (const side of [-1, 1]) {
    const eye = box(head, [0.39, 0.66, 0.065], [side * 0.87, 0.59, 1.15], 'white');
    const pupil = box(eye, [0.135, 0.245, 0.06], [-side * 0.035, -0.03, 0.06], 'pupil');
    eyes.push(eye); pupils.push(pupil);
  }
  box(head, [0.94, 1.0, 0.4], [0, 0.57, 1.3], 'nose');
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.265, 0.092, 4, 18, Math.PI), materials.nose);
  mouth.rotation.z = Math.PI;
  mouth.position.set(0, -0.59, 1.155);
  head.add(mouth);
  const whiskers = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const whisker = box(head, [0.73, 0.037, 0.037], [side * 1.09, -0.28 - i * 0.16, 1.185], 'nose');
      whisker.rotation.z = -side * (0.04 + i * 0.025);
      whiskers.push(whisker);
      box(head, [0.065, 0.07, 0.024], [side * (0.66 + (i % 2) * 0.15), -0.26 - i * 0.14, 1.15], 'freckle');
    }
  }
  return { lion, head, tail, eyes, pupils, mouth, whiskers, legs };
}

export function LionScene({ invite = false, onInvite, initialX = 0, modelScale = 1 }) {
  const bubble = useRef(null);
  const host = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const container = host.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { setFailed(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xebe6e7, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.set(0, 4.1, 12);
    camera.lookAt(0, 1.7, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.75));
    const sun = new THREE.DirectionalLight(0xffffff, 3.1);
    sun.position.set(4, 8, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.1, far: 25 });
    sun.shadow.normalBias = 0.025;
    sun.shadow.bias = -0.0001;
    sun.shadow.radius = 3;
    scene.add(sun);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: 0x706871, opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    const { lion, head, tail, eyes, pupils, mouth, whiskers, legs } = makeLion();
    lion.scale.setScalar(modelScale);
    scene.add(lion);
    const fan = new THREE.Group();
    const blades = new THREE.Group();
    const fanMaterial = new THREE.MeshLambertMaterial({ color: 0xb994a5, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.065), fanMaterial);
      const pivot = new THREE.Group();
      blade.position.y = 0.3;
      pivot.rotation.z = i * Math.PI / 2 + 0.4;
      pivot.add(blade); blades.add(pivot);
    }
    fan.add(blades);
    const hub = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: 0x755465 }));
    hub.position.z = 0.1; fan.add(hub);
    fan.visible = false; scene.add(fan);
    const pointer = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    const fanPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3);
    const fanTarget = new THREE.Vector3();
    let held = false, strength = 0, frame, last = performance.now(), elapsed = 0;
    let gait = 0, pace = 0, visible = true;
    let displayScale = modelScale;
    const destination = new THREE.Vector3();
    const bubblePosition = new THREE.Vector3();
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(container);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function resize() {
      const width = container.clientWidth, height = container.clientHeight;
      renderer.setSize(width, height);
      displayScale = width < 820 && modelScale < 1 ? modelScale * 0.62 : modelScale;
      lion.scale.setScalar(displayScale);
      const aspect = width / height;
      const viewHeight = Math.max(8.8, 5.6 / aspect);
      camera.left = -viewHeight * aspect / 2; camera.right = viewHeight * aspect / 2;
      camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
      camera.near = 0.1; camera.far = 100; camera.updateProjectionMatrix();
    }
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    lion.position.x = Math.max(camera.left + 2.2 * displayScale, Math.min(camera.right - 2.2 * displayScale, initialX));
    pointer.x = lion.position.x / Math.max(0.001, camera.right - 2.2 * displayScale);
    function move(event) {
      const rect = container.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
    }
    function down(event) {
      move(event); held = true;
      if (event.pointerType === 'mouse') container.setPointerCapture(event.pointerId);
      container.focus({ preventScroll: true });
    }
    function up() { held = false; }
    function leave() { if (!held) destination.copy(lion.position); }
    function keydown(event) {
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(event.key)) event.preventDefault();
      if (event.key === ' ') held = true;
      if (event.key === 'ArrowLeft') pointer.x = Math.max(-1, pointer.x - 0.1);
      if (event.key === 'ArrowRight') pointer.x = Math.min(1, pointer.x + 0.1);
      if (event.key === 'ArrowUp') pointer.y = Math.min(1, pointer.y + 0.1);
      if (event.key === 'ArrowDown') pointer.y = Math.max(-1, pointer.y - 0.1);
      if (event.key === 'Escape') { held = false; pointer.set(0, 0); }
    }
    function keyup(event) { if (event.key === ' ') up(); }
    container.addEventListener('pointermove', move); container.addEventListener('pointerdown', down);
    container.addEventListener('pointerup', up); container.addEventListener('pointercancel', up);
    container.addEventListener('lostpointercapture', up); container.addEventListener('pointerleave', leave);
    container.addEventListener('keydown', keydown); container.addEventListener('keyup', keyup);
    window.addEventListener('blur', up);
    function render(now) {
      const dt = Math.min((now - last) / 1000, 0.05); last = now; elapsed += dt;
      const smooth = 1 - Math.exp(-7 * dt);
      if (!visible || document.hidden) { frame = requestAnimationFrame(render); return; }
      strength += ((held ? 1 : 0) - strength) * smooth;
      if (!held) destination.set(pointer.x * Math.max(0, camera.right - 2.2 * displayScale), 0, -pointer.y * 0.9);
      else destination.set(lion.position.x, 0, lion.position.z);
      const dx = destination.x - lion.position.x, dz = destination.z - lion.position.z;
      const distance = Math.hypot(dx, dz);
      const step = Math.min(distance, dt * 2.6);
      if (distance > 0.025 && !reduced.matches) {
        lion.position.x += dx / distance * step;
        lion.position.z += dz / distance * step;
      }
      const walking = distance > 0.06 && !reduced.matches ? Math.min(1, distance * 2) : 0;
      pace += (walking - pace) * smooth;
      gait += dt * 9 * pace;
      legs.forEach(leg => { leg.rotation.x = Math.sin(gait + leg.userData.phase) * 0.45 * pace; });
      lion.position.y = Math.abs(Math.sin(gait)) * 0.07 * pace;
      lion.rotation.z = Math.sin(gait) * 0.022 * pace;
      lion.rotation.y += ((walking ? Math.sign(dx) * 0.48 : 0) - lion.rotation.y) * smooth;
      const motion = reduced.matches ? 0 : 1;
      head.rotation.y += ((pointer.x * 0.65 * (1 - strength * 1.5)) - head.rotation.y) * smooth;
      head.rotation.x += ((-pointer.y * 0.25 + strength * 0.16) - head.rotation.x) * smooth;
      head.rotation.z += ((-pointer.x * 0.14 + Math.sin(elapsed * 16) * 0.028 * strength * motion) - head.rotation.z) * smooth;
      head.position.y = 2.69 + Math.sin(elapsed * 1.7) * 0.022 * motion;
      tail.rotation.z = Math.sin(elapsed * 2.3) * 0.12 * motion;
      const blink = Math.pow(Math.max(0, Math.cos(elapsed * 1.25)), 90);
      eyes.forEach(eye => { eye.scale.y = Math.max(0.08, 1 - strength * 0.86 - blink * 0.92 * motion); });
      pupils.forEach(pupil => { pupil.position.x = pointer.x * 0.085; pupil.position.y = -0.03 + pointer.y * 0.07; });
      mouth.scale.set(1 + strength * 0.22, 1 - strength * 0.32, 1);
      whiskers.forEach((whisker, i) => { whisker.rotation.y = Math.sin(elapsed * 24 + i) * strength * 0.16 * motion; });
      fan.visible = strength > 0.015;
      ray.setFromCamera(pointer, camera); ray.ray.intersectPlane(fanPlane, fanTarget);
      fan.position.lerp(fanTarget, smooth); fan.scale.setScalar(0.6 + strength * 0.25);
      blades.rotation.z -= dt * (9 + strength * 30) * motion;
      if (bubble.current) {
        bubblePosition.set(lion.position.x + 1.7, lion.position.y + 4.65, lion.position.z).project(camera);
        const x = Math.max(90, Math.min(container.clientWidth - 90, (bubblePosition.x + 1) / 2 * container.clientWidth));
        const y = Math.max(16, (1 - bubblePosition.y) / 2 * container.clientHeight);
        bubble.current.style.left = `${x}px`;
        bubble.current.style.top = `${y}px`;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect();
      container.removeEventListener('pointermove', move); container.removeEventListener('pointerdown', down);
      container.removeEventListener('pointerup', up); container.removeEventListener('pointercancel', up);
      container.removeEventListener('lostpointercapture', up); container.removeEventListener('pointerleave', leave);
      container.removeEventListener('keydown', keydown); container.removeEventListener('keyup', keyup); window.removeEventListener('blur', up);
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [initialX, modelScale]);
  return <div className="lion-page">
    <div ref={host} className="lion-stage" tabIndex={0} role="application" aria-label="Interactive lion. Move your cursor or tap to guide him. Hold to use the fan. Keyboard: arrow keys to move, hold Space to fan, Escape to reset." />
    {invite && <Link ref={bubble} to="/ask" onClick={onInvite} className="lion-invitation" aria-label="Chat with Hemachandra’s AI assistant"><span>Hi, curious about me?</span><strong>Ask my AI ↗</strong></Link>}
    {failed && <p className="lion-error">Our little companion needs WebGL to appear. You can still explore all my work below.</p>}
  </div>;
}
