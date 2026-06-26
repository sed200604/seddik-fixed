'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface WilayaData {
  name: string;
  nameAr: string;
  count: number;
  position: [number, number, number];
}

const WILAYAS: WilayaData[] = [
  { name: 'Algiers', nameAr: 'الجزائر', count: 53, position: [0, 0, 0] },
  { name: 'Constantine', nameAr: 'قسنطينة', count: 21, position: [3, 0, -0.5] },
  { name: 'Oran', nameAr: 'وهران', count: 20, position: [-3.5, 0, 0.3] },
  { name: 'Other', nameAr: 'أخرى', count: 6, position: [0.5, 0, 2] },
];

function PulsingDot({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now() + delay * 1000);

  useFrame(() => {
    if (!meshRef.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    if (elapsed < 0) return;
    const scale = 1 + Math.sin(elapsed * 2) * 0.3;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color="#c4a035"
        emissive="#c4a035"
        emissiveIntensity={0.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function WilayaCluster({ wilaya }: { wilaya: WilayaData }) {
  const [hovered, setHovered] = useState(false);

  /* Generate dot positions in a cluster around the wilaya center */
  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };

    const rand = rng(wilaya.count * 73 + wilaya.position[0] * 1000);

    for (let i = 0; i < wilaya.count; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = rand() * 1.2;
      positions.push([
        wilaya.position[0] + Math.cos(angle) * radius,
        0.05 + rand() * 0.1,
        wilaya.position[2] + Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, [wilaya]);

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {dots.map((pos, i) => (
        <PulsingDot key={i} position={pos} delay={i * 0.03} />
      ))}

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[wilaya.position[0], 1, wilaya.position[2]]} center>
          <div
            style={{
              background: 'oklch(0.19 0.015 250 / 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid oklch(0.78 0.14 75 / 0.3)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.875rem',
              whiteSpace: 'nowrap',
              direction: 'rtl',
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: '#f0f0f0',
                fontSize: '0.875rem',
              }}
            >
              {wilaya.nameAr}
            </div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: '#c4a035',
                fontSize: '1.125rem',
                fontWeight: 700,
              }}
            >
              {wilaya.count} شركة
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function AlgeriaPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <planeGeometry args={[12, 10]} />
      <meshStandardMaterial
        color="#1a1e30"
        transparent
        opacity={0.5}
        roughness={0.9}
      />
    </mesh>
  );
}

function GridLines() {
  return (
    <gridHelper
      args={[12, 24, '#2a2e3e', '#1e2235']}
      position={[0, -0.04, 0]}
    />
  );
}

export default function AlgeriaMapScene() {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 6, 6], fov: 45 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 8, 5]} intensity={0.8} color="#c4a035" />
        <pointLight position={[-5, 6, -3]} intensity={0.3} color="#6a7bff" />

        <AlgeriaPlane />
        <GridLines />

        {WILAYAS.map((w) => (
          <WilayaCluster key={w.name} wilaya={w} />
        ))}

        <Float speed={0.5} floatIntensity={0.2}>
          <Html position={[0, 2.5, 0]} center>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: '#c4a035',
                fontSize: '2rem',
                fontWeight: 700,
                textShadow: '0 0 20px rgba(196, 160, 53, 0.3)',
                pointerEvents: 'none',
              }}
            >
              100
            </div>
          </Html>
        </Float>

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
