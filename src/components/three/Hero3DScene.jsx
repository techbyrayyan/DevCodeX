'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ── helpers ─────────────────────────────────────────────────── */
function makeCodeFaceTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  /* deep dark face */
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#0e0e14');
  grad.addColorStop(1, '#07070c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  /* outer metallic rim */
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 10;
  ctx.strokeRect(6, 6, size - 12, size - 12);

  /* inner subtle bevel */
  ctx.strokeStyle = '#3a3a3a';
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, size - 36, size - 36);

  /* </> text */
  ctx.fillStyle = '#c8c8c8';
  ctx.font = `bold ${Math.floor(size * 0.3)}px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('</>', size / 2, size / 2);

  return canvas;
}

/* ── component ───────────────────────────────────────────────── */
export default function Hero3DScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let W = container.clientWidth || window.innerWidth;
    let H = container.clientHeight || 600;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(renderer.domElement);

    /* ── scene & camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(0, 0, 10.5);

    /* ── lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const addDir = (color, intensity, x, y, z) => {
      const l = new THREE.DirectionalLight(color, intensity);
      l.position.set(x, y, z);
      scene.add(l);
    };
    addDir(0xffffff, 3.0,   8,  10,  6);   // key
    addDir(0xaaaaaa, 1.5,  -8,  -4, -4);   // fill
    addDir(0xffffff, 2.0,   0,  12, -10);  // rim
    addDir(0x888888, 1.0,   4,  -8,  4);   // bounce

    /* ── MAIN CUBE GROUP ── */
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    /* shared face texture */
    const faceCanvas  = makeCodeFaceTexture(256);
    const faceTex     = new THREE.CanvasTexture(faceCanvas);

    const CUBE_S = 2.2;
    const cubeGeo = new THREE.BoxGeometry(CUBE_S, CUBE_S, CUBE_S);
    const cubeMats = Array(6).fill(null).map(() =>
      new THREE.MeshStandardMaterial({
        map: faceTex,
        metalness: 0.92,
        roughness: 0.12,
        envMapIntensity: 0,
      })
    );
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMats);
    mainGroup.add(cubeMesh);

    /* outer metallic edge lines on inner cube */
    const cubeEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(cubeGeo),
      new THREE.LineBasicMaterial({ color: 0x888888 })
    );
    mainGroup.add(cubeEdge);

    /* ── OUTER CAGE (larger wireframe box) ── */
    const CAGE_S  = CUBE_S * 1.46;
    const cageGeo = new THREE.BoxGeometry(CAGE_S, CAGE_S, CAGE_S);
    const cageMesh = new THREE.LineSegments(
      new THREE.EdgesGeometry(cageGeo),
      new THREE.LineBasicMaterial({ color: 0x4a4a4a })
    );
    mainGroup.add(cageMesh);

    /* metallic corner caps on cage */
    const capMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 1.0, roughness: 0.08 });
    const capGeo = new THREE.BoxGeometry(0.13, 0.13, 0.13);
    const half = CAGE_S / 2;
    [-1, 1].forEach(sx => [-1, 1].forEach(sy => [-1, 1].forEach(sz => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(sx * half, sy * half, sz * half);
      mainGroup.add(cap);
    })));

    /* ── ORBIT GROUP ── */
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const ORBIT_N = 6;
    const ORBIT_R = 4.0;
    const orbitCubes = [];
    const orbitLabels = ['AI', '</>', '{}', '/>', '##', '()'];

    for (let i = 0; i < ORBIT_N; i++) {
      const angle = (i / ORBIT_N) * Math.PI * 2;

      /* mini face */
      const mc = document.createElement('canvas');
      mc.width = mc.height = 64;
      const mctx = mc.getContext('2d');
      mctx.fillStyle = '#0d0d14';
      mctx.fillRect(0, 0, 64, 64);
      mctx.strokeStyle = '#666';
      mctx.lineWidth = 3;
      mctx.strokeRect(3, 3, 58, 58);
      mctx.fillStyle = '#bbb';
      mctx.font = 'bold 13px monospace';
      mctx.textAlign = 'center';
      mctx.textBaseline = 'middle';
      mctx.fillText(orbitLabels[i], 32, 32);
      const miniTex = new THREE.CanvasTexture(mc);

      const oSize = 0.40;
      const oGeo  = new THREE.BoxGeometry(oSize, oSize, oSize);
      const oMats = Array(6).fill(null).map(() =>
        new THREE.MeshStandardMaterial({ map: miniTex, metalness: 0.9, roughness: 0.18 })
      );
      const oMesh = new THREE.Mesh(oGeo, oMats);
      oMesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(oGeo),
        new THREE.LineBasicMaterial({ color: 0x555555 })
      ));

      /* position along circle */
      oMesh.position.x = Math.cos(angle) * ORBIT_R;
      oMesh.position.y = Math.sin(angle) * ORBIT_R * 0.3;
      oMesh.position.z = Math.sin(angle) * ORBIT_R;

      orbitGroup.add(oMesh);
      orbitCubes.push({ mesh: oMesh, phase: i });
    }

    /* ── PARTICLES ── */
    const PCount = 80;
    const pPos   = new Float32Array(PCount * 3);
    for (let i = 0; i < PCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.5 + Math.random() * 4.0;
      pPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x888888, size: 0.04, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── Adjust position based on screen width ── */
    const applyPositioning = (w) => {
      if (w >= 1024) {
        mainGroup.position.set(2.7, 2.2, 0);
        orbitGroup.position.set(2.7, 2.2, 0);
      } else {
        mainGroup.position.set(0, 1.8, 0);
        orbitGroup.position.set(0, 1.8, 0);
      }
    };
    applyPositioning(W);

    /* ── mouse parallax ── */
    let mouseX = 0, mouseY = 0, tX = 0, tY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* ── animation loop ── */
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* inner cube tumbles */
      cubeMesh.rotation.x = t * 0.20;
      cubeMesh.rotation.y = t * 0.28;
      cubeEdge.rotation.x = t * 0.20;
      cubeEdge.rotation.y = t * 0.28;

      /* cage rotates slightly different axis for depth */
      cageMesh.rotation.x = t * 0.14;
      cageMesh.rotation.y = -t * 0.22;

      /* floating bob high up near top edge */
      const baseOffsetY = (W >= 1024) ? 2.2 : 1.8;
      mainGroup.position.y = baseOffsetY + Math.sin(t * 1.1) * 0.14;
      orbitGroup.position.y = baseOffsetY;

      /* orbit group = full revolution around Y axis */
      orbitGroup.rotation.y = t * 0.38;
      orbitGroup.rotation.x = 0.30;

      /* each orbital cube spins itself */
      orbitCubes.forEach(({ mesh, phase }) => {
        mesh.rotation.x = t * 0.7 + phase;
        mesh.rotation.y = t * 0.9 + phase;
      });

      /* parallax */
      tX += (mouseX * 0.45 - tX) * 0.04;
      tY += (-mouseY * 0.45 - tY) * 0.04;
      mainGroup.rotation.y += (tX * 0.6 - mainGroup.rotation.y) * 0.03;
      camera.position.y = tY * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    /* ── resize ── */
    const onResize = () => {
      if (!container) return;
      W = container.clientWidth || window.innerWidth;
      H = container.clientHeight || 600;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      applyPositioning(W);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[650px]">
      <div ref={containerRef} className="w-full h-full min-h-[500px] lg:min-h-[650px]" />
    </div>
  );
}
