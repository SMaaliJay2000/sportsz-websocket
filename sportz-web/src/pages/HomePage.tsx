import { AlertCircle, Loader2 } from "lucide-react";
import { useMatches } from "../hooks/useMatches";
import { MatchCard } from "../components/matches/MatchCard";

export function HomePage() {
  const { data: matches, isLoading, isError } = useMatches();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-zinc-500 animate-pulse">Loading matches...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-red-500">
        <AlertCircle className="w-8 h-8" />
        <p>Failed to load matches. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">Match Center</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {matches?.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      
      {matches?.length === 0 && (
         <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
            <p className="text-zinc-500">No matches found.</p>
         </div>
      )}
    </div>
  );
}
