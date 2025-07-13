
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GameImageSection from './GameImageSection';
import GameInfoSection from './GameInfoSection';
import type { Game } from '@/hooks/useGames';

interface GameDetailContentProps {
  game: Game;
  gameImage: string;
  playersOnline: number;
  canAccessGame: boolean;
  onPlayGame: () => void;
}

const GameDetailContent: React.FC<GameDetailContentProps> = ({
  game,
  gameImage,
  playersOnline,
  canAccessGame,
  onPlayGame
}) => {
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardContent className="p-0">
          <GameImageSection
            gameImage={gameImage}
            gameTitle={game.Title || 'Game'}
            isPremium={game.is_premium || false}
            canAccessGame={canAccessGame}
            onPlayGame={onPlayGame}
          />
          
          <GameInfoSection
            gameTitle={game.Title || 'Untitled Game'}
            developer={game.Developer || 'Unknown Developer'}
            description={game.Description || undefined}
            keyFeatures={game.KeyFeatures || undefined}
            instructions={game.Instructions || undefined}
            playersOnline={playersOnline}
            gameId={game.Id}
            canAccessGame={canAccessGame}
            onPlayGame={onPlayGame}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetailContent;
