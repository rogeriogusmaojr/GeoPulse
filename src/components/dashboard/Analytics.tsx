import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { time: '08:00', reach: 45, conversions: 21 },
  { time: '10:00', reach: 82, conversions: 35 },
  { time: '12:00', reach: 140, conversions: 58 },
  { time: '14:00', reach: 110, conversions: 42 },
  { time: '16:00', reach: 180, conversions: 92 },
  { time: '18:00', reach: 240, conversions: 115 },
  { time: '20:00', reach: 210, conversions: 88 },
];

const categoryData = [
  { name: 'Loja A', value: 400 },
  { name: 'Loja B', value: 300 },
  { name: 'Loja C', value: 200 },
  { name: 'Loja D', value: 278 },
];

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

export default function Analytics({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
      <div className="bg-[#0E0E12] border border-[#1E293B] rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="font-serif italic text-[#E2E8F0]">Alcance de Audiência</h3>
            <p className="text-[9px] text-[#94A3B8] uppercase tracking-widest font-mono">Geofenced target performance</p>
          </div>
          <div className="px-2 py-0.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded text-[#3B82F6] text-[10px] font-bold">
            +24.5%
          </div>
        </div>
        
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0E0E12', 
                  border: '1px solid #1E293B',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#E2E8F0'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="reach" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorReach)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0E0E12] border border-[#1E293B] rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="font-serif italic text-[#E2E8F0]">Conversão por Localização</h3>
            <p className="text-[9px] text-[#94A3B8] uppercase tracking-widest font-mono">Store visit attribution</p>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: '#1E293B' }}
                contentStyle={{ 
                  backgroundColor: '#0E0E12', 
                  border: '1px solid #1E293B',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={32}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
