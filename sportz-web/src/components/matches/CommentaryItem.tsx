import type { Commentary } from "../../types";
import { format } from "date-fns";
import { Goal, Award, Repeat, MessageSquare, AlertCircle } from "lucide-react";

interface CommentaryItemProps {
  item: Commentary;
}

const eventIcons: Record<string, any> = {
  goal: <Goal className="w-4 h-4 text-emerald-500" />,
  card: <Award className="w-4 h-4 text-yellow-500" />,
  sub: <Repeat className="w-4 h-4 text-blue-500" />,
  comment: <MessageSquare className="w-4 h-4 text-zinc-500" />,
  incident: <AlertCircle className="w-4 h-4 text-red-500" />,
};

export function CommentaryItem({ item }: CommentaryItemProps) {
  const Icon = eventIcons[item.eventType] || eventIcons.comment;

  return (
    <div className="relative pl-8 pb-8 last:pb-0 border-l border-zinc-800 ml-2 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="absolute left-[-9px] top-0 p-1 bg-zinc-950 border border-zinc-800 rounded-full z-10">
        {Icon}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded leading-none italic">
            {item.minute}'
          </span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            {item.period}
          </span>
          <span className="text-[10px] font-medium text-zinc-600 ml-auto">
            {format(new Date(item.createdAt), "HH:mm:ss")}
          </span>
        </div>
        
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl mt-2 group hover:border-zinc-700 transition-colors">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {item.actor && <span className="font-bold text-zinc-100 mr-2">{item.actor}:</span>}
            {item.message}
          </p>
          
          {item.metadata?.assist && (
            <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1">
              <span className="font-medium text-zinc-400">Assist:</span> {item.metadata.assist}
            </div>
          )}
          
          {item.tags && item.tags.length > 0 && (
             <div className="mt-3 flex gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 uppercase font-bold tracking-tighter">
                    #{tag}
                  </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
