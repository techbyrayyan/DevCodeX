'use client';

import { useEffect, useRef, useState } from 'react';

const SLIDES = [
  { heading: 'We Build Digital Products', sub: 'Next.js · React · Tailwind' },
  { heading: 'AI & Automation Systems',   sub: 'LLMs · Agents · Pipelines' },
  { heading: 'Scale Your Business Online', sub: 'SEO · SaaS · E-Commerce' },
  { heading: 'Design That Converts',       sub: 'UI/UX · Figma · Prototypes' },
];

/* ── vector helpers ── */
const dot  = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
const norm = (v) => { const l=Math.sqrt(dot(v,v)); return l?[v[0]/l,v[1]/l,v[2]/l]:[0,0,1]; };
const cross = ([ax,ay,az],[bx,by,bz]) => [ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx];
const sub3  = ([ax,ay,az],[bx,by,bz]) => [ax-bx, ay-by, az-bz];

export default function Hero3D({ fullHeight = false, bgMode = false }) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const [slide, setSlide] = useState(0);
  const [fade,  setFade]  = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setSlide(s => (s+1) % SLIDES.length); setFade(true); }, 350);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth, h = container.clientHeight;
      canvas.width = w*dpr; canvas.height = h*dpr;
      canvas.style.width = w+'px'; canvas.style.height = h+'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    /* ── icosahedron geometry ── */
    const phi = (1+Math.sqrt(5))/2;
    const rawV = [
      [-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],
      [0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],
      [phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1],
    ];
    const nm = Math.sqrt(1+phi*phi);
    const verts = rawV.map(([x,y,z]) => [x/nm, y/nm, z/nm]);

    const faces = [
      [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
      [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
      [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
      [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
    ];

    /* edges from faces */
    const edgeSet = new Set(); const edges = [];
    for (const [a,b,c] of faces)
      for (const [p,q] of [[a,b],[b,c],[a,c]]) {
        const k=`${Math.min(p,q)}-${Math.max(p,q)}`;
        if (!edgeSet.has(k)) { edgeSet.add(k); edges.push([p,q]); }
      }

    /* ── rotation ── */
    const rotX = ([x,y,z],a) => [x, y*Math.cos(a)-z*Math.sin(a), y*Math.sin(a)+z*Math.cos(a)];
    const rotY = ([x,y,z],a) => [x*Math.cos(a)+z*Math.sin(a), y, -x*Math.sin(a)+z*Math.cos(a)];

    /* ── perspective projection ── */
    const project = ([x,y,z], cx, cy, r) => {
      const fov=4.2, sc=fov/(fov+z+2);
      return [cx+x*r*sc, cy+y*r*sc, sc, z];
    };

    /* ── directional light ── */
    const LIGHT = norm([0.6, 1.0, 0.8]);

    /* mouse */
    let mouseX=0, mouseY=0;
    const onMove = e => {
      const rect=canvas.getBoundingClientRect();
      mouseX=((e.clientX-rect.left)/rect.width -0.5)*0.6;
      mouseY=((e.clientY-rect.top) /rect.height-0.5)*0.6;
    };
    canvas.addEventListener('mousemove', onMove);

    let angleY=0;

    const draw = () => {
      const W=container.clientWidth, H=container.clientHeight;
      ctx.clearRect(0,0,W,H);

      angleY += 0.005 + mouseX*0.01;
      const ax = 0.25 + mouseY*0.5;

      /* Bigger: 52% of shorter dimension */
      const r  = Math.min(W,H)*0.52;
      const cx = W/2, cy = H/2;

      /* transform all verts */
      const tv = verts.map(v => rotX(rotY(v, angleY), ax));
      const pv = tv.map(v => project(v, cx, cy, r));

      /* ── Build face list with depth & lighting ── */
      const faceData = faces.map(([a,b,c]) => {
        const va=tv[a], vb=tv[b], vc=tv[c];
        /* face normal via cross product */
        const n = norm(cross(sub3(vb,va), sub3(vc,va)));
        /* face centroid z for depth sorting */
        const cz = (va[2]+vb[2]+vc[2])/3;
        /* projected centroid */
        const pcx = (pv[a][0]+pv[b][0]+pv[c][0])/3;
        const pcy = (pv[a][1]+pv[b][1]+pv[c][1])/3;
        /* lighting: ambient + diffuse + subtle specular */
        const diffuse = Math.max(0, dot(n, LIGHT));
        /* only render front-facing (n.z > -0.5 to show side faces partially) */
        const facing  = n[2]; // >0 = front
        return { a, b, c, cz, pcx, pcy, diffuse, facing, n };
      });

      /* painter's algorithm: back → front */
      faceData.sort((x,y) => x.cz - y.cz);

      /* ── Draw filled faces ── */
      for (const f of faceData) {
        const { a, b, c, diffuse, facing } = f;
        const [ax2,ay2]=pv[a], [bx2,by2]=pv[b], [cx2,cy2]=pv[c];

        /* skip fully back-facing — keep a little for silhouette */
        if (facing < -0.35) continue;

        /* shade: dark gray base + diffuse highlight */
        const ambient  = 0.08;
        const bright   = Math.min(1, ambient + diffuse * 0.55);
        const alpha    = facing < 0 ? 0.06 : 0.10 + bright * 0.28;

        /* fill face */
        ctx.beginPath();
        ctx.moveTo(ax2,ay2); ctx.lineTo(bx2,by2); ctx.lineTo(cx2,cy2);
        ctx.closePath();

        /* gradient-like fill: darker at base, highlight at bright */
        const r1 = Math.round(bright * 95);
        const g1 = Math.round(bright * 98);
        const b1 = Math.round(bright * 110);
        ctx.fillStyle = `rgba(${r1},${g1},${b1},${alpha})`;
        ctx.fill();
      }

      /* ── Draw edges on top ── */
      for (const [a,b] of edges) {
        const [ax2,ay2,as2]=pv[a], [bx2,by2,bs2]=pv[b];
        const avg=(as2+bs2)/2;
        /* edge brightness based on depth */
        const edgeAlpha = 0.18 + avg*0.65;
        ctx.beginPath(); ctx.moveTo(ax2,ay2); ctx.lineTo(bx2,by2);
        ctx.strokeStyle=`rgba(200,205,220,${edgeAlpha})`;
        ctx.lineWidth=0.6+avg*0.9;
        ctx.stroke();
      }

      /* ── Vertex glow dots ── */
      for (let i=0;i<verts.length;i++) {
        const [px,py,ps,,z]=pv[i];
        const bright=0.3+ps*0.7;
        /* inner dot */
        ctx.beginPath(); ctx.arc(px,py,1.2+ps*1.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(220,225,240,${bright})`; ctx.fill();
        /* outer glow */
        if (ps>0.65) {
          const g2=ctx.createRadialGradient(px,py,0,px,py,8+ps*6);
          g2.addColorStop(0,`rgba(200,210,255,${(ps-0.65)*0.22})`);
          g2.addColorStop(1,'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(px,py,8+ps*6,0,Math.PI*2);
          ctx.fillStyle=g2; ctx.fill();
        }
      }

      /* ── Specular highlight: bright ring on nearest point ── */
      const frontV = faceData.filter(f=>f.facing>0.5).sort((a,b)=>b.cz-a.cz);
      if (frontV.length) {
        const { pcx, pcy } = frontV[frontV.length-1];
        const sg = ctx.createRadialGradient(pcx-r*0.18, pcy-r*0.22, 0, cx, cy, r*0.6);
        sg.addColorStop(0,'rgba(255,255,255,0.09)');
        sg.addColorStop(0.3,'rgba(180,190,220,0.04)');
        sg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(cx, cy, r*0.62, 0, Math.PI*2);
        ctx.fillStyle=sg; ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); canvas.removeEventListener('mousemove',onMove); };
  }, []);

  const { heading, sub } = SLIDES[slide];

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[420px] lg:h-[500px] relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, display:'block', cursor:'crosshair' }}
      />

      {/* Center rotating text — only in non-bg mode */}
      {!bgMode && (
        <div style={{
          position:'absolute', inset:0,
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          pointerEvents:'none', gap:8,
        }}>
          <p style={{
            fontFamily:'"Outfit","Inter",system-ui,sans-serif',
            fontSize:'clamp(1rem,2.2vw,1.45rem)',
            fontWeight:800,
            color:'#ffffff',
            textAlign:'center',
            letterSpacing:'-0.02em',
            lineHeight:1.2,
            maxWidth:'68%',
            margin:0,
            opacity: fade?1:0,
            transform: fade?'translateY(0)':'translateY(8px)',
            transition:'opacity 0.35s ease, transform 0.35s ease',
            textShadow:'0 0 30px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,1)',
          }}>{heading}</p>
          <p style={{
            fontFamily:'ui-monospace,monospace',
            fontSize:'clamp(0.58rem,1vw,0.70rem)',
            fontWeight:600,
            color:'#a1a1aa',
            textAlign:'center',
            letterSpacing:'0.20em',
            textTransform:'uppercase',
            margin:0,
            opacity: fade?1:0,
            transition:'opacity 0.35s ease 0.05s',
            textShadow:'0 0 20px rgba(0,0,0,1)',
          }}>{sub}</p>
        </div>
      )}
    </div>
  );
}
