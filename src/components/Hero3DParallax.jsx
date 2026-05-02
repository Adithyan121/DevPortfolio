import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows, RoundedBox, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Subcomponents for the PC Setup ---

const Monitor = () => (
  <group position={[0, 0, -1]}>
    {/* Base */}
    <RoundedBox args={[1.5, 0.1, 1]} radius={0.02} smoothness={4} position={[0, 0.05, 0]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
    </RoundedBox>
    {/* Neck */}
    <RoundedBox args={[0.2, 1.5, 0.1]} radius={0.02} smoothness={4} position={[0, 0.8, -0.2]} rotation={[-0.1, 0, 0]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
    </RoundedBox>
    {/* Screen */}
    <RoundedBox args={[3.8, 2.2, 0.1]} radius={0.05} smoothness={4} position={[0, 1.8, 0]}>
      <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
    </RoundedBox>
    {/* Display */}
    <mesh position={[0, 1.8, 0.06]}>
      <planeGeometry args={[3.6, 2.0]} />
      <meshStandardMaterial color="#050509" emissive="#3b82f6" emissiveIntensity={0.2} />
    </mesh>
    {/* Code blocks on screen */}
    <mesh position={[-1, 2.2, 0.07]}>
      <planeGeometry args={[1, 0.05]} />
      <meshBasicMaterial color="#a855f7" />
    </mesh>
    <mesh position={[-1.2, 2.0, 0.07]}>
      <planeGeometry args={[0.6, 0.05]} />
      <meshBasicMaterial color="#38bdf8" />
    </mesh>
    <mesh position={[-0.8, 1.8, 0.07]}>
      <planeGeometry args={[1.4, 0.05]} />
      <meshBasicMaterial color="#ec4899" />
    </mesh>
  </group>
);

const KeyboardMouse = () => (
  <group position={[0, 0, 1]}>
    {/* Desk Mat */}
    <RoundedBox args={[4, 0.02, 1.5]} radius={0.01} smoothness={4} position={[0, 0.01, 0]}>
      <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
    </RoundedBox>
    {/* Keyboard */}
    <RoundedBox args={[1.8, 0.06, 0.6]} radius={0.02} smoothness={4} position={[-0.4, 0.04, 0]} rotation={[0.05, 0, 0]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
    </RoundedBox>
    {/* Keyboard Glow */}
    <mesh position={[-0.4, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.6, 0.4]} />
      <meshStandardMaterial color="#000" emissive="#a855f7" emissiveIntensity={0.5} />
    </mesh>
    {/* Mouse */}
    <RoundedBox args={[0.3, 0.1, 0.5]} radius={0.05} smoothness={4} position={[1.2, 0.05, 0]}>
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
    </RoundedBox>
    <mesh position={[1.2, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.1, 0.2]} />
      <meshStandardMaterial color="#000" emissive="#3b82f6" emissiveIntensity={0.5} />
    </mesh>
  </group>
);

const TechCube = ({ text, color, position, rotation, offset, progress }) => {
  const ref = useRef();
  const initPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const targetPos = useMemo(() => new THREE.Vector3(position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]), [position, offset]);

  useFrame((state) => {
    // Float gently
    const floatY = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    
    // Move from init to target based on progress
    ref.current.position.lerpVectors(initPos, targetPos, progress);
    ref.current.position.y += floatY;
    
    ref.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial color="#111" transmission={0.2} metalness={0.8} roughness={0.2} clearcoat={1} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.55, 0.55]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </RoundedBox>
      <Text position={[0, 0, 0.35]} fontSize={0.15} color="#fff" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf">
        {text}
      </Text>
    </group>
  );
};

const ExplodedPC = ({ scrollProgress }) => {
  const groupRef = useRef();
  
  // PC Parts references
  const sidePanelRef = useRef();
  const gpuRef = useRef();
  const moboRef = useRef();
  const ramRef1 = useRef();
  const ramRef2 = useRef();
  const fanRef1 = useRef();
  const fanRef2 = useRef();
  const cableRef = useRef();

  useFrame((state) => {
    const p = scrollProgress.get(); // 0 to 1
    
    // Calculate animation stages
    // 0 to 0.3: Panel opens
    const panelP = Math.max(0, Math.min(1, p / 0.3));
    // 0.3 to 1.0: Components explode outward
    const explodeP = Math.max(0, Math.min(1, (p - 0.3) / 0.7));

    // Smooth interpolations
    if (sidePanelRef.current) {
      const targetX = THREE.MathUtils.lerp(1.0, 3.0, panelP);
      const targetRot = THREE.MathUtils.lerp(0, Math.PI / 4, panelP);
      const targetOpacity = THREE.MathUtils.lerp(0.8, 0.2, panelP);
      sidePanelRef.current.position.x = THREE.MathUtils.lerp(sidePanelRef.current.position.x, targetX, 0.1);
      sidePanelRef.current.rotation.y = THREE.MathUtils.lerp(sidePanelRef.current.rotation.y, targetRot, 0.1);
      sidePanelRef.current.material.opacity = THREE.MathUtils.lerp(sidePanelRef.current.material.opacity, targetOpacity, 0.1);
    }

    if (gpuRef.current) {
      gpuRef.current.position.x = THREE.MathUtils.lerp(0.4, 2.5, explodeP);
      gpuRef.current.position.z = THREE.MathUtils.lerp(0, 1.5, explodeP);
      gpuRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 6, explodeP);
    }

    if (moboRef.current) {
      moboRef.current.position.x = THREE.MathUtils.lerp(0.1, 1.5, explodeP);
      moboRef.current.position.z = THREE.MathUtils.lerp(-0.2, -1.0, explodeP);
      moboRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 8, explodeP);
    }

    if (ramRef1.current && ramRef2.current) {
      ramRef1.current.position.x = THREE.MathUtils.lerp(0.3, 1.8, explodeP);
      ramRef1.current.position.y = THREE.MathUtils.lerp(1.8, 2.5, explodeP);
      
      ramRef2.current.position.x = THREE.MathUtils.lerp(0.3, 2.2, explodeP);
      ramRef2.current.position.y = THREE.MathUtils.lerp(1.6, 2.8, explodeP);
    }

    if (fanRef1.current && fanRef2.current) {
      fanRef1.current.position.x = THREE.MathUtils.lerp(0.5, 3.0, explodeP);
      fanRef1.current.position.y = THREE.MathUtils.lerp(2.2, 3.5, explodeP);
      fanRef1.current.rotation.z += 0.1; // always spinning
      
      fanRef2.current.position.x = THREE.MathUtils.lerp(0.5, 2.8, explodeP);
      fanRef2.current.position.y = THREE.MathUtils.lerp(1.2, 0.5, explodeP);
      fanRef2.current.rotation.z += 0.1;
    }

    if (cableRef.current) {
      cableRef.current.position.x = THREE.MathUtils.lerp(0.2, 2.0, explodeP);
      cableRef.current.position.y = THREE.MathUtils.lerp(0.5, -0.5, explodeP);
    }
  });

  return (
    <group position={[3, 0, -0.5]}>
      {/* PC Case Main Body */}
      <RoundedBox args={[1.8, 3.0, 2.8]} radius={0.1} smoothness={4} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#0f0f11" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      {/* PC Side Panel (Glass) */}
      <RoundedBox ref={sidePanelRef} args={[0.05, 2.8, 2.6]} radius={0.02} smoothness={4} position={[0.9, 1.5, 0]}>
        <meshPhysicalMaterial color="#000" transmission={0.9} opacity={0.8} transparent roughness={0.1} metalness={0.5} clearcoat={1} />
      </RoundedBox>

      {/* Internal Glow */}
      <pointLight position={[0.5, 1.5, 0]} color="#a855f7" intensity={5} distance={5} />
      <pointLight position={[0.5, 2.5, 0]} color="#3b82f6" intensity={3} distance={5} />

      {/* Motherboard */}
      <group ref={moboRef} position={[0.1, 1.5, -0.2]}>
        <boxGeometry args={[0.1, 2.0, 1.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.8} />
      </group>

      {/* GPU */}
      <group ref={gpuRef} position={[0.4, 1.0, 0]}>
        <RoundedBox args={[0.4, 0.6, 1.6]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0.21, 0, 0]}>
          <planeGeometry args={[0.5, 1.4]} />
          <meshStandardMaterial color="#000" emissive="#3b82f6" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* RAM Sticks */}
      <mesh ref={ramRef1} position={[0.3, 1.8, -0.5]}>
        <boxGeometry args={[0.05, 0.4, 0.15]} />
        <meshStandardMaterial color="#111" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ramRef2} position={[0.3, 1.6, -0.5]}>
        <boxGeometry args={[0.05, 0.4, 0.15]} />
        <meshStandardMaterial color="#111" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>

      {/* Cooling Fans */}
      <group ref={fanRef1} position={[0.5, 2.2, 1.0]} rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color="#111" emissive="#38bdf8" emissiveIntensity={1.5} />
      </group>
      <group ref={fanRef2} position={[0.5, 1.2, 1.0]} rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color="#111" emissive="#ec4899" emissiveIntensity={1.5} />
      </group>

      {/* Light Streak / Cable */}
      <mesh ref={cableRef} position={[0.2, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#fff" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const AnimatedScene = ({ scrollYProgress }) => {
  const sceneRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setProgress(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Mouse Parallax
    const targetX = mouse.current.x * 0.2;
    const targetY = mouse.current.y * 0.2;
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetX, 0.05);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={sceneRef}>
      <Monitor />
      <KeyboardMouse />
      <ExplodedPC scrollProgress={scrollYProgress} />

      {/* Floating Tech Cubes */}
      <TechCube text="React" color="#3b82f6" position={[-2, 3, 0]} rotation={[0.2, 0.4]} offset={[-3, 2, 2]} progress={progress} />
      <TechCube text="Node.js" color="#22c55e" position={[-3, 1, 1]} rotation={[0.5, 0.1]} offset={[-4, 0, 3]} progress={progress} />
      <TechCube text="MongoDB" color="#10b981" position={[3, 4, -2]} rotation={[-0.2, 0.5]} offset={[4, 2, -1]} progress={progress} />
      <TechCube text="JS" color="#eab308" position={[-1, 4, -1]} rotation={[0.1, 0.1]} offset={[-2, 3, -3]} progress={progress} />
      <TechCube text="Express" color="#9ca3af" position={[5, 2, 1]} rotation={[0.4, 0.8]} offset={[6, 1, 4]} progress={progress} />
    </group>
  );
};

const Hero3DParallax = ({ scrollYProgress }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#a855f7" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#3b82f6" />
      
      <PresentationControls
        global
        rotation={[0.1, -0.3, 0]}
        polar={[-0.1, 0.1]}
        azimuth={[-0.2, 0.2]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          <AnimatedScene scrollYProgress={scrollYProgress} />
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -0.2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Hero3DParallax;
