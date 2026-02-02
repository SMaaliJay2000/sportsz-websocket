import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Match } from "../types";

export function useMatches(limit = 10) {
  return useQuery({
    queryKey: ["matches", limit],
    queryFn: async () => {
      const { data } = await api.get<{ data: Match[] }>(`/matches?limit=${limit}`);
      return data.data;
    },
    refetchInterval: 30000, // Poll every 30s as fallback
  });
}
