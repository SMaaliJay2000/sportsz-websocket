import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
            <Trophy className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="font-bold text-lg text-zinc-100 tracking-tight">
            Sportz<span className="text-emerald-500">Live</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-emerald-500 transition-colors">
            Live Scores
          </Link>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-emerald-500 transition-colors">
            Schedule
          </a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-emerald-500 transition-colors">
            News
          </a>
        </div>
      </div>
    </nav>
  );
}
