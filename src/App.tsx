import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import LabScene from './scenes/LabScene';
import { UILayerFixed, UILayerScrolling } from './components/UILayer';
import { Environment, Loader, ScrollControls, Scroll } from '@react-three/drei';

export default function App() {
  return (
    <div className="absolute inset-0 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 30]} />
        
        <ambientLight intensity={1} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-5, -10, -5]} angle={0.2} penumbra={1} intensity={2} color="#f0f5ff" />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <ScrollControls pages={5} damping={0.1}>
            <LabScene />
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <UILayerScrolling />
            </Scroll>
          </ScrollControls>
          
        </Suspense>
      </Canvas>

      <UILayerFixed />
      <Loader />
    </div>
  );
}
