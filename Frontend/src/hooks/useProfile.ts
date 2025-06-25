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
  subscription_status: string | null;
  subscription_plan_id: string | null;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export type UpdateProfileInput = {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
  robux_balance?: number;
};

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
    refetchInterval: 30000, // Refetch every 30 seconds to catch subscription updates
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: true, // Always refetch when component mounts
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateProfileInput) => {
      const { user } = useAuth();
      if (!user) throw new Error('User not authenticated');
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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

export async function updateUserSubscriptionAndBalance({
  userId,
  subscriptionStatus,
  subscriptionPlanId,
  subscriptionExpiresAt,
  robuxBalance,
}: {
  userId: string;
  subscriptionStatus: string;
  subscriptionPlanId: string;
  subscriptionExpiresAt: string;
  robuxBalance: number;
}) {
  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_status: subscriptionStatus,
      subscription_plan_id: subscriptionPlanId,
      subscription_expires_at: subscriptionExpiresAt,
      robux_balance: robuxBalance,
    })
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }
}

// Example usage within a component or a function
const SomeComponent = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleSubscriptionUpdate = async (planId: string, expiresAt: string, newBalance: number) => {
    if (!user?.id) return;

    await updateUserSubscriptionAndBalance({
      userId: user.id,
      subscriptionStatus: 'active',
      subscriptionPlanId: planId,
      subscriptionExpiresAt: expiresAt,
      robuxBalance: newBalance,
    });

    // Optionally, refetch the profile to update UI
    queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
  };

  return null;
};
