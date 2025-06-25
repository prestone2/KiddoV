import React from 'react';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGames } from '@/hooks/useGames';

interface FeaturedGamesProps {
  title: string;
  excludeIds?: string[]; // Add this prop to allow exclusion
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title, excludeIds = [] }) => {
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

  // Exclude games if excludeIds is provided
  const filteredGames = games.filter(game => !excludeIds.includes(game.Id));
  const featuredGames = filteredGames.slice(0, 6);

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
        <>
          {/* Carousel for small screens */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:hidden pb-2">
            {featuredGames.map(game => (
              <div key={game.Id} className="min-w-[50%] snap-center">
                <GameCard
                  id={game.Id}
                  title={game.Title || 'Untitled Game'}
              creator={game.Developer || 'Unknown Developer'}
              assets={game.Assets}
                />
              </div>
            ))}
          </div>
          {/* Grid for medium and up */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No games available to display.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedGames;
