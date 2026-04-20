import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function LabScene() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const offset = scroll.offset; 
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Smooth travel across Y axis and rotation
      groupRef.current.position.y = THREE.MathUtils.lerp(-3, 3.5, offset);
      groupRef.current.rotation.y = t * 0.1 + (offset * Math.PI * 2.5);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0.15, -0.3, offset);

      // Panning horizontally
      const targetX = Math.sin(offset * Math.PI) * 2; 
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    }

    if (innerRef.current) {
       innerRef.current.rotation.x = t * 0.2 + offset;
       innerRef.current.rotation.z = t * 0.15;
       const scale = 1 + Math.sin(t * 2) * 0.03;
       innerRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current && ring2Ref.current) {
       ring1Ref.current.rotation.y = t * -0.5;
       ring1Ref.current.rotation.x = t * 0.2;
       
       ring2Ref.current.rotation.x = t * 0.6;
       ring2Ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
       <group ref={groupRef}>

         {/* =====================
             INTERNAL ORGANIC CORE
             ===================== */}
         <mesh ref={innerRef}>
            <torusKnotGeometry args={[0.6, 0.15, 150, 40]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.4}
            />
         </mesh>

         {/* Stabilization Rings around core */}
         <mesh ref={ring1Ref}>
            <torusGeometry args={[1.0, 0.015, 16, 100]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
         </mesh>
         <mesh ref={ring2Ref} scale={1.2}>
            <torusGeometry args={[1.0, 0.01, 16, 100]} />
            <meshStandardMaterial color="#aaffff" emissive="#ffffff" emissiveIntensity={0.5} />
         </mesh>

         {/* =====================
             THE VAULT (GLASS)
             ===================== */}
         <mesh>
           <cylinderGeometry args={[1.5, 1.5, 6.4, 64]} />
           <MeshTransmissionMaterial
             backside
             thickness={1.5}
             roughness={0.03}
             transmission={1}
             ior={1.35}
             chromaticAberration={0.06}
             color="#f2f5f8"
             clearcoat={1}
           />
         </mesh>

         {/* =====================
             TOP CAP HARDWARE
             ===================== */}
         <group position={[0, 3.2, 0]}>
            {/* Primary Seal */}
            <mesh position={[0, 0.1, 0]}>
               <cylinderGeometry args={[1.55, 1.5, 0.2, 64]} />
               <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.8} />
            </mesh>
            {/* Upper Bevel */}
            <mesh position={[0, 0.25, 0]}>
               <cylinderGeometry args={[1.4, 1.55, 0.1, 64]} />
               <meshStandardMaterial color="#151515" roughness={0.5} metalness={0.9} />
            </mesh>
            {/* Top Engine Block */}
            <mesh position={[0, 0.5, 0]}>
               <cylinderGeometry args={[1.2, 1.4, 0.4, 64]} />
               <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.7} />
            </mesh>
            {/* Glowing Ring */}
            <mesh position={[0, -0.01, 0]}>
               <cylinderGeometry args={[1.45, 1.45, 0.05, 64]} />
               <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
         </group>

         {/* =====================
             BOTTOM CAP HARDWARE
             ===================== */}
         <group position={[0, -3.2, 0]}>
            {/* Primary Seal */}
            <mesh position={[0, -0.1, 0]}>
               <cylinderGeometry args={[1.5, 1.55, 0.2, 64]} />
               <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.8} />
            </mesh>
            {/* Lower Bevel */}
            <mesh position={[0, -0.25, 0]}>
               <cylinderGeometry args={[1.55, 1.4, 0.1, 64]} />
               <meshStandardMaterial color="#151515" roughness={0.5} metalness={0.9} />
            </mesh>
            {/* Bottom Engine Base */}
            <mesh position={[0, -0.5, 0]}>
               <cylinderGeometry args={[1.4, 1.2, 0.4, 64]} />
               <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.7} />
            </mesh>
            {/* Glowing Ring */}
            <mesh position={[0, 0.01, 0]}>
               <cylinderGeometry args={[1.45, 1.45, 0.05, 64]} />
               <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
         </group>

         {/* =====================
             EXTERIOR REINFORCEMENTS
             ===================== */}
         {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
           <mesh 
             key={i} 
             position={[Math.cos(angle) * 1.6, 0, Math.sin(angle) * 1.6]} 
             rotation={[0, -angle, 0]}
           >
              <cylinderGeometry args={[0.04, 0.04, 6.5, 16]} />
              <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
           </mesh>
         ))}

         {/* Internal lighting */}
         <pointLight color="#ffffff" intensity={0.6} distance={4} />
       </group>
    </Float>
  );
}
