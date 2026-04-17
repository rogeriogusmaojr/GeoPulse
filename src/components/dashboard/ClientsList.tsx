import { Client } from '@/types';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Search, Filter, ShieldCheck, Clock, MapPin } from 'lucide-react';

const mockClients: Client[] = [
  { id: '1', name: 'Alvaro Souza', company: 'Logística Express', email: 'alvaro@express.com', status: 'online', joinedDate: '12 Out 2025', category: 'logistics' },
  { id: '2', name: 'Maria Helena', company: 'Moda & Estilo', email: 'helena@moda.com', status: 'offline', joinedDate: '05 Nov 2025', category: 'retail' },
  { id: '3', name: 'Ricardo Santos', company: 'TechSolutions', email: 'ricardo@tech.io', status: 'online', joinedDate: '20 Jan 2026', category: 'tech' },
  { id: '4', name: 'Fernanda Lima', company: 'Gourmet Delivery', email: 'fernanda@gourmet.br', status: 'online', joinedDate: '15 Fev 2026', category: 'services' },
];

export default function ClientsList({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[#0E0E12] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col shadow-2xl", className)}>
      <div className="p-6 border-b border-[#1E293B] flex justify-between items-center bg-[#0E0E12]/50">
        <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#E2E8F0]">Gestão de Clientes</h3>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={12} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-[#050506] border border-[#1E293B] rounded px-3 py-1.5 pl-8 text-[10px] text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>
          <button className="p-2 hover:border-[#3B82F6]/50 border border-[#1E293B] rounded text-[#94A3B8] transition-colors">
            <Filter size={14} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#050506] text-[10px] uppercase font-bold text-[#94A3B8] font-mono tracking-[1px]">
              <th className="px-8 py-4">Ficha do Cliente</th>
              <th className="px-8 py-4">Conectividade</th>
              <th className="px-8 py-4">Vertical</th>
              <th className="px-8 py-4">Desde</th>
              <th className="px-8 py-4">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {mockClients.map((client) => (
              <tr key={client.id} className="hover:bg-[#1E293B]/20 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#3B82F6] border border-[#1E293B]">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-serif italic text-[#E2E8F0]">{client.name}</p>
                      <p className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-tighter">{client.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                      client.status === 'online' ? "bg-[#10B981] shadow-[#10B981]/50 animate-pulse" : "bg-zinc-700"
                    )} />
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      client.status === 'online' ? "text-[#10B981]" : "text-[#94A3B8]"
                    )}>
                      {client.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[9px] px-2 py-0.5 border border-[#1E293B] bg-[#050506] text-[#94A3B8] font-mono uppercase tracking-widest rounded">
                    {client.category}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1.5 text-[#94A3B8]">
                    <Clock size={12} />
                    <span className="text-xs">{client.joinedDate}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <button className="p-2 hover:bg-[#1E293B] rounded text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
