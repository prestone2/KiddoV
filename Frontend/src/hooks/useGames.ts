import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface Game {
  Id: string;
  Title: string | null;
  Developer: string | null;
  Description: string | null;
  Genres: Json | null;
  Tags: Json | null;
  Assets: Json | null;
  GameURL: string | null;
  Gender: Json | null;
  MobileReady: Json | null;
  created_at: string | null;
  creator_id: string | null;
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

// New infinite query hook for lazy loading
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

// Hook to get unique genres from games
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      console.log('Fetching genres from database...');
      const { data, error } = await supabase
        .from('games')
        .select('Genres')
        .not('Genres', 'is', null);

      if (error) {
        console.error('Error fetching genres:', error);
        throw error;
      }

      // Extract unique genres from all games
      const allGenres = new Set<string>();
      data?.forEach(game => {
        if (game.Genres) {
          // Handle Json type properly - could be array or string
          let genres: any[] = [];
          if (Array.isArray(game.Genres)) {
            genres = game.Genres;
          } else if (typeof game.Genres === 'string') {
            try {
              genres = JSON.parse(game.Genres);
            } catch {
              genres = [game.Genres];
            }
          }
          
          genres.forEach(genre => {
            if (typeof genre === 'string') {
              allGenres.add(genre);
            } else if (genre && typeof genre === 'object' && genre.toString) {
              allGenres.add(String(genre));
            }
          });
        }
      });

      console.log('Extracted genres:', Array.from(allGenres));
      return Array.from(allGenres);
    },
  });
};

// Helper function to filter games
const filterGames = (games: Game[], genreFilter?: string, deviceFilter?: string, genderFilter?: string) => {
  let filteredData = games;

  if (genreFilter && genreFilter !== 'All Genres') {
    filteredData = filteredData.filter(game => {
      if (!game.Genres) return false;
      
      // Handle Json type properly
      let genres: any[] = [];
      if (Array.isArray(game.Genres)) {
        genres = game.Genres;
      } else if (typeof game.Genres === 'string') {
        try {
          genres = JSON.parse(game.Genres);
        } catch {
          genres = [game.Genres];
        }
      }
      
      return genres.some(genre => String(genre) === genreFilter);
    });
  }

  if (deviceFilter && deviceFilter !== 'All Devices') {
    filteredData = filteredData.filter(game => {
      if (deviceFilter === 'Mobile') {
        if (!game.MobileReady) return false;
        
        // Handle Json type properly
        let mobileReady: any[] = [];
        if (Array.isArray(game.MobileReady)) {
          mobileReady = game.MobileReady;
        } else if (typeof game.MobileReady === 'string') {
          try {
            mobileReady = JSON.parse(game.MobileReady);
          } catch {
            mobileReady = [game.MobileReady];
          }
        }
        
        return mobileReady.includes(true) || mobileReady.includes('true');
      }
      return true; // For PC/Console, we assume all games are compatible
    });
  }

  if (genderFilter && genderFilter !== 'All Genders') {
    filteredData = filteredData.filter(game => {
      if (!game.Gender) return false;
      
      // Handle Json type properly
      let genders: any[] = [];
      if (Array.isArray(game.Gender)) {
        genders = game.Gender;
      } else if (typeof game.Gender === 'string') {
        try {
          genders = JSON.parse(game.Gender);
        } catch {
          genders = [game.Gender];
        }
      }
      
      return genders.some(gender => String(gender) === genderFilter);
    });
  }

  return filteredData;
};

// Infinite query hook for filtered games - completely rewritten
export const useInfiniteFilteredGames = (genreFilter?: string, deviceFilter?: string, genderFilter?: string, pageSize: number = 12) => {
  return useInfiniteQuery({
    queryKey: ['filtered-games-infinite', genreFilter, deviceFilter, genderFilter, pageSize],
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
      const filteredGames = filterGames(allGames || [], genreFilter, deviceFilter, genderFilter);
      
      // Apply pagination to filtered results
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
