import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ParallaxScene = React.memo(() => {
  const sceneGroup = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.25;
    if (sceneGroup.current) {
      sceneGroup.current.rotation.y = THREE.MathUtils.lerp(sceneGroup.current.rotation.y, targetX, 0.08);
      sceneGroup.current.rotation.x = THREE.MathUtils.lerp(sceneGroup.current.rotation.x, -targetY, 0.08);
    }
  });

  return (
    <group ref={sceneGroup}>
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={0.4} />
      <Sparkles count={80} scale={[15, 15, 8]} size={1.5} speed={0.15} opacity={0.45} color="#a855f7" />
    </group>
  );
});

const Background3D = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const moonRef = useRef(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth <= 768;
    const shouldAnimate = !isReducedMotion && !isSmallScreen;

    setShowCanvas(shouldAnimate);

    if (!shouldAnimate) {
      return undefined;
    }

    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 20;
      targetMouse.current.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    const updateParallax = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.12;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.12;

      if (moonRef.current) {
        moonRef.current.style.transform = `translate(${currentMouse.current.x * -1.5}px, ${currentMouse.current.y * -1.5}px)`;
      }

      frameRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#050509', overflow: 'hidden' }}>
      {showCanvas ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.2]}
          gl={{ antialias: false, powerPreference: 'low-power' }}
          shadows={false}
          style={{ width: '100%', height: '100%' }}
        >
          <ParallaxScene />
        </Canvas>
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at top right, #111228, #03030b)' }} />
      )}

      <motion.img
        src="/satellite.png"
        alt="Satellite"
        initial={{ x: '-20vw', y: '30vh', rotate: 15 }}
        animate={{ x: '120vw', y: '15vh', rotate: -5 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(80px, 15vw, 150px)',
          opacity: 0.7,
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      <div
        ref={moonRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(180px, 36vw, 360px)',
          height: 'clamp(180px, 36vw, 360px)',
          transform: 'translate(0, 0)',
          transition: 'transform 0.15s ease-out',
          opacity: 0.8,
          filter: 'drop-shadow(0 0 50px rgba(168, 85, 247, 0.3))',
        }}
      >
        <img
          src="/moon.png"
          alt="Moon"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.parentElement) {
              e.target.parentElement.innerHTML = '<div style="width:100%; height:100%; border-radius:50%; background: radial-gradient(circle at 30% 30%, #fff, #555); box-shadow: inset -20px -20px 40px rgba(0,0,0,0.5);"></div>';
            }
          }}
        />
      </div>
    </div>
  );
};

export default Background3D;
