
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  games: any[];
  profiles: any[];
}

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async (): Promise<SearchResult> => {
      if (!query || query.trim().length < 2) {
        return { games: [], profiles: [] };
      }

      console.log('Searching for:', query);

      // Search games by title, developer, or tags
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .or(`Title.ilike.%${query}%,Developer.ilike.%${query}%`)
        .limit(10);

      if (gamesError) {
        console.error('Error searching games:', gamesError);
      }

      // Also search games by tags (client-side filtering for JSON field)
      const { data: allGames, error: allGamesError } = await supabase
        .from('games')
        .select('*');

      let tagFilteredGames: any[] = [];
      if (!allGamesError && allGames) {
        tagFilteredGames = allGames.filter(game => {
          if (!game.Tags) return false;
          
          let tags: any[] = [];
          if (Array.isArray(game.Tags)) {
            tags = game.Tags;
          } else if (typeof game.Tags === 'string') {
            try {
              tags = JSON.parse(game.Tags);
            } catch {
              tags = [game.Tags];
            }
          }
          
          return tags.some(tag => 
            String(tag).toLowerCase().includes(query.toLowerCase())
          );
        });
      }

      // Search profiles by username or display_name
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(5);

      if (profilesError) {
        console.error('Error searching profiles:', profilesError);
      }

      // Combine and deduplicate games
      const allFoundGames = [...(games || []), ...tagFilteredGames];
      const uniqueGames = allFoundGames.filter((game, index, self) => 
        index === self.findIndex(g => g.Id === game.Id)
      ).slice(0, 10);

      console.log('Search results:', { games: uniqueGames, profiles: profiles || [] });

      return {
        games: uniqueGames,
        profiles: profiles || []
      };
    },
    enabled: query.trim().length >= 2,
  });
};
