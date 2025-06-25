
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useSubscriptionPlans, useCreateSubscription, useUserSubscription } from '@/hooks/useSubscriptions';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const SubscriptionPlans = () => {
  const { user } = useAuth();
  const { data: plans, isLoading: plansLoading } = useSubscriptionPlans();
  const { data: userSubscription } = useUserSubscription();
  const createSubscription = useCreateSubscription();

  const handleSubscribe = (planId: string) => {
    if (!user?.email) return;
    createSubscription.mutate({ planId, email: user.email });
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic': return <Star className="w-6 h-6" />;
      case 'premium': return <Crown className="w-6 h-6" />;
      case 'pro': return <Zap className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic': return 'border-blue-200 bg-blue-50';
      case 'premium': return 'border-purple-200 bg-purple-50';
      case 'pro': return 'border-gold-200 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300';
      default: return 'border-gray-200';
    }
  };

  if (plansLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative">
            <CardHeader>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans?.map((plan, index) => {
        const isCurrentPlan = userSubscription?.plan_id === plan.id;
        const isPopular = index === 1; // Premium is popular
        
        return (
          <Card 
            key={plan.id} 
            className={`relative ${getPlanColor(plan.name)} ${isPopular ? 'ring-2 ring-purple-500 transform scale-105' : ''}`}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            {isCurrentPlan && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-500 text-white">
                  Current Plan
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2 text-gray-700">
                {getPlanIcon(plan.name)}
              </div>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-gray-900">
                KSH {plan.price_ksh}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <div className="text-lg font-semibold text-roblox-blue">
                {plan.robux_monthly.toLocaleString()} kiddocash/month
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {Array.isArray(plan.features) ? plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                )) : (
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Premium features included</span>
                  </li>
                )}
              </ul>

              <Button
                className={`w-full ${
                  isCurrentPlan 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : plan.name.toLowerCase() === 'pro' 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
                      : 'bg-roblox-blue hover:bg-roblox-blue/90'
                } text-white`}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrentPlan || createSubscription.isPending || !user}
              >
                {isCurrentPlan 
                  ? 'Current Plan' 
                  : createSubscription.isPending 
                    ? 'Processing...' 
                    : `Subscribe to ${plan.name}`
                }
              </Button>

              {!user && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Please log in to subscribe
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;
