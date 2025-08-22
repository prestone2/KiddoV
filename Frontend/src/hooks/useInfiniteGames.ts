
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from './useGames';

// Infinite query hook for lazy loading
export const useInfiniteGames = (pageSize: number = 12, sortType: string = 'popular') => {
  return useInfiniteQuery({
    queryKey: ['games-infinite', pageSize, sortType],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`Fetching games page ${pageParam} with size ${pageSize} for ${sortType}...`);
      
      let query = supabase
        .from('games')
        .select('*', { count: 'exact' });

      // Apply different sorting based on sortType
      switch (sortType) {
        case 'recommended':
          // For recommended, we'll fetch all games and shuffle them
          const { data: allData, error: allError, count: allCount } = await query;
          
          if (allError) {
            console.error('Error fetching games:', allError);
            throw allError;
          }

          // Shuffle the games array
          const shuffledGames = [...(allData || [])].sort(() => Math.random() - 0.5);
          
          // Apply pagination to shuffled results
          const startIndex = pageParam * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedGames = shuffledGames.slice(startIndex, endIndex);

          return {
            games: paginatedGames as Game[],
            nextCursor: endIndex < shuffledGames.length ? pageParam + 1 : undefined,
            totalCount: allCount || 0,
          };

        case 'top-rated':
          // For top-rated, sort by title alphabetically (you can change this to a rating field when available)
          query = query.order('Title', { ascending: true });
          break;

        case 'featured':
          // Featured games - sort by is_premium first, then by creation date
          query = query.order('is_premium', { ascending: false }).order('created_at', { ascending: false });
          break;

        default: // 'popular'
          query = query.order('created_at', { ascending: false });
          break;
      }

      // For non-recommended sorts, use standard pagination
      if (sortType !== 'recommended') {
        const { data, error, count } = await query.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

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
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
