import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import type { Match, MatchStatus } from "../../types";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

const statusColors: Record<MatchStatus, string> = {
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse",
  finished: "bg-zinc-800 text-zinc-400 border-zinc-700",
};

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === "live";

  return (
    <Link 
      to={`/match/${match.id}`}
      className="block group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4">
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border", statusColors[match.status])}>
          {match.status}
        </span>
      </div>

      <div className="mt-2 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-between w-full max-w-md">
          <div className="text-center w-1/3">
            <h3 className="text-xl font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">{match.homeTeam}</h3>
            <span className="text-4xl font-black text-zinc-100">{match.homeScore}</span>
          </div>

          <div className="text-center w-1/3 flex flex-col items-center gap-2">
            <span className="text-zinc-500 text-sm font-medium uppercase tracking-widest">VS</span>
            {isLive && (
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>

          <div className="text-center w-1/3">
            <h3 className="text-xl font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">{match.awayTeam}</h3>
            <span className="text-4xl font-black text-zinc-100">{match.awayScore}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between text-zinc-500 text-sm">
        <div className="flex items-center gap-2">
           <Calendar className="w-4 h-4" />
           {format(new Date(match.startTime), "MMM d, yyyy")}
        </div>
        <div className="flex items-center gap-2">
           <Clock className="w-4 h-4" />
           {format(new Date(match.startTime), "HH:mm")}
        </div>
         <span className="uppercase text-xs font-bold tracking-widest text-zinc-600">{match.sport}</span>
      </div>
    </Link>
  );
}
