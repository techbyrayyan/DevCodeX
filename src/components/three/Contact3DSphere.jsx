'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Contact3DSphere({ isFocused = false, isSuccess = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const activeColor = isSuccess ? 0x10b981 : isFocused ? 0x00f0ff : 0x3b82f6;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(activeColor, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const geo = new THREE.IcosahedronGeometry(1.5, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: activeColor,
      emissive: activeColor,
      emissiveIntensity: isFocused ? 0.7 : 0.4,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const innerGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: activeColor });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const speed = isFocused ? 1.2 : 0.4;
      mesh.rotation.y += delta * speed;
      mesh.rotation.x += delta * (speed * 0.5);

      mesh.position.y = Math.sin(time * 2) * 0.1;
      innerMesh.position.y = Math.sin(time * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
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
  }, [isFocused, isSuccess]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px] lg:min-h-[400px]" />;
}
