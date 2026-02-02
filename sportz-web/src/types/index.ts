export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Match {
  id: number;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  status: MatchStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Commentary {
  id: number;
  matchId: number;
  minute: number;
  sequence: number;
  period: string;
  eventType: string; // 'goal', 'card', 'substitution', etc.
  actor?: string;
  team?: string; // 'home' or 'away'
  message: string;
  metadata?: Record<string, any>;
  tags?: string[];
  createdAt: string;
}
