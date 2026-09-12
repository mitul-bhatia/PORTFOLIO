'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { useBotMood, BotMood } from '@/context/BotMoodContext';

interface ColorPalette {
  grid: number;
  particles: number;
  beacon: number;
  light: number;
  ambient: number;
}

const PALETTES: Record<BotMood, ColorPalette> = {
  jealous: {
    grid: 0x8c5224,      // Antique warm copper drafting ink
    particles: 0xa8672e, // Deep terracotta archival tone
    beacon: 0xb84a39,    // Crimson ledger margin red
    light: 0xffeed4,     // Warm desk incandescent lamp
    ambient: 0x2b1d14,   // Charcoal/ink shadow
  },
  fan: {
    grid: 0xd4850a,      // Radiant golden honey
    particles: 0xf59e0b, // Amber sunburst gold
    beacon: 0xffd166,    // Brilliant warm sparkle
    light: 0xffeaab,     // Golden study sunlight
    ambient: 0x7a6030,   // Warm gold ambient
  },
  bragger: {
    grid: 0xe07a00,      // High-voltage electric gold
    particles: 0xffb703, // Cyber gold sparks
    beacon: 0xffffff,    // Laser white-hot glint
    light: 0xffa000,     // High-intensity spotlight
    ambient: 0x6e4909,   // Deep bronze substrate
  },
};

export function ThreeAtmosphereCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mood } = useBotMood();
  const moodRef = useRef<BotMood>(mood);

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── 1. Three.js Scene Setup ─────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 14, 28);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // ─── 2. Interactive 3D Architectural Wireframe Terrain ───────────────────
    const noise2D = createNoise2D();
    const planeWidth = 72;
    const planeHeight = 48;
    const segmentsX = 48;
    const segmentsY = 32;

    const terrainGeometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      segmentsX,
      segmentsY
    );
    terrainGeometry.rotateX(-Math.PI / 2);
    terrainGeometry.translate(0, -6, 0);

    const posAttr = terrainGeometry.attributes.position;
    const initialPositions = posAttr.array.slice();

    const currentPalette = PALETTES[moodRef.current];

    const terrainMaterial = new THREE.MeshBasicMaterial({
      color: currentPalette.grid,
      wireframe: true,
      transparent: true,
      opacity: moodRef.current === 'bragger' ? 0.22 : 0.12,
    });

    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    scene.add(terrainMesh);

    // ─── 3. Floating Interactive Particle Constellation ───────────────────────
    const particleCount = 420;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 60;
      particlePositions[i3 + 1] = (Math.random() - 0.2) * 24 - 4;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 40;

      particleVelocities[i3] = (Math.random() - 0.5) * 0.015;
      particleVelocities[i3 + 1] = Math.random() * 0.02 + 0.005; // Gentle upward drift
      particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Create a circular particle texture using offscreen canvas
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const particleMaterial = new THREE.PointsMaterial({
      color: currentPalette.particles,
      size: 0.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ─── 4. Dynamic Cursor Light Beacon ──────────────────────────────────────
    const cursorLight = new THREE.PointLight(
      currentPalette.light,
      1.2,
      40
    );
    cursorLight.position.set(0, 6, 10);
    scene.add(cursorLight);

    const ambientLight = new THREE.AmbientLight(currentPalette.ambient, 0.5);
    scene.add(ambientLight);

    // ─── 5. Mouse Interactivity Tracking ─────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ─── 6. Resize Handler ───────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize, { passive: true });

    // ─── 7. Animation & Render Loop ──────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Target colors for smooth color transitions
    const targetGridColor = new THREE.Color(currentPalette.grid);
    const targetParticleColor = new THREE.Color(currentPalette.particles);
    const targetLightColor = new THREE.Color(currentPalette.light);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const currentMood = moodRef.current;
      const targetPalette = PALETTES[currentMood];

      // Smooth color transitions towards the current mood
      targetGridColor.setHex(targetPalette.grid);
      targetParticleColor.setHex(targetPalette.particles);
      targetLightColor.setHex(targetPalette.light);

      terrainMaterial.color.lerp(targetGridColor, 0.05);
      particleMaterial.color.lerp(targetParticleColor, 0.05);
      cursorLight.color.lerp(targetLightColor, 0.05);

      // Opacity adjustments per mood
      const targetGridOpacity = currentMood === 'bragger' ? 0.24 : currentMood === 'fan' ? 0.16 : 0.1;
      terrainMaterial.opacity += (targetGridOpacity - terrainMaterial.opacity) * 0.05;

      const targetParticleOpacity = currentMood === 'fan' ? 0.6 : currentMood === 'bragger' ? 0.5 : 0.35;
      particleMaterial.opacity += (targetParticleOpacity - particleMaterial.opacity) * 0.05;

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor light position
      cursorLight.position.x = mouse.x * 24;
      cursorLight.position.y = mouse.y * 12 + 6;

      // Subtle camera parallax sway
      if (!prefersReducedMotion) {
        camera.position.x = mouse.x * 4;
        camera.position.y = 14 + mouse.y * 2.5;
        camera.lookAt(mouse.x * 1.5, -2, 0);
      }

      // ─── Animate Terrain Waves via Simplex Noise ───────────────────────────
      const positions = terrainGeometry.attributes.position;
      const posArray = positions.array as Float32Array;
      const count = posAttr.count;

      const waveSpeed = currentMood === 'bragger' ? 0.9 : currentMood === 'fan' ? 0.5 : 0.3;
      const waveHeight = currentMood === 'bragger' ? 1.6 : currentMood === 'fan' ? 1.1 : 0.65;

      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const origX = initialPositions[i3];
          const origZ = initialPositions[i3 + 2];

          // Distance from mouse in plane space
          const dx = origX - mouse.x * 20;
          const dz = origZ - (mouse.y * 15 - 10);
          const distToMouse = Math.sqrt(dx * dx + dz * dz);
          const mouseDeform = Math.max(0, 1 - distToMouse / 14) * 0.8;

          // Multi-frequency mathematical wave
          const n = noise2D(
            origX * 0.06 + elapsedTime * waveSpeed * 0.15,
            origZ * 0.06 + elapsedTime * waveSpeed * 0.15
          );

          posArray[i3 + 1] = n * waveHeight + mouseDeform;
        }
        positions.needsUpdate = true;
      }

      // ─── Animate Floating Particles ───────────────────────────────────────
      const pPositions = particleGeometry.attributes.position;
      const pPosArray = pPositions.array as Float32Array;

      const pSpeed = currentMood === 'bragger' ? 1.8 : currentMood === 'fan' ? 1.2 : 0.7;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        pPosArray[i3] += particleVelocities[i3] * pSpeed;
        pPosArray[i3 + 1] += particleVelocities[i3 + 1] * pSpeed;
        pPosArray[i3 + 2] += particleVelocities[i3 + 2] * pSpeed;

        // Wrap around boundaries
        if (pPosArray[i3 + 1] > 20) {
          pPosArray[i3 + 1] = -6;
          pPosArray[i3] = (Math.random() - 0.5) * 60;
          pPosArray[i3 + 2] = (Math.random() - 0.5) * 40;
        }
      }
      pPositions.needsUpdate = true;

      // Render the frame
      renderer.render(scene, camera);
    };

    animate();

    // ─── 8. Cleanup on Unmount ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      terrainGeometry.dispose();
      terrainMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
