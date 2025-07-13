import React from 'react';
import { useRecentGames } from '@/hooks/useGameHistory';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Play, User, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAddToGameHistory } from '@/hooks/useGameHistory';
import FavoriteButton from '@/components/FavoriteButton';
import type { Json } from '@/integrations/supabase/types';

const RecentGames = () => {
  const { user } = useAuth();
  const { data: recentGames, isLoading, error } = useRecentGames(6);

  if (!user) {
    return (
      <section className="py-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 mr-2 text-roblox-blue" />
          <h2 className="text-2xl font-bold">Recently Played</h2>
        </div>
        
        {/* Attractive login prompt */}
        <div className="bg-gradient-to-br from-roblox-blue to-blue-600 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <User className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Join the Adventure!</h3>
            </div>
            
            <p className="text-lg mb-6 opacity-90">
              Sign up now to unlock amazing features and make your gaming experience even better!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 opacity-80" />
                <span>Track your recently played games</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 opacity-80" />
                <span>Save your favorite games</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 opacity-80" />
                <span>Connect with friends</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-roblox-blue hover:bg-gray-100 font-semibold px-8">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-roblox-blue font-semibold px-8">
                  Already have an account? Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 mr-2 text-roblox-blue" />
          <h2 className="text-2xl font-bold">Recently Played</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading recent games:', error);
    return (
      <section className="py-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 mr-2 text-roblox-blue" />
          <h2 className="text-2xl font-bold">Recently Played</h2>
        </div>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Unable to load recent games</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </section>
    );
  }

  if (!recentGames || recentGames.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 mr-2 text-roblox-blue" />
          <h2 className="text-2xl font-bold">Recently Played</h2>
        </div>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">No games played yet</p>
          <p className="text-sm text-gray-500">Start playing games to see your recent activity here!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center mb-6">
        <Clock className="w-6 h-6 mr-2 text-roblox-blue" />
        <h2 className="text-2xl font-bold">Recently Played</h2>
      </div>
      {/* Horizontal scroll on small screens, grid on md+ */}
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-4">
        {recentGames.map((entry) => (
          <div
            key={entry.id}
            className="flex-shrink-0 sm:flex-shrink sm:w-auto"
            style={{ width: '8rem' }} // w-32 for small screens
          >
            <SimpleGameCard
              id={entry.game?.Id || entry.game_id}
              title={entry.game?.Title || 'Untitled Game'}
              assets={entry.game?.Assets}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

interface SimpleGameCardProps {
  id: string;
  title: string;
  assets?: Json | null;
}

const SimpleGameCard: React.FC<SimpleGameCardProps> = ({
  id,
  title,
  assets,
}) => {
  const addToHistory = useAddToGameHistory();

  // Handle image URL - use first asset or fallback
  let imageUrl = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=300';
  
  if (assets) {
    let assetsArray: any[] = [];
    if (Array.isArray(assets)) {
      assetsArray = assets;
    } else if (typeof assets === 'string') {
      try {
        assetsArray = JSON.parse(assets);
      } catch {
        // If parsing fails, keep default
      }
    }
    
    if (assetsArray.length > 0) {
      imageUrl = assetsArray[0];
    }
  }

  const handleGameClick = () => {
    // Add to game history when user clicks to play
    addToHistory.mutate(id);
  };

  return (
    <div className="group flex flex-col items-center"> {/* Removed Card wrapper */}
      <div className="relative flex flex-col items-center">
        <Link to={`/games/${id}`} onClick={handleGameClick}>
          <img 
            src={imageUrl}
            alt={title}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=300';
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-roblox-blue text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentGames;
