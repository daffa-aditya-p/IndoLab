import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

function ParallaxEl({ children, speed, className, offsetStart = 0 }: any) {
  const scroll = useScroll();
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current) return;
    const y = (scroll.offset - offsetStart) * speed * window.innerHeight;
    ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
  });

  return <div ref={ref} className={className}>{children}</div>;
}

export function UILayerFixed() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(`${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}:${d.getUTCSeconds().toString().padStart(2, '0')}.${d.getUTCMilliseconds().toString().padStart(3, '0')}`);
    }, 47); // weird interval for rapid tick
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between p-6 lg:p-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#666]">
      
      {/* Viewfinder borders */}
      <div className="absolute inset-6 lg:inset-10 border border-white/5 pointer-events-none" />
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/30" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/30" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/30" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/30" />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold tracking-[0.4em] text-xs">INDOLAB_</span>
          <span>SYS.VER 9.0.4<br/>BUILD_ID // 4A99X</span>
        </div>
        <div className="flex flex-col items-center">
            <svg width="40" height="15" viewBox="0 0 40 15" className="fill-none stroke-white/40">
               <path d="M0,7.5 L10,7.5 L15,2 L25,13 L30,7.5 L40,7.5" strokeWidth="0.5" />
            </svg>
            <span className="mt-2 text-[8px] tracking-[0.3em] opacity-40">CARDIAC_MON. OK</span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-white">UTC_TIME: {time}</span>
          <span>LAT: 42°21'36"N<br/>LON: 71°03'35"W</span>
        </div>
      </div>

      {/* Center crosshair subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-20">
         <div className="w-[80vh] h-[80vh] border border-white/10 rounded-full" />
         <div className="absolute w-[40vh] h-[40vh] border border-white/20 rounded-full border-dashed" />
         <div className="absolute w-[10vh] h-[10vh] border border-white/30 rounded-full" />
         <div className="w-1 h-1 bg-white rounded-full absolute" />
         <div className="w-[100vw] h-[1px] bg-white/5 absolute" />
         <div className="w-[1px] h-[100vh] bg-white/5 absolute" />
      </div>

      <div className="flex justify-between items-end relative z-10">
        <div>
           <div className="flex gap-2 items-center mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse blur-[2px]" />
              <div className="w-2 h-2 bg-green-500 rounded-full absolute" />
              <span className="text-green-500 font-bold">LIVE STABILIZATION</span>
           </div>
           <span>GIMBAL: ACTIVE<br/>INERTIA: ZERO</span>
        </div>
        <div className="text-center font-sans tracking-tight text-white/20 hidden md:block">
           scroll
        </div>
        <div className="text-right">
           <div className="opacity-40 mb-2">MEMORY BUFFER</div>
           <div className="flex gap-1 justify-end">
             {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white/40" />
             ))}
             <div className="w-1 h-3 bg-white border border-white" />
             <div className="w-1 h-3 border border-white/40" />
           </div>
        </div>
      </div>
    </div>
  );
}

export function UILayerScrolling() {
  return (
    <div className="w-full text-white pointer-events-none selection:bg-white selection:text-black">
      
      {/* PAGE 1: HERO OVERLAY */}
      <section className="h-[100vh] w-full flex flex-col justify-center relative overflow-hidden px-[10vw]">
         <div className="absolute w-full h-[30vh] bottom-0 left-0 bg-gradient-to-t from-[#050505] to-transparent z-0" />
         
         <ParallaxEl speed={1.2} className="relative z-10 w-full flex justify-between items-end">
            <div>
               <h2 className="font-mono text-sm tracking-widest text-white/50 mb-2">01 / CONTAINMENT</h2>
               <h1 className="text-[10vw] font-sans font-bold tracking-tighter leading-[0.85] mb-4">ARCHIVE<br/>VAULT</h1>
               <div className="font-mono text-[10px] tracking-widest bg-white text-black px-3 py-1 inline-block">CLASIFICATION: OMEGA</div>
            </div>

            <div className="hidden md:flex flex-col gap-6 text-right font-mono text-[9px] tracking-widest opacity-60">
                <div className="border border-white/20 p-4 bg-black/40 backdrop-blur-sm">
                   <div className="mb-2 opacity-50">TEMP_VARIANCE</div>
                   <div className="text-lg text-white">0.0001 K</div>
                </div>
                <div className="border border-white/20 p-4 bg-black/40 backdrop-blur-sm">
                   <div className="mb-2 opacity-50">ISOLATION_VAL</div>
                   <div className="text-lg text-white">99.999%</div>
                </div>
            </div>
         </ParallaxEl>
      </section>

      {/* PAGE 2: MASSIVE DATA LEFT */}
      <section className="h-[100vh] w-full flex flex-col justify-center px-[8vw] md:px-[12vw]">
         <ParallaxEl speed={-0.3} className="max-w-[500px]">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white text-white" />
              <h3 className="font-mono text-xs text-white/60 tracking-widest">MORPHOLOGY</h3>
           </div>
           
           <h4 className="font-sans text-3xl lg:text-4xl leading-tight font-medium mb-8">
             Hyper-dense fluidic core operating at sub-zero stasis.
           </h4>
           
           {/* High-end Bento Grid Detail */}
           <div className="grid grid-cols-2 gap-px bg-white/20 border border-white/20 p-px">
              <div className="bg-[#080808] p-5">
                 <div className="font-mono text-[9px] opacity-40 tracking-widest mb-2">MASS REF</div>
                 <div className="font-sans text-2xl font-light">8,401.0<span className="text-white/30 text-sm"> g</span></div>
              </div>
              <div className="bg-[#080808] p-5">
                 <div className="font-mono text-[9px] opacity-40 tracking-widest mb-2">RADIATION</div>
                 <div className="font-sans text-2xl font-light">0.00<span className="text-white/30 text-sm"> Sv/h</span></div>
              </div>
              <div className="bg-[#080808] p-5 col-span-2 relative overflow-hidden">
                 <div className="font-mono text-[9px] opacity-40 tracking-widest mb-4">WAVEFORM ANALYSIS</div>
                 <svg viewBox="0 0 100 20" className="w-full h-8 stroke-white fill-none opacity-50">
                    <polyline points="0,10 10,12 20,4 30,16 40,8 50,18 60,2 70,14 80,6 90,12 100,10" strokeWidth="0.5" />
                 </svg>
                 <div className="absolute right-5 top-5 font-mono text-[8px] border border-white/30 px-2 py-1 rounded-full">REALTIME</div>
              </div>
           </div>
         </ParallaxEl>
      </section>

      {/* PAGE 3: KINETIC SHIFT */}
      <section className="h-[100vh] w-full flex items-center justify-center relative">
         <div className="absolute w-full h-[40vh] top-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#111111]/80 to-transparent backdrop-blur-sm z-0" />
         
         <ParallaxEl speed={2.0} className="absolute z-0 whitespace-nowrap text-center opacity-5">
            <div className="text-[30vw] font-sans font-bold tracking-tighter">KINETICS</div>
         </ParallaxEl>
         
         <ParallaxEl speed={-0.1} className="relative z-10 text-center max-w-xl mx-auto px-6">
             <div className="font-mono text-xs tracking-[0.5em] mb-4 text-white/50 border border-white/20 inline-block px-4 py-2">WARNING</div>
             <p className="font-sans text-xl leading-relaxed font-light">
               Rotational vectors are slowly deviating. The central lattice structure generates localized gravitational anomalies when observed directly.
             </p>
         </ParallaxEl>
      </section>

      {/* PAGE 4: DEEP TECH RIGHT */}
      <section className="h-[100vh] w-full flex flex-col justify-center items-end px-[8vw] md:px-[12vw]">
         <ParallaxEl speed={-0.4} className="max-w-[450px]">
           <div className="flex items-center justify-end gap-4 mb-6">
              <h3 className="font-mono text-xs text-white/60 tracking-widest">STRUCTURAL INT.</h3>
              <div className="w-12 h-[1px] bg-white text-white" />
           </div>
           
           <p className="font-sans text-right text-xl leading-relaxed text-white/80 mb-10">
             The flawless geometric exterior suppresses entropy perfectly.
           </p>

           {/* Vertical timeline detail */}
           <div className="space-y-6 font-mono text-xs tracking-widest relative">
              <div className="absolute right-[-1.5rem] top-2 w-[1px] h-[90%] bg-white/20" />

              <div className="flex justify-between items-start text-right relative">
                 <div className="absolute right-[-1.65rem] top-1 w-1 h-1 bg-white" />
                 <div className="opacity-40 w-1/3 text-left pl-4">00:01:45</div>
                 <div className="w-2/3">INITIALIZATION SEQUENCE COMPLETED</div>
              </div>
              <div className="flex justify-between items-start text-right relative opacity-60">
                 <div className="absolute right-[-1.65rem] top-1 w-1 h-1 bg-white/50" />
                 <div className="opacity-40 w-1/3 text-left pl-4">00:03:12</div>
                 <div className="w-2/3">CORE LATTICE STABILIZED</div>
              </div>
              <div className="flex justify-between items-start text-right relative opacity-30">
                 <div className="absolute right-[-1.65rem] top-1 w-1 h-1 bg-white/20" />
                 <div className="opacity-40 w-1/3 text-left pl-4">00:07:05</div>
                 <div className="w-2/3">TOROIDAL FLUX DETECTED</div>
              </div>
           </div>
         </ParallaxEl>
      </section>

      {/* PAGE 5: FOOTER */}
      <section className="h-[100vh] w-full flex flex-col items-center justify-end pb-[10vh] text-center">
         <ParallaxEl speed={-0.2}>
             <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="w-10 h-10 border border-white/40 rounded-full animate-[spin_4s_linear_infinite] border-t-transparent" />
                <div className="w-2 h-2 bg-white rounded-full absolute" />
             </div>
             
             <h2 className="text-4xl lg:text-6xl font-sans font-medium tracking-tight mb-4">
               SECURE ARCHIVE
             </h2>
             <p className="font-mono text-xs tracking-widest text-white/40 uppercase">DATA FEED TERMINATED</p>
         </ParallaxEl>
      </section>

    </div>
  );
}
