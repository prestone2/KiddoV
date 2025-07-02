
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Game } from '@/hooks/useGames';

export interface GameHistoryEntry {
  id: string;
  user_id: string;
  game_id: string;
  played_at: string;
  created_at: string;
  game?: Game;
}

export const useRecentGames = (limit: number = 6) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['recentGames', user?.id, limit],
    queryFn: async () => {
      if (!user?.id) return [];
      
      console.log('Fetching recent games for user:', user.id);
      
      // Try to use the RPC function first, but handle the case where it might not exist
      try {
        const { data, error } = await supabase.rpc('get_recent_games' as any, {
          user_id_param: user.id,
          limit_param: limit
        });

        if (error) {
          console.error('RPC function error:', error);
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error('Error with RPC function, falling back to direct query:', error);
        
        // Fallback to direct query
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('user_game_history')
          .select('*')
          .eq('user_id', user.id)
          .order('played_at', { ascending: false })
          .limit(limit);

        if (fallbackError) {
          console.error('Fallback query error:', fallbackError);
          return [];
        }

        // For each history entry, fetch the game data separately
        const historyWithGames = await Promise.all(
          (fallbackData || []).map(async (entry: any) => {
            const { data: gameData } = await supabase
              .from('games')
              .select('*')
              .eq('Id', entry.game_id)
              .single();

            return {
              ...entry,
              game: gameData
            };
          })
        );

        return historyWithGames as GameHistoryEntry[];
      }
    },
    enabled: !!user?.id,
  });
};

export const useAddToGameHistory = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gameId: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      console.log('Adding game to history:', gameId, 'for user:', user.id);

      // Check if the game was already played recently (within last hour)
      try {
        const { data: existing, error: checkError } = await supabase
          .from('user_game_history')
          .select('id')
          .eq('user_id', user.id)
          .eq('game_id', gameId)
          .gte('played_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST118') {
          console.error('Error checking existing game history:', checkError);
          throw checkError;
        }

        // Check if we have valid data and it has an id property
        if (existing && typeof existing === 'object' && 'id' in existing && existing.id) {
          console.log('Updating existing game history entry');
          // Update the existing entry's played_at time
          const { error: updateError } = await supabase
            .from('user_game_history')
            .update({ played_at: new Date().toISOString() })
            .eq('id', existing.id);

          if (updateError) {
            console.error('Error updating game history:', updateError);
            throw updateError;
          }
        } else {
          console.log('Creating new game history entry');
          // Create a new entry
          const { error: insertError } = await supabase
            .from('user_game_history')
            .insert({
              user_id: user.id,
              game_id: gameId,
              played_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error inserting game history:', insertError);
            throw insertError;
          }
        }
      } catch (error) {
        console.error('Error with game history operation:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Successfully added/updated game history');
      queryClient.invalidateQueries({ queryKey: ['recentGames', user?.id] });
    },
    onError: (error) => {
      console.error('Failed to add game to history:', error);
    },
  });
};
