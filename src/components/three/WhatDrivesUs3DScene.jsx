'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function makeIconTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#444444';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 120, 120);

  ctx.fillStyle = '#cccccc';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function WhatDrivesUs3DScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth || 450;
    const H = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x888888, 1.2);
    fillLight.position.set(-6, -4, -4);
    scene.add(fillLight);

    // --- Base Pedestal (Concentric Rings) ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -1.2;
    scene.add(pedestalGroup);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0x1a1a24, metalness: 0.9, roughness: 0.15 });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x555555 });

    [2.8, 2.2, 1.6, 1.0].forEach((r, idx) => {
      const geo = new THREE.CylinderGeometry(r, r + 0.1, 0.15, 48);
      const mesh = new THREE.Mesh(geo, ringMat);
      mesh.position.y = idx * 0.15;
      pedestalGroup.add(mesh);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
      edges.position.y = idx * 0.15;
      pedestalGroup.add(edges);
    });

    // --- Center Stacked Cubes ---
    const cubeGroup = new THREE.Group();
    cubeGroup.position.y = -0.3;
    scene.add(cubeGroup);

    const codeTex = makeIconTexture('</>');
    const cubeMat = Array(6).fill(null).map(() => new THREE.MeshStandardMaterial({ map: codeTex, metalness: 0.9, roughness: 0.15 }));
    const cubeGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);

    // 4 cubes cluster
    [
      [-0.45, 0, -0.45],
      [0.45, 0, -0.45],
      [-0.45, 0, 0.45],
      [0.45, 0, 0.45],
      [0, 0.75, 0],
    ].forEach(([x, y, z]) => {
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(x, y, z);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeo), edgeMat));
      cubeGroup.add(mesh);
    });

    // --- Orbiting Dark Icon Tiles ---
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const orbitItems = ['</>', '🛡', '🌐', '📊', '⚙'];
    const orbitTiles = [];
    const orbitRadius = 3.2;

    orbitItems.forEach((text, i) => {
      const angle = (i / orbitItems.length) * Math.PI * 2;
      const tileGeo = new THREE.BoxGeometry(0.5, 0.5, 0.08);
      const tex = makeIconTexture(text);
      const tileMat = Array(6).fill(null).map((_, idx) =>
        idx === 4 || idx === 5 ? new THREE.MeshStandardMaterial({ map: tex, metalness: 0.8, roughness: 0.2 }) : new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.9, roughness: 0.1 })
      );
      const tileMesh = new THREE.Mesh(tileGeo, tileMat);
      tileMesh.position.set(Math.cos(angle) * orbitRadius, Math.sin(i * 1.2) * 0.4, Math.sin(angle) * orbitRadius);
      tileMesh.lookAt(0, 0, 0);

      orbitGroup.add(tileMesh);
      orbitTiles.push({ mesh: tileMesh, angle });
    });

    // Orbiting rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.015, 16, 80);
    const ringMesh1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x444444 }));
    ringMesh1.rotation.x = Math.PI / 2;
    scene.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.01, 16, 80), new THREE.MeshBasicMaterial({ color: 0x333333 }));
    ringMesh2.rotation.x = Math.PI / 2.2;
    scene.add(ringMesh2);

    // Animation Loop
    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      cubeGroup.rotation.y = t * 0.3;
      orbitGroup.rotation.y = t * 0.25;

      orbitTiles.forEach(({ mesh }) => {
        mesh.rotation.z = Math.sin(t + mesh.position.x) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth || 450;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[450px]">
      <div ref={containerRef} className="w-full h-full min-h-[380px] lg:min-h-[450px]" />
    </div>
  );
}
