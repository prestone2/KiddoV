
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Game {
  Id: string;
  Title: string | null;
  Developer: string | null;
  Description: string | null;
  Genres: any[] | null;
  Tags: any[] | null;
  created_at: string | null;
  creator_id: string | null;
}

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
