
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, RefreshCw } from 'lucide-react';
import { useUserSubscription } from '@/hooks/useSubscriptions';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { format } from 'date-fns';

const SubscriptionStatus = () => {
  const { data: subscription, isLoading, refetch } = useUserSubscription();
  const { data: profile } = useProfile();
  const { hasPremiumAccess, subscriptionStatus } = usePremiumAccess();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [now, setNow] = useState(Date.now());

  // Update current time for real-time expiry detection
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-refresh subscription status every 30 seconds for better responsiveness
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing subscription data...');
      refetch();
      // Also refresh profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    }, 30000);

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

  // Use the premium access hook for accurate expiry-aware status
  const hasActiveSubscription = hasPremiumAccess;
  const subscriptionPlan = subscription?.subscription_plans || null;
  
  // Check if subscription is expired but status hasn't updated yet
  const isExpired = () => {
    const nowDate = new Date(now);
    if (subscription?.current_period_end) {
      return new Date(subscription.current_period_end) <= nowDate;
    }
    if (profile?.subscription_expires_at) {
      return new Date(profile.subscription_expires_at) <= nowDate;
    }
    return false;
  };

  if (!hasActiveSubscription) {
    const wasExpired = isExpired();
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
            <p className="text-gray-600 mb-4">
              {wasExpired ? 'Your subscription has expired' : 'You don\'t have an active subscription'}
            </p>
            <Badge variant={wasExpired ? "destructive" : "outline"}>
              {wasExpired ? 'Expired' : 'Free Plan'}
            </Badge>
            <p className="text-sm text-gray-500 mt-2">
              {wasExpired 
                ? 'Please renew your subscription to continue accessing premium features.'
                : 'If you just made a payment, please wait a moment for it to process and click refresh.'
              }
            </p>
            {(subscription?.current_period_end || profile?.subscription_expires_at) && (
              <p className="text-xs text-gray-400 mt-2">
                Expired: {format(new Date(subscription?.current_period_end || profile?.subscription_expires_at!), 'MMM dd, yyyy HH:mm')}
              </p>
            )}
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
            <Badge className="bg-green-500">
              {subscriptionStatus === 'active' ? 'Active' : 'Free'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscriptionPlan ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Plan:</span>
              <Badge variant="outline" className="font-semibold">
                {subscriptionPlan.name}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly Robux:</span>
              <span className="font-semibold text-roblox-blue">
                {subscriptionPlan.robux_monthly.toLocaleString()} R$
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly Cost:</span>
              <span className="font-semibold">
                KSH {subscriptionPlan.price_ksh}
              </span>
            </div>

            {subscription?.current_period_end && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(subscription.current_period_end) > new Date(now) ? 'Next Billing:' : 'Expired:'}
                </span>
                <span className={`font-semibold ${new Date(subscription.current_period_end) <= new Date(now) ? 'text-red-500' : ''}`}>
                  {format(new Date(subscription.current_period_end), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <Badge className="bg-green-500">Active Subscription</Badge>
            <p className="text-sm text-gray-600 mt-2">
              Premium features are available
            </p>
            {profile?.subscription_expires_at && (
              <p className={`text-xs mt-1 ${new Date(profile.subscription_expires_at) <= new Date(now) ? 'text-red-500' : 'text-gray-500'}`}>
                {new Date(profile.subscription_expires_at) > new Date(now) ? 'Expires:' : 'Expired:'} {format(new Date(profile.subscription_expires_at), 'MMM dd, yyyy HH:mm')}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
