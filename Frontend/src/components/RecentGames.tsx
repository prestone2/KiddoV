import React from 'react';
import { useRecentGames } from '@/hooks/useGameHistory';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAddToGameHistory } from '@/hooks/useGameHistory';
import FavoriteButton from '@/components/FavoriteButton';
import type { Json } from '@/integrations/supabase/types';

const RecentGames = () => {
  const { user } = useAuth();
  const { data: recentGames, isLoading, error } = useRecentGames(6);

  if (!user) {
    return null;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentGames.map((entry) => (
          <SimpleGameCard
            key={entry.id}
            id={entry.game?.Id || entry.game_id}
            title={entry.game?.Title || 'Untitled Game'}
            assets={entry.game?.Assets}
          />
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=300';
          }}
        />
        
        {/* Favorite button overlay */}
        <div className="absolute top-2 right-2">
          <FavoriteButton gameId={id} size="sm" />
        </div>
        
        {/* Play button overlay */}
        <Link to={`/games/${id}`} onClick={handleGameClick}>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="bg-roblox-blue text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/games/${id}`} className="block" onClick={handleGameClick}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-roblox-blue transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecentGames;
