
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import GameCard from '@/components/GameCard';
import type { Json } from '@/integrations/supabase/types';

interface Game {
  Id: string;
  Title: string | null;
  Developer: string | null;
  Description: string | null;
  Assets: Json | null;
  is_premium: boolean | null;
}

interface FriendGamesSectionProps {
  favoriteGames: Game[] | undefined;
  createdGames: Game[] | undefined;
  favoritesLoading: boolean;
  createdLoading: boolean;
}

const FriendGamesSection: React.FC<FriendGamesSectionProps> = ({
  favoriteGames,
  createdGames,
  favoritesLoading,
  createdLoading,
}) => {
  const renderGamesGrid = (games: Game[] | undefined, isLoading: boolean, emptyMessage: string) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      );
    }

    if (!games || games.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(game => (
          <GameCard
            key={game.Id}
            id={game.Id}
            title={game.Title || 'Untitled Game'}
            creator={game.Developer || 'Unknown'}
            description={game.Description || ''}
            assets={game.Assets}
            isPremium={game.is_premium || false}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Favorite Games */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Games</CardTitle>
        </CardHeader>
        <CardContent>
          {renderGamesGrid(favoriteGames, favoritesLoading, "No favorite games yet")}
        </CardContent>
      </Card>

      {/* Created Games */}
      <Card>
        <CardHeader>
          <CardTitle>Created Games</CardTitle>
        </CardHeader>
        <CardContent>
          {renderGamesGrid(createdGames, createdLoading, "No games created yet")}
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendGamesSection;
