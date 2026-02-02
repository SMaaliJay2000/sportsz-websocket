import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Loader2, AlertCircle, Share2, Info } from "lucide-react";
import { useMatchDetails, useCommentaries } from "../hooks/useMatchDetails";
import { useSocket } from "../hooks/useSocket";
import { CommentaryItem } from "../components/matches/CommentaryItem";
import { cn } from "../lib/utils";

export function MatchPage() {
  const { id } = useParams<{ id: string }>();
  useSocket(id);
  const { data: match, isLoading: matchLoading, isError: matchError } = useMatchDetails(id);
  const { data: commentaries, isLoading: commsLoading } = useCommentaries(id);

  if (matchLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (matchError || !match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-red-500">
        <AlertCircle className="w-10 h-10" />
        <p>Match not found or failed to load.</p>
        <Link to="/" className="text-zinc-100 hover:text-emerald-500 underline">Go back home</Link>
      </div>
    );
  }

  const isLive = match.status === "live";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Matches</span>
        </Link>
        <div className="flex gap-4">
          <button className="p-2 transition-colors border border-zinc-800 hover:bg-zinc-900 rounded-lg text-zinc-400">
             <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 transition-colors border border-zinc-800 hover:bg-zinc-900 rounded-lg text-zinc-400">
             <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-10 shadow-2xl">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="text-center flex-1">
             <h2 className="text-3xl font-black text-white mb-4 tracking-tight uppercase text-zinc-100">{match.homeTeam}</h2>
             <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{match.homeScore}</div>
          </div>

          <div className="px-10 flex flex-col items-center gap-4">
            <div className={cn(
               "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border",
               isLive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"
            )}>
              {isLive ? (
                <span className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   Live
                </span>
              ) : match.status}
            </div>
            <div className="text-zinc-600 font-black text-2xl">VS</div>
          </div>

          <div className="text-center flex-1">
             <h2 className="text-3xl font-black text-white mb-4 tracking-tight uppercase text-zinc-100">{match.awayTeam}</h2>
             <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{match.awayScore}</div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-zinc-800/50 flex justify-center gap-8 text-xs font-medium text-zinc-500 uppercase tracking-widest">
           <span>{match.sport}</span>
           <span className="w-1 h-1 rounded-full bg-zinc-800 self-center" />
           <span>Premier League</span>
        </div>
      </div>

      {/* Commentary Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold text-zinc-100">Live Commentary</h3>
           <div className="text-xs font-medium text-zinc-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Auto-updating
           </div>
        </div>

        {commsLoading ? (
            <div className="flex justify-center py-20">
               <Loader2 className="w-6 h-6 text-zinc-700 animate-spin" />
            </div>
        ) : (
          <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800/50">
            {commentaries && commentaries.length > 0 ? (
               <div className="flex flex-col">
                  {commentaries.map((item) => (
                    <CommentaryItem key={item.id} item={item} />
                  ))}
               </div>
            ) : (
               <div className="text-center py-20 text-zinc-500 italic">
                  Waiting for commentary to start...
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
