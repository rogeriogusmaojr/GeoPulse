import { motion } from 'motion/react';
import { Globe, MapPin, Target, Shield, ArrowRight, CheckCircle2, Map, Zap, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#050506] text-[#E2E8F0] selection:bg-[#3B82F6]/30 overflow-x-hidden font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3B82F6] blur-[200px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3B82F6] blur-[200px] rounded-full opacity-50" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#050506]/50 backdrop-blur-xl border-b border-[#1E293B] px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="text-[#3B82F6]" size={24} />
          <span className="font-serif italic text-2xl tracking-tighter text-[#E2E8F0]">GeoPulse.</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[2px] text-[#94A3B8]">
          <a href="#" className="hover:text-[#3B82F6] transition-colors">Tecnologia</a>
          <a href="#" className="hover:text-[#3B82F6] transition-colors">Soluções</a>
          <a href="#" className="hover:text-[#3B82F6] transition-colors">Impacto</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-[#E2E8F0] text-[#050506] px-8 py-2.5 rounded text-[11px] font-bold uppercase tracking-[1.5px] hover:bg-[#3B82F6] hover:text-white transition-all shadow-2xl active:scale-95"
        >
          Acessar Terminal
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-24 px-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-[#1E293B] bg-[#0E0E12] text-[#94A3B8] text-[9px] font-bold uppercase tracking-[3px]">
              <Target size={12} className="text-[#3B82F6]" /> Inteligência Geoespacial Corporativa
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-normal leading-[0.95] tracking-tight text-[#E2E8F0] max-w-4xl mx-auto">
              Decisões Estratégicas através da <span className="italic text-[#3B82F6]">Geolocalização</span>.
            </h1>
            
            <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              GeoPulse fornece infraestrutura de dados de alta precisão para monitoramento live, geofencing de elite e atribuição de visitas em escala global.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button 
                onClick={onStart}
                className="bg-[#3B82F6] text-white px-10 py-4 rounded text-[12px] font-bold uppercase tracking-[2px] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-[#2563EB] transition-all group active:scale-95"
              >
                Iniciar Monitoramento <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border border-[#1E293B] text-[#E2E8F0] px-10 py-4 rounded text-[12px] font-bold uppercase tracking-[2px] hover:bg-[#1E293B]/50 transition-all active:scale-95">
                Ver Documentação
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 border-y border-[#1E293B] bg-[#0E0E12]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-10">
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-light tracking-tight text-[#E2E8F0]">12.4M</h3>
            <p className="text-[10px] items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-zinc-500 uppercase tracking-[2px] font-bold">Eventos Diários</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-light tracking-tight text-[#E2E8F0]">4.2x</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[2px] font-bold">ROI Geográfico</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-light tracking-tight text-[#E2E8F0]">99.9%</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[2px] font-bold">Uptime Satelital</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-light tracking-tight text-[#E2E8F0]">&lt;0.5m</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[2px] font-bold">Precisão RTK</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Layers} 
              title="Cartografia Avançada" 
              description="Camadas de dados proprietárias para análise de densidade demográfica e tráfego orgânico em tempo real."
            />
            <FeatureCard 
              icon={Target} 
              title="Geofencing Preditivo" 
              description="Antecipe fluxos de tráfego e otimize campanhas de ativação em janelas de oportunidade geográfica."
            />
            <FeatureCard 
              icon={Shield} 
              title="Soberania de Dados" 
              description="Infraestrutura dedicada com criptografia de ponta a ponta para gestão de frotas e ativos críticos."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-[#1E293B] px-10 bg-[#050506]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
             <Globe className="text-[#3B82F6]" size={20} />
             <span className="font-serif italic text-xl text-[#E2E8F0]">GeoPulse.</span>
          </div>
          <p className="text-[#94A3B8] text-[11px] font-medium tracking-[0.5px]">© 2026 GEOPULSE TECHNOLOGIES. LONDON / SÃO PAULO.</p>
          <div className="flex gap-10 text-[10px] uppercase tracking-[2px] font-bold text-[#94A3B8]">
             <a href="#" className="hover:text-[#3B82F6] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#3B82F6] transition-colors">Terms</a>
             <a href="#" className="hover:text-[#3B82F6] transition-colors">Enterprise</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-10 rounded-lg bg-[#0E0E12] border border-[#1E293B] hover:border-[#3B82F6]/50 transition-all group">
      <div className="w-12 h-12 rounded bg-[#050506] border border-[#1E293B] flex items-center justify-center mb-10 text-[#3B82F6] group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-serif italic text-[#E2E8F0] mb-4">{title}</h3>
      <p className="text-[#94A3B8] leading-relaxed text-sm font-light">
        {description}
      </p>
    </div>
  );
}
