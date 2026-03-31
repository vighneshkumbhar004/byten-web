import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Rock Model Component
function RockModel() {
  const meshRef = useRef();
  const gltf = useGLTF('/models/rock.glb');
  
  // Load textures from public folder
  const [colorMap, normalMap, armMap] = useTexture([
    '/textures/rock_diffuse.jpeg',
    '/textures/rock_normal.jpeg',
    '/textures/rock_arm.jpeg'
  ]);

  // Auto-rotate animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Apply textures to the model
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Create material with textures
          child.material = new THREE.MeshStandardMaterial({
            map: colorMap,
            normalMap: normalMap,
            roughnessMap: armMap,
            aoMap: armMap,
            metalness: 0.1,
            roughness: 0.8,
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [gltf, colorMap, normalMap, armMap]);

  return (
    <primitive 
      ref={meshRef}
      object={gltf.scene} 
      scale={2.5}
      position={[0, -1, 0]}
    />
  );
}

// Loading fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#FFCC00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 mt-4 text-center">Loading 3D Terrain...</p>
      </div>
    </div>
  );
}

// Main 3D Viewer Component
const TerrainViewer3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Info Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
        <p className="text-xs font-mono">3D TERRAIN SCAN</p>
        <p className="text-xl font-bold text-[#FFCC00]">Survey-Grade Model</p>
        <p className="text-xs mt-1 opacity-80">Drag to rotate • Scroll to zoom</p>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-right">
        <div className="text-xs font-mono space-y-1">
          <div>
            <span className="text-gray-400">RESOLUTION:</span>{' '}
            <span className="text-[#FFCC00]">0.3cm</span>
          </div>
          <div>
            <span className="text-gray-400">POINTS:</span>{' '}
            <span className="text-[#FFCC00]">2.4M+</span>
          </div>
          <div>
            <span className="text-gray-400">FORMAT:</span>{' '}
            <span className="text-[#FFCC00]">LiDAR</span>
          </div>
        </div>
      </div>

      {/* Canvas with 3D Scene */}
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFCC00" />
          
          {/* 3D Model */}
          <RockModel />
          
          {/* Environment for reflections */}
          <Environment preset="sunset" />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <Suspense fallback={<LoadingSpinner />}>
        <div />
      </Suspense>

      {/* Grid Background Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 204, 0, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 204, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#FFCC00] opacity-50"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#FFCC00] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#FFCC00] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#FFCC00] opacity-50"></div>
    </motion.div>
  );
};

export default TerrainViewer3D;