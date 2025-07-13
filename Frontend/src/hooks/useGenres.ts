
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
