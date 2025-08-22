
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from './useGames';
import { filterGames } from './useGameFilters';

// Infinite query hook for filtered games
export const useInfiniteFilteredGames = (genreFilter?: string, deviceFilter?: string, genderFilter?: string, pageSize: number = 12, sortType: string = 'popular') => {
  return useInfiniteQuery({
    queryKey: ['filtered-games-infinite', genreFilter, deviceFilter, genderFilter, pageSize, sortType],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching all games for filtering...');
      
      // Fetch all games first (we need to do client-side filtering due to JSON column complexity)
      const { data: allGames, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching games for filtering:', error);
        throw error;
      }

      // Apply filters
      let filteredGames = filterGames(allGames || [], genreFilter, deviceFilter, genderFilter);
      
      // Apply sorting based on sortType
      switch (sortType) {
        case 'recommended':
          // Shuffle the filtered games
          filteredGames = [...filteredGames].sort(() => Math.random() - 0.5);
          break;
        case 'top-rated':
          // Sort by title alphabetically
          filteredGames = [...filteredGames].sort((a, b) => (a.Title || '').localeCompare(b.Title || ''));
          break;
        case 'featured':
          // Sort by premium first, then by creation date
          filteredGames = [...filteredGames].sort((a, b) => {
            if (a.is_premium && !b.is_premium) return -1;
            if (!a.is_premium && b.is_premium) return 1;
            return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
          });
          break;
        default: // 'popular'
          // Keep original order (already sorted by created_at desc)
          break;
      }
      
      // Apply pagination to filtered and sorted results
      const startIndex = pageParam * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedGames = filteredGames.slice(startIndex, endIndex);
      
      console.log(`Filtered games: ${filteredGames.length}, Page ${pageParam}: ${paginatedGames.length} games`);

      return {
        games: paginatedGames,
        nextCursor: endIndex < filteredGames.length ? pageParam + 1 : undefined,
        totalCount: filteredGames.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

// Hook to filter games (kept for backwards compatibility)
export const useFilteredGames = (genreFilter?: string, deviceFilter?: string, genderFilter?: string) => {
  return useQuery({
    queryKey: ['filteredGames', genreFilter, deviceFilter, genderFilter],
    queryFn: async () => {
      console.log('Fetching games for filtering...');
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching games for filtering:', error);
        throw error;
      }

      return filterGames(data || [], genreFilter, deviceFilter, genderFilter);
    },
  });
};
