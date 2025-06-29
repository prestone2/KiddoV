
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_ksh: number;
  robux_monthly: number;
  features: string[];
  paystack_plan_code: string | null;
  is_active: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  subscription_plans: SubscriptionPlan;
}

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      console.log('Fetching subscription plans...');
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_ksh', { ascending: true });

      if (error) {
        console.error('Error fetching subscription plans:', error);
        throw error;
      }
      console.log('Subscription plans fetched:', data);
      return data as SubscriptionPlan[];
    },
  });
};

export const useUserSubscription = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID, skipping subscription fetch');
        return null;
      }
      
      console.log('Fetching user subscription for:', user.id);
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Error fetching user subscription:', error);
        throw error;
      }
      
      console.log('User subscription data:', data);
      return data as UserSubscription | null;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

export const useCreateSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, email }: { planId: string; email: string }) => {
      if (!user?.id) throw new Error('User not authenticated');

      console.log('Creating subscription for plan:', planId);
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { planId, email },
      });

      if (error) {
        console.error('Subscription creation error:', error);
        throw error;
      }
      console.log('Subscription creation response:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Redirecting to payment URL:', data.authorization_url);
      // Redirect to Paystack payment page
      window.location.href = data.authorization_url;
    },
    onError: (error: any) => {
      console.error('Payment initialization failed:', error);
      toast({
        title: "Payment initialization failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCancelSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      console.log('Cancelling subscription for user:', user.id);
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) {
        console.error('Subscription cancellation error:', error);
        throw error;
      }
      console.log('Subscription cancelled successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled successfully.",
      });
    },
    onError: (error: any) => {
      console.error('Cancellation failed:', error);
      toast({
        title: "Cancellation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
