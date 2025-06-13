
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('game_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }

      return data?.map(fav => fav.game_id) || [];
    },
    enabled: !!user,
  });

  const addFavorite = useMutation({
    mutationFn: async (gameId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_favorites')
        .insert([{
          user_id: user.id,
          game_id: gameId
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Added to favorites",
        description: "Game has been added to your favorites!",
      });
    },
    onError: (error) => {
      console.error('Error adding favorite:', error);
      toast({
        title: "Error",
        description: "Failed to add game to favorites.",
        variant: "destructive",
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (gameId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('game_id', gameId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Removed from favorites",
        description: "Game has been removed from your favorites.",
      });
    },
    onError: (error) => {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "Failed to remove game from favorites.",
        variant: "destructive",
      });
    },
  });

  const isFavorite = (gameId: string) => {
    return favorites?.includes(gameId) || false;
  };

  return {
    favorites,
    isLoading,
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    isFavorite,
    isAddingFavorite: addFavorite.isPending,
    isRemovingFavorite: removeFavorite.isPending,
  };
};
