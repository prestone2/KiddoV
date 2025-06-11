
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Game {
  Id: string;
  Title: string | null;
  Developer: string | null;
  Description: string | null;
  Genres: any[] | null;
  Tags: any[] | null;
  Assets: any[] | null;
  GameURL: string | null;
  Gender: any[] | null;
  MobileReady: any[] | null;
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

// Hook to filter games
export const useFilteredGames = (genreFilter?: string, deviceFilter?: string, genderFilter?: string) => {
  return useQuery({
    queryKey: ['filteredGames', genreFilter, deviceFilter, genderFilter],
    queryFn: async () => {
      console.log('Fetching filtered games...');
      let query = supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching filtered games:', error);
        throw error;
      }

      // Client-side filtering for complex JSON array queries
      let filteredData = data || [];

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

      return filteredData as Game[];
    },
  });
};
