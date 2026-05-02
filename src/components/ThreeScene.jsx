import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, PerspectiveCamera, PresentationControls } from '@react-three/drei';

function AbstractShape({ color, ...props }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} {...props}>
      <mesh
        ref={ref}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0}
          roughness={0.1}
          metalness={0.5}
          distort={0.4}
          speed={hovered ? 5 : 2}
        />
      </mesh>
    </Float>
  );
}

const SceneElements = () => {
  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.2, 0.2]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <group position={[0, 0, 0]}>
        <AbstractShape color="#3b82f6" position={[-1.5, 0.5, 0]} scale={0.8} />
        <AbstractShape color="#8b5cf6" position={[1.5, -0.5, 0]} scale={1.2} />
        <AbstractShape color="#ec4899" position={[0, 1.5, -1]} scale={0.6} />
      </group>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </PresentationControls>
  );
};

const ThreeScene = () => {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // On very small mobile devices, we could render a simpler version or null, but React Three Fiber handles resizing nicely. 
  // We'll keep it simple but limit performance impact with lower resolution on mobile via frameloop.
  
  if (prefersReducedMotion) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Interactive 3D Scene (Hidden due to reduced motion preference)</p>
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <SceneElements />
    </Canvas>
  );
};

export default ThreeScene;
