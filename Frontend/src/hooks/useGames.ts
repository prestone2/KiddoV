
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface Game {
  Id: string;
  Title: string | null;
  Developer: string | null;
  Description: string | null;
  KeyFeatures: string | null;
  Instructions: string | null;
  Genres: Json | null;
  Tags: Json | null;
  Assets: Json | null;
  GameURL: string | null;
  Gender: Json | null;
  MobileReady: Json | null;
  created_at: string | null;
  creator_id: string | null;
  is_premium: boolean | null;
}

// Original hook for backwards compatibility
export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      console.log('Fetching games from database...');
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching games:', error);
        throw error;
      }

      console.log('Fetched games:', data);
      return data as Game[];
    },
  });
};
