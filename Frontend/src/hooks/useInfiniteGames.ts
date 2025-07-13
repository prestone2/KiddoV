
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from './useGames';

// Infinite query hook for lazy loading
export const useInfiniteGames = (pageSize: number = 12) => {
  return useInfiniteQuery({
    queryKey: ['games-infinite', pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`Fetching games page ${pageParam} with size ${pageSize}...`);
      const { data, error, count } = await supabase
        .from('games')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (error) {
        console.error('Error fetching games:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length} games for page ${pageParam}`);
      return {
        games: data as Game[],
        nextCursor: data && data.length === pageSize ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
