
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, CreditCard, RefreshCw } from 'lucide-react';
import { useUserSubscription, useCancelSubscription } from '@/hooks/useSubscriptions';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const SubscriptionStatus = () => {
  const { data: subscription, isLoading, refetch } = useUserSubscription();
  const cancelSubscription = useCancelSubscription();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Auto-refresh subscription status every 10 seconds for better responsiveness
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing subscription data...');
      refetch();
      // Also refresh profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch, queryClient, user?.id]);

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    refetch();
    queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2" />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Subscription Status
            </span>
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">You don't have an active subscription</p>
            <Badge variant="outline">Free Plan</Badge>
            <p className="text-sm text-gray-500 mt-2">
              If you just made a payment, please wait a moment for it to process.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Crown className="w-5 h-5 mr-2" />
            Subscription Status
          </span>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500">Active</Badge>
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Plan:</span>
          <Badge variant="outline" className="font-semibold">
            {subscription.subscription_plans.name}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Monthly Robux:</span>
          <span className="font-semibold text-roblox-blue">
            {subscription.subscription_plans.robux_monthly.toLocaleString()} R$
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Monthly Cost:</span>
          <span className="font-semibold">
            KSH {subscription.subscription_plans.price_ksh}
          </span>
        </div>

        {subscription.current_period_end && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Next Billing:
            </span>
            <span className="font-semibold">
              {format(new Date(subscription.current_period_end), 'MMM dd, yyyy')}
            </span>
          </div>
        )}

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => cancelSubscription.mutate()}
            disabled={cancelSubscription.isPending}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {cancelSubscription.isPending ? 'Cancelling...' : 'Cancel Subscription'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
