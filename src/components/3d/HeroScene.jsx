import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsInteractive(false);
        return;
      }
    } catch {
      setIsInteractive(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a10, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for the main 3D digital identity
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Metallic Icosahedron Core (Gokul's Abstract Digital Identity)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x151923,
      emissive: 0x080f24,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      reflectivity: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Outer Glowing Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x56c8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Inner Pulsing Core
    const innerGeo = new THREE.OctahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x9370db,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Orbital Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x56c8ff,
      emissive: 0x56c8ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x9370db,
      emissive: 0x9370db,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.9
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    mainGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.1, 0.012, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xc0c6d4,
      transparent: true,
      opacity: 0.35
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    mainGroup.add(ring3);

    // 3. Floating Geometric Satellite Satellites (Floating Tech Nodes)
    const satellites = [];
    const satCount = 6;
    const satGeoTypes = [
      new THREE.TetrahedronGeometry(0.2),
      new THREE.OctahedronGeometry(0.22),
      new THREE.BoxGeometry(0.25, 0.25, 0.25),
      new THREE.IcosahedronGeometry(0.18)
    ];

    for (let i = 0; i < satCount; i++) {
      const geo = satGeoTypes[i % satGeoTypes.length];
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x56c8ff : 0x9370db,
        emissive: i % 2 === 0 ? 0x56c8ff : 0x9370db,
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 0.7),
        Math.sin(angle) * radius
      );
      satellites.push({
        mesh,
        angle,
        radius,
        speed: 0.008 + (i % 3) * 0.004,
        yOffset: Math.sin(angle * 2) * 0.7
      });
      mainGroup.add(mesh);
    }

    // 4. Background Starfield / Particle Cloud
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colBlue = new THREE.Color(0x56c8ff);
    const colViolet = new THREE.Color(0x9370db);
    const colSilver = new THREE.Color(0xc0c6d4);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 25;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 25;

      const rand = Math.random();
      const c = rand < 0.45 ? colBlue : rand < 0.8 ? colViolet : colSilver;
      particleColors[i] = c.r;
      particleColors[i + 1] = c.g;
      particleColors[i + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x56c8ff, 3.5, 15);
    blueLight.position.set(4, 3, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x9370db, 3.0, 15);
    violetLight.position.set(-4, -2, 3);
    scene.add(violetLight);

    const topWhiteLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topWhiteLight.position.set(0, 8, 4);
    scene.add(topWhiteLight);

    // Mouse & Inertia Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Drag to rotate interaction
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!isDragging) {
        mainGroup.rotation.y = elapsedTime * 0.2 + currentMouseX * 0.6;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + -currentMouseY * 0.4;
      }

      // Dynamic scroll reaction
      const scrollRotation = scrollY * 0.0015;
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12 - scrollY * 0.001;

      // Inner & wireframe spin
      wireMesh.rotation.y = -elapsedTime * 0.3;
      wireMesh.rotation.z = elapsedTime * 0.15;
      innerMesh.rotation.x = elapsedTime * 0.5;
      innerMesh.rotation.y = elapsedTime * 0.4;

      // Rings spin on their local plane
      ring1.rotation.z = elapsedTime * 0.4 + scrollRotation;
      ring2.rotation.z = -elapsedTime * 0.35 + scrollRotation;
      ring3.rotation.y = elapsedTime * 0.2;

      // Satellites orbital motion
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(sat.angle * 3 + elapsedTime) * 0.2;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Background particle drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Lights subtle breath
      blueLight.intensity = 3.2 + Math.sin(elapsedTime * 1.5) * 0.6;
      violetLight.intensity = 2.8 + Math.cos(elapsedTime * 1.8) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* 3D Coordinate Overlays & Micro-HUD */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex flex-col items-end gap-1 font-mono text-[11px] text-[#56C8FF]/70 tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#56C8FF] animate-ping" />
          CORE.3D // ACTIVE
        </span>
        <span className="text-white/40">GEO: ICOSA_T2 // 8.38_CGPA</span>
        <span className="text-[#9370DB]/80">ROT: SPHERICAL_FLUID</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B]" />
        Drag to inspect 3D Avatar • Hover to shift perspective
      </div>

      {!isInteractive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-2 border-[#56C8FF] animate-pulse flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-[#9370DB] animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
