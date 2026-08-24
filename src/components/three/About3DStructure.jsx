'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function About3DStructure() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 350;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 2);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const geo1 = new THREE.DodecahedronGeometry(1.4, 0);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.05,
      wireframe: true,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    scene.add(mesh1);

    const geo2 = new THREE.OctahedronGeometry(1.0, 0);
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mesh1.rotation.y += delta * 0.25;
      mesh1.rotation.x += delta * 0.15;

      mesh2.rotation.y -= delta * 0.4;
      mesh2.rotation.z += delta * 0.2;

      mesh1.position.y = Math.sin(time * 1.5) * 0.1;
      mesh2.position.y = Math.sin(time * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 350;
      const h = container.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[350px]" />;
}
