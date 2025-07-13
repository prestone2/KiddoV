
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';
import { useUserSubscription } from './useSubscriptions';

export const usePremiumAccess = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: subscription } = useUserSubscription();

  const hasPremiumAccess = () => {
    if (!user) return false;
    
    console.log('Checking premium access:', {
      user: !!user,
      profile: !!profile,
      subscription: !!subscription,
      subscriptionStatus: subscription?.status,
      profileSubscriptionStatus: profile?.subscription_status
    });
    
    // Check if user has an active subscription via the subscription table
    if (subscription && subscription.status === 'active') {
      console.log('Access granted via active subscription');
      return true;
    }
    
    // Fallback: Check profile subscription status
    if (profile?.subscription_status === 'active') {
      console.log('Access granted via profile subscription status');
      return true;
    }
    
    // Additional check: if subscription expires in the future
    if (profile?.subscription_expires_at) {
      const expiryDate = new Date(profile.subscription_expires_at);
      const now = new Date();
      if (expiryDate > now) {
        console.log('Access granted via subscription expiry date');
        return true;
      }
    }
    
    console.log('Premium access denied');
    return false;
  };

  return {
    hasPremiumAccess: hasPremiumAccess(),
    isAuthenticated: !!user,
    subscriptionStatus: subscription?.status || profile?.subscription_status || 'free',
    subscription: subscription,
    profile: profile
  };
};
