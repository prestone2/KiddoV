
import React from 'react';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGames } from '@/hooks/useGames';

interface FeaturedGamesProps {
  title: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title }) => {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link to="/games" className="flex items-center text-roblox-blue hover:underline">
            <span className="mr-1">See All</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading games...</span>
        </div>
      </div>
    );
  }

  if (error || !games) {
    return (
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link to="/games" className="flex items-center text-roblox-blue hover:underline">
            <span className="mr-1">See All</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600">Unable to load games at this time.</p>
        </div>
      </div>
    );
  }

  // Show up to 6 games for featured section
  const featuredGames = games.slice(0, 6);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to="/games" className="flex items-center text-roblox-blue hover:underline">
          <span className="mr-1">See All</span>
          <ChevronRight size={18} />
        </Link>
      </div>
      
      {featuredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredGames.map(game => (
            <GameCard
              key={game.Id}
              id={game.Id}
              title={game.Title}
              creator={game.Developer}
              description={game.Description}
              assets={game.Assets}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No games available to display.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedGames;
