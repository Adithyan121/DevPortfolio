import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PresentationControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const PCSetup = () => {
  return (
    <group position={[0, -1, 0]}>
      {/* Monitor Stand Base */}
      <RoundedBox args={[1.5, 0.1, 1]} radius={0.05} smoothness={4} position={[0, 0.05, -0.5]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Monitor Stand Neck */}
      <RoundedBox args={[0.2, 1.2, 0.1]} radius={0.02} smoothness={4} position={[0, 0.6, -0.8]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Monitor Screen */}
      <RoundedBox args={[3.2, 1.8, 0.1]} radius={0.05} smoothness={4} position={[0, 1.3, -0.7]}>
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      
      {/* Screen Display (Glowing) */}
      <mesh position={[0, 1.3, -0.64]}>
        <planeGeometry args={[3.0, 1.6]} />
        <meshStandardMaterial color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.5} roughness={0.2} />
      </mesh>
      
      {/* Code Window 1 on Screen */}
      <mesh position={[-0.6, 1.3, -0.63]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Code Lines */}
      <mesh position={[-0.6, 1.6, -0.62]}>
        <planeGeometry args={[0.8, 0.05]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[-0.8, 1.4, -0.62]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
      <mesh position={[-0.5, 1.2, -0.62]}>
        <planeGeometry args={[1.0, 0.05]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>

      {/* Code Window 2 on Screen */}
      <mesh position={[0.6, 1.1, -0.63]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* CPU Tower */}
      <RoundedBox args={[1.2, 2.5, 2.5]} radius={0.1} smoothness={4} position={[2.5, 1.25, -0.5]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {/* CPU Glass Side Panel */}
      <mesh position={[1.89, 1.25, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.3, 2.3]} />
        <meshPhysicalMaterial color="#000" transmission={0.9} opacity={1} transparent roughness={0.1} />
      </mesh>
      {/* CPU Internal Glow (RGB) */}
      <pointLight position={[2.2, 1.25, -0.5]} color="#8b5cf6" intensity={2} distance={3} />
      <pointLight position={[2.2, 2.0, -0.5]} color="#ec4899" intensity={2} distance={3} />

      {/* Keyboard */}
      <RoundedBox args={[1.8, 0.05, 0.6]} radius={0.02} smoothness={4} position={[0, 0.025, 0.5]} rotation={[0.05, 0, 0]}>
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </RoundedBox>
      {/* Keyboard Glow */}
      <mesh position={[0, 0.06, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.4]} />
        <meshStandardMaterial color="#000" emissive="#06b6d4" emissiveIntensity={0.4} />
      </mesh>

      {/* Mouse */}
      <RoundedBox args={[0.3, 0.1, 0.5]} radius={0.05} smoothness={4} position={[1.4, 0.05, 0.5]}>
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Floating UI Panel 1 */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[-2.5, 2, 0.5]}>
        <RoundedBox args={[1.5, 1, 0.05]} radius={0.05} smoothness={4} rotation={[0, 0.3, 0]}>
          <meshPhysicalMaterial color="#3b82f6" transmission={0.8} opacity={1} transparent roughness={0.2} />
        </RoundedBox>
      </Float>

      {/* Floating UI Panel 2 */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6} position={[2, 3, 0.2]}>
        <RoundedBox args={[1, 1.2, 0.05]} radius={0.05} smoothness={4} rotation={[0, -0.2, 0]}>
          <meshPhysicalMaterial color="#ec4899" transmission={0.8} opacity={1} transparent roughness={0.2} />
        </RoundedBox>
      </Float>
    </group>
  );
};

const HeroThreeScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Render a simpler version if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Interactive 3D Scene disabled (Reduced Motion preference)</p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 45 }}
      dpr={[1, 1.5]} // Reduced max DPR slightly for better mobile performance
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={2} color="#8b5cf6" />
      
      <PresentationControls
        global
        rotation={[0.1, -0.2, 0]}
        polar={[-0.1, 0.2]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
          <PCSetup />
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
      <Environment preset="city" />
    </Canvas>
  );
};

export default HeroThreeScene;
