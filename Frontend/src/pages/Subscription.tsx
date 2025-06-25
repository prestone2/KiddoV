
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const Subscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Check for payment success in URL parameters
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated. Your Robux balance will be updated shortly.",
        duration: 5000,
      });
      
      // Refresh user data after successful payment
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
        queryClient.invalidateQueries({ queryKey: ['user-subscription', user.id] });
      }
      
      // Clean up URL parameters
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, toast, queryClient, user?.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock premium features, get monthly Robux, and enjoy exclusive content with our subscription plans.
          </p>
        </div>

        {user && (
          <div className="max-w-md mx-auto mb-8">
            <SubscriptionStatus />
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <SubscriptionPlans />
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Why Subscribe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-roblox-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">R$</span>
              </div>
              <h3 className="font-semibold mb-2">Monthly Robux</h3>
              <p className="text-gray-600">Get Robux every month to buy items, upgrades, and special abilities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎮</span>
              </div>
              <h3 className="font-semibold mb-2">Premium Games</h3>
              <p className="text-gray-600">Access exclusive games and content only available to subscribers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600">Get faster response times and priority assistance from our support team.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Subscription;
