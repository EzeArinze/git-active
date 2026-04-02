import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function DataNodes() {
  const group = useRef<THREE.Group>(null);
  
  // Create some orbiting nodes to represent repos/events using a pseudo-random function for pure render
  const nodes = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2.5 + pseudoRandom(i + 1) * 2;
      return {
        position: [Math.cos(angle) * radius, (pseudoRandom(i + 2) - 0.5) * 3, Math.sin(angle) * radius],
        speed: 0.2 + pseudoRandom(i + 3) * 0.5,
        offset: pseudoRandom(i + 4) * Math.PI * 2,
        color: i % 3 === 0 ? "#10b981" : (i % 2 === 0 ? "#3b82f6" : "#8b5cf6")
      };
    });
  }, []);

  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (group.current) {
      group.current.rotation.y += 0.001;
      group.current.children.forEach((child, i) => {
        // Simple oscillation effect
        const node = nodes[i - 1]; // roughly match node data starting after core
        if (node) {
          child.position.y += Math.sin(time.current * node.speed + node.offset) * 0.005;
        }
      });
    }
  });

  return (
    <group ref={group}>
      {/* Central Core: The Intelligence Engine */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.2, 32, 32]}>
          <MeshDistortMaterial 
            color="#0ea5e9" 
            emissive="#0284c7"
            emissiveIntensity={0.5}
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            distort={0.4} 
            speed={2} 
            wireframe={true}
          />
        </Sphere>
      </Float>

      {/* Outer Nodes: Commits, Repos, Issues */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position as [number, number, number]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial 
                color={node.color} 
                emissive={node.color}
                emissiveIntensity={0.8}
                wireframe 
              />
            </Sphere>
          </Float>
          {/* Connection line back to center */}
          <Line
            points={[[0, 0, 0], [-node.position[0], -node.position[1], -node.position[2]]]}
            color={node.color}
            opacity={0.15}
            transparent
            lineWidth={1}
          />
        </group>
      ))}

      <Sparkles count={200} scale={10} size={2} speed={0.4} color="#38bdf8" opacity={0.6} />
    </group>
  );
}