import { Insight } from '@/types';
import { cn } from '@/lib/utils';
import { Activity, Bell, Info, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const icons = {
  growth: <Activity className="text-emerald-500" size={14} />,
  alert: <AlertTriangle className="text-[#3B82F6]" size={14} />,
  info: <Info className="text-[#3B82F6]" size={14} />,
};

interface LiveFeedProps {
  insights: Insight[];
  className?: string;
}

export default function LiveFeed({ insights, className }: LiveFeedProps) {
  return (
    <div className={cn("bg-[#0E0E12] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col", className)}>
      <div className="p-5 border-b border-[#1E293B] bg-[#0E0E12]/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-[#3B82F6]" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#E2E8F0]">Live Insights</h3>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <AnimatePresence initial={false}>
          {insights.map((insight) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={insight.id}
              className="p-4 bg-[#050506] border border-[#1E293B] rounded group hover:border-[#3B82F6]/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{icons[insight.type]}</div>
                <div className="flex-1">
                  <p className="text-xs text-[#E2E8F0] leading-relaxed italic font-serif tracking-tight">{insight.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[9px] font-mono text-[#94A3B8] uppercase">{insight.timestamp}</span>
                    <button className="text-[9px] font-bold text-[#3B82F6] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      Details <ArrowUpRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-[#050506]/50 border-t border-[#1E293B]">
        <button className="w-full py-2 text-[10px] font-bold text-[#94A3B8] hover:text-[#E2E8F0] uppercase tracking-widest transition-colors">
          Clear History
        </button>
      </div>
    </div>
  );
}
