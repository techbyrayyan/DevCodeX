'use client';

import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import Link from 'next/link';
import { services } from '@/data/servicesData';
import { Sparkles, ArrowRight, CheckCircle2, Code2, Cpu, Layers, ShoppingBag, TrendingUp, Palette, Server, Zap } from 'lucide-react';

const iconMap = { Code2, Cpu, Layers, ShoppingBag, TrendingUp, Palette, Server, Zap };

function Central3DHubCanvas({ activeIndex }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const colors = [0x00f0ff, 0x3b82f6, 0x6366f1, 0x10b981, 0x8b5cf6, 0xec4899, 0xf59e0b, 0x06b6d4];
    const currentColor = colors[activeIndex % colors.length];

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(currentColor, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Central Object
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: currentColor,
      emissive: currentColor,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Edge wireframe
    const edgeGeo = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1.5 });
    const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeMesh);

    // Orbit Ring
    const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: currentColor, emissive: currentColor, emissiveIntensity: 0.6 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mesh.rotation.y += delta * 0.5;
      mesh.rotation.x = Math.sin(time) * 0.2;

      edgeMesh.rotation.y += delta * 0.5;
      edgeMesh.rotation.x = Math.sin(time) * 0.2;

      ringMesh.rotation.z += delta * 0.3;

      mesh.position.y = Math.sin(time * 2) * 0.1;
      edgeMesh.position.y = Math.sin(time * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
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
  }, [activeIndex]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />;
}

export default function InteractiveServices3DHub() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const activeService = services[activeServiceIndex] || services[0];
  const IconComponent = iconMap[activeService.icon] || Code2;

  return (
    <div className="w-full space-y-12">
      
      {/* Interactive 3D Service Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Interactive Service Selector Nodes (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            Select a Capability Hub
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
            {services.map((service, index) => {
              const isSelected = index === activeServiceIndex;
              const IconComp = iconMap[service.icon] || Code2;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)] translate-x-2'
                      : 'bg-neutral-900/60 border-white/10 hover:border-white/20 hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-cyan-400 text-black' : 'bg-neutral-800 text-cyan-400'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{service.title}</h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-1">{service.badge}</p>
                    </div>
                  </div>

                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-neutral-700'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Pure Three.js 3D Core Visual Canvas (3 Cols) */}
        <div className="lg:col-span-3 h-[300px] lg:h-[450px] relative flex items-center justify-center bg-neutral-950/40 rounded-2xl border border-white/10 overflow-hidden">
          <Central3DHubCanvas activeIndex={activeServiceIndex} />

          <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-cyan-400 pointer-events-none">
            Hub Node: #{activeServiceIndex + 1}
          </div>
        </div>

        {/* Right Column: Active Service Expansion Details Panel (4 Cols) */}
        <div className="lg:col-span-4 glass-card p-6 sm:p-8 space-y-6 relative overflow-hidden border-cyan-500/30">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              {activeService.badge}
            </span>
            <span className="text-xs font-mono text-neutral-400">0{activeServiceIndex + 1} / 0{services.length}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>{activeService.title}</span>
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeService.description}
            </p>
          </div>

          {/* Capabilities breakdown */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Expanded Capabilities</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeService.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h5 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Technologies</h5>
            <div className="flex flex-wrap gap-1.5">
              {activeService.technologies.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-[11px] font-mono text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              href={`/services/${activeService.slug}`}
              className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
              <span>Explore {activeService.title} Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
