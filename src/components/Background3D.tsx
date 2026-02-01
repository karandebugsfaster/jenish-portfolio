import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'motion/react';

// Singleton Canvas manager to prevent multiple Three.js instances
class CanvasManager {
  private static instance: CanvasManager;
  private canvasExists: boolean = false;
  
  private constructor() {}
  
  static getInstance(): CanvasManager {
    if (!CanvasManager.instance) {
      CanvasManager.instance = new CanvasManager();
    }
    return CanvasManager.instance;
  }
  
  claim(): boolean {
    if (this.canvasExists) {
      return false;
    }
    this.canvasExists = true;
    return true;
  }
  
  release(): void {
    this.canvasExists = false;
  }
  
  isActive(): boolean {
    return this.canvasExists;
  }
}

// Multiple floating geometric elements for depth
function FloatingFrame({ position, scale, rotationSpeed }: any) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Cinematic rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed.x;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed.y;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed.z;
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.2 + position[1]) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[3, 4, 0.05]} />
      <meshStandardMaterial
        color="#1f1f2e"
        transparent
        opacity={0.12}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Particle system for ambient atmosphere
function Particles() {
  const particlesRef = useRef<any>(null);
  
  // Memoize particle positions to prevent regeneration
  const particlePositions = useMemo(() => 
    Array.from({ length: 50 }, () => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
    ]), []
  );
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <group ref={particlesRef}>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Background3D() {
  const [shouldRender, setShouldRender] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const canvasManager = CanvasManager.getInstance();
    
    // Prevent multiple instances
    if (canvasManager.isActive()) {
      console.warn('Background3D: Canvas instance already exists, skipping render');
      return;
    }

    // Mark that we're creating a Canvas instance
    canvasManager.claim();
    isMountedRef.current = true;

    // Delay rendering to avoid double-mount issues in React Strict Mode
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setShouldRender(true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      isMountedRef.current = false;
      canvasManager.release();
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          powerPreference: 'high-performance',
        }}
        frameloop="always"
        onCreated={(state) => {
          state.gl.setClearColor('#0a0a0d', 0);
        }}
      >
        {/* Lighting setup for cinematic feel */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.3}
          color="#8b5cf6"
        />
        
        {/* Multiple floating frames for depth */}
        <FloatingFrame 
          position={[2, 0, 0]} 
          scale={1}
          rotationSpeed={{ x: 0.05, y: 0.03, z: 0.01 }}
        />
        <FloatingFrame 
          position={[-3, -2, -2]} 
          scale={0.7}
          rotationSpeed={{ x: -0.03, y: 0.04, z: -0.02 }}
        />
        <FloatingFrame 
          position={[1, 3, -3]} 
          scale={0.5}
          rotationSpeed={{ x: 0.02, y: -0.03, z: 0.04 }}
        />
        
        {/* Ambient particles */}
        <Particles />
      </Canvas>
    </motion.div>
  );
}