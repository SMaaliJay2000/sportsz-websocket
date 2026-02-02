import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Match, Commentary } from "../types";

export function useMatchDetails(id?: string) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: async () => {
      if (!id) throw new Error("Match ID is required");
      const { data } = await api.get<{ data: Match }>(`/matches/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCommentaries(matchId?: string, limit = 50) {
  return useQuery({
    queryKey: ["commentaries", matchId],
    queryFn: async () => {
      if (!matchId) throw new Error("Match ID is required");
      const { data } = await api.get<{ data: Commentary[] }>(`/matches/${matchId}/commentary?limit=${limit}`);
      return data.data;
    },
    enabled: !!matchId,
  });
}
