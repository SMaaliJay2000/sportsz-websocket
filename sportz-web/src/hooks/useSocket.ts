import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Commentary } from '../types';

const WS_URL = 'ws://localhost:8000/ws';

export function useSocket(matchId?: string) {
  const queryClient = useQueryClient();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to WebSocket');
      if (matchId) {
        // Example: logic to subscribe to a specific match if backend supports it
        // socket.send(JSON.stringify({ type: 'subscribe', matchId }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const { type, payload } = message;

        if (type === 'MATCH_CREATED') {
          queryClient.invalidateQueries({ queryKey: ['matches'] });
        }

        if (type === 'COMMENTARY_ADDED') {
          const commentary = payload as Commentary;
          
          // Update commentaries list for this match
          queryClient.setQueryData(['commentaries', String(commentary.matchId)], (old: Commentary[] | undefined) => {
            if (!old) return [commentary];
            // Prepend or append based on logic (usually prepend for new comments)
            return [commentary, ...old];
          });

          // Also invalidate match details to get new score if commentary was a goal
          if (commentary.eventType === 'goal') {
             queryClient.invalidateQueries({ queryKey: ['match', String(commentary.matchId)] });
             queryClient.invalidateQueries({ queryKey: ['matches'] });
          }
        }
      } catch (err) {
        console.error('WS Message Error:', err);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      socket.close();
    };
  }, [queryClient, matchId]);

  return socketRef.current;
}
