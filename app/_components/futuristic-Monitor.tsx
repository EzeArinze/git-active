import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DataNodes } from "./data-nodes";

export function FuturisticMonitor() {
  return (
    <div className="w-full aspect-4/3 rounded-4xl bg-[#030712] overflow-hidden relative shadow-2xl border border-primary/20 ring-1 ring-white/10">
      <Canvas camera={{ position: [0, 2, 9], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <DataNodes />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
      
      {/* Overlay UI elements to look like a monitoring dashboard */}
      <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 text-[0.7rem] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          NETWORK STABLE
        </div>
        <div className="text-[0.65rem] text-zinc-400 font-mono tracking-wider">ACTIVE NODES: 14</div>
      </div>
      
      <div className="absolute bottom-5 right-5 text-right pointer-events-none">
        <div className="font-mono text-xs text-sky-400 tracking-widest">INTELLIGENCE_CORE</div>
        <div className="text-[0.65rem] text-zinc-500 font-mono uppercase mt-1">Ingesting GitHub webhooks...</div>
      </div>
    </div>
  );
}