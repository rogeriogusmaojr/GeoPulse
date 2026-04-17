import { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Settings, 
  LayoutDashboard, 
  Search, 
  Maximize2, 
  Minimize2, 
  Map as MapIcon,
  BarChart3,
  Globe,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MapSection from './components/dashboard/MapSection';
import Analytics from './components/dashboard/Analytics';
import LiveFeed from './components/dashboard/LiveFeed';
import ClientsList from './components/dashboard/ClientsList';
import LandingPage from './components/LandingPage';
import { GeolocationData, Insight, Client } from './types';
import { cn } from './lib/utils';

// Simulation constants
const INITIAL_LOCATIONS: GeolocationData[] = [
  { id: '1', lat: -23.5505, lng: -46.6333, timestamp: '10:54', clientId: 'c-1001', status: 'active', deviceName: 'iPhone 15 Pro' },
  { id: '2', lat: -23.5605, lng: -46.6433, timestamp: '10:52', clientId: 'c-1002', status: 'active', deviceName: 'Samsung S24 Ultra' },
  { id: '3', lat: -23.5405, lng: -46.6233, timestamp: '10:50', clientId: 'c-1003', status: 'warning', deviceName: 'Google Pixel 8' },
  { id: '4', lat: -23.5705, lng: -46.6533, timestamp: '10:55', clientId: 'c-1004', status: 'active', deviceName: 'iPad Pro' },
];

const INITIAL_INSIGHTS: Insight[] = [
  { id: 'i1', type: 'growth', message: 'Aumento de 20% no tráfego geofenced em Pinheiros.', timestamp: '10:45' },
  { id: 'i2', type: 'info', message: 'Nova campanha ativada região da Av. Paulista.', timestamp: '10:30' },
  { id: 'i3', type: 'alert', message: 'Bateria baixa detectada no dispositivo c-1003.', timestamp: '10:15' },
];

export default function App() {
  const [view, setView] = useState<'landing' | 'platform'>('landing');
  const [locations, setLocations] = useState<GeolocationData[]>(INITIAL_LOCATIONS);
  const [insights, setInsights] = useState<Insight[]>(INITIAL_INSIGHTS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulation loop
  useEffect(() => {
    if (view !== 'platform') return;

    const interval = setInterval(() => {
      // Simulate small movements
      setLocations(prev => prev.map(loc => ({
        ...loc,
        lat: loc.lat + (Math.random() - 0.5) * 0.001,
        lng: loc.lng + (Math.random() - 0.5) * 0.001,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })));

      // Randomly add insights
      if (Math.random() > 0.8) {
        const types: Insight['type'][] = ['growth', 'alert', 'info'];
        const messages = [
          'Novo usuário entrou no perímetro da Loja A.',
          'Padrão de movimentação atípico detectado em Jardins.',
          'Taxa de conversão subiu 5% no setor Sul.',
          'Atividade de concorrente detectada próxima à unidade B.'
        ];
        const newInsight: Insight = {
          id: Math.random().toString(36).substr(2, 9),
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [view]);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('platform')} />;
  }

  const stats = [
    { label: 'Tráfego Total', value: '245.9k', trend: '+12.4%', icon: Globe, color: 'text-[#3B82F6]' },
    { label: 'Novos Clientes', value: '842', trend: '+5.2%', icon: Users, color: 'text-[#3B82F6]' },
    { label: 'Permanência Média', value: '18m', trend: '-2.1%', icon: Clock, color: 'text-[#3B82F6]' },
    { label: 'ROI Geográfico', value: '4.2x', trend: 'Meta atingida', icon: TrendingUp, color: 'text-[#3B82F6]' },
  ];

  return (
    <div className="flex h-screen bg-[#050506] text-[#E2E8F0] overflow-hidden selection:bg-[#3B82F6]/30">
      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "bg-[#0E0E12] border-r border-[#1E293B] transition-all duration-300 flex flex-col z-50",
          sidebarOpen ? "w-[240px]" : "w-20"
        )}
      >
        <div className="p-8 flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-8 h-8 rounded bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/30">
            <Globe className="text-[#3B82F6]" size={18} />
          </div>
          {sidebarOpen && <span className="font-serif italic text-2xl tracking-tighter text-[#3B82F6]">GeoPulse.</span>}
        </div>

        <nav className="flex-1 space-y-1 py-4">
          <NavItem icon={LayoutDashboard} label="Painel Geral" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={!sidebarOpen} />
          <NavItem icon={MapIcon} label="Monitoramento Live" active={activeTab === 'map'} onClick={() => setActiveTab('map')} collapsed={!sidebarOpen} />
          <NavItem icon={BarChart3} label="Zonas de Calor" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} collapsed={!sidebarOpen} />
          <NavItem icon={Users} label="Gestão de Clientes" active={activeTab === 'clients'} onClick={() => setActiveTab('clients')} collapsed={!sidebarOpen} />
          <div className="pt-8 mt-8 border-t border-[#1E293B]">
            <NavItem icon={Settings} label="Configurações" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} collapsed={!sidebarOpen} style={{ opacity: 0.5 }} />
          </div>
        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-[80px] border-b border-[#1E293B] bg-[#050506] flex items-center justify-between px-10 z-40">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
            >
              {sidebarOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <div className="header-title">
              <h1 className="font-serif text-xl font-normal text-[#E2E8F0]">
                Visão Operacional: <i className="text-[#94A3B8]">São Paulo Metropolitan</i>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
              Sincronização em tempo real ativa
            </div>
            
            <div className="w-px h-8 bg-[#1E293B]" />

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-[#E2E8F0]">Rogério Gusmão Jr.</span>
                <span className="text-[10px] text-[#94A3B8] font-mono tracking-widest uppercase">Admin</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#1E293B] hover:border-[#3B82F6]/50 transition-colors shadow-2xl cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
               key={activeTab}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="p-10 space-y-10"
            >
              
              {activeTab === 'dashboard' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="bg-[#0E0E12] border border-[#1E293B] p-6 rounded-lg group hover:border-[#3B82F6]/30 transition-colors">
                        <h4 className="text-[11px] uppercase tracking-[0.5px] text-[#94A3B8] mb-3">{stat.label}</h4>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-light text-[#E2E8F0] tracking-tight">{stat.value}</span>
                          <span className={cn(
                            "text-xs font-medium",
                            stat.trend.startsWith('+') ? "text-[#10B981]" : "text-[#EF4444]"
                          )}>
                            {stat.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    <div className="lg:col-span-2 h-full">
                      <MapSection locations={locations} className="h-full border-[#1E293B]" />
                    </div>
                    <div className="h-full">
                      <LiveFeed insights={insights} className="h-full border-[#1E293B]" />
                    </div>
                  </div>

                  <Analytics className="mt-10" />
                </>
              )}

              {activeTab === 'map' && (
                <div className="h-[calc(100vh-200px)]">
                  <MapSection locations={locations} className="h-full border-[#1E293B]" />
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-10">
                   <h2 className="font-serif text-2xl">Zonas de Calor e Tendências</h2>
                   <Analytics />
                </div>
              )}

              {activeTab === 'clients' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl">Gestão de Clientes</h2>
                  <ClientsList />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl bg-[#0E0E12] border border-[#1E293B] p-10 rounded-lg">
                  <h1 className="font-serif text-2xl mb-8">Configurações Operacionais</h1>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 border border-[#1E293B] rounded bg-[#050506] hover:border-[#3B82F6]/30 transition-colors">
                       <div>
                          <p className="text-sm font-medium text-[#E2E8F0]">Sincronização de Alta Precisão</p>
                          <p className="text-xs text-[#94A3B8]">Aumenta a frequência de ping dos dispositivos móveis.</p>
                       </div>
                       <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-[#1E293B] bg-[#0E0E12] text-[#3B82F6] focus:ring-[#3B82F6]" />
                    </div>
                    <div className="flex items-center justify-between p-6 border border-[#1E293B] rounded bg-[#050506] hover:border-[#3B82F6]/30 transition-colors">
                       <div>
                          <p className="text-sm font-medium text-[#E2E8F0]">Relatórios Mensais Automáticos</p>
                          <p className="text-xs text-[#94A3B8]">Gera PDFs consolidados no final de cada mês.</p>
                       </div>
                       <input type="checkbox" className="h-5 w-5 rounded border-[#1E293B] bg-[#0E0E12] text-[#3B82F6] focus:ring-[#3B82F6]" />
                    </div>
                  </div>
                  <button className="w-full mt-10 py-4 bg-[#3B82F6] hover:bg-[#2563EB] transition-colors rounded font-bold text-white uppercase tracking-widest text-[11px]">
                    Salvar Alterações
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, collapsed, style }: any) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(
        "w-full flex items-center gap-3 py-3 px-8 text-[13px] uppercase tracking-[1px] transition-all cursor-pointer border-l-2",
        active 
          ? "text-[#E2E8F0] border-[#3B82F6] bg-gradient-to-r from-[#3B82F6]/10 to-transparent" 
          : "text-[#94A3B8] hover:text-[#E2E8F0] border-transparent"
      )}
    >
      <Icon size={16} />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

function ArrowUpRight({ size = 16, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

function Clock({ size = 16, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
