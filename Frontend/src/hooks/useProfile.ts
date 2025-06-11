
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  robux_balance: number | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      console.log('Fetching user profile for ID:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      console.log('Fetched profile:', data);
      return data as UserProfile;
    },
    enabled: !!user?.id,
  });
};

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook to get user's favorite games (mock for now)
export const useFavoriteGames = () => {
  return useQuery({
    queryKey: ['favoriteGames'],
    queryFn: async () => {
      // This would typically fetch from a user_favorites table
      // For now, return a subset of games as favorites
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .limit(6);

      if (error) throw error;
      return data;
    },
  });
};

// Hook to get user's created games (mock for now)
export const useCreatedGames = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['createdGames', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('creator_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
};
