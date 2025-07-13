
import React from 'react';
import { Users, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/FavoriteButton';

interface GameInfoSectionProps {
  gameTitle: string;
  developer: string;
  description?: string;
  keyFeatures?: string;
  instructions?: string;
  playersOnline: number;
  gameId: string;
  canAccessGame: boolean;
  onPlayGame: () => void;
}

const GameInfoSection: React.FC<GameInfoSectionProps> = ({
  gameTitle,
  developer,
  description,
  keyFeatures,
  instructions,
  playersOnline,
  gameId,
  canAccessGame,
  onPlayGame
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{gameTitle}</h1>
          <p className="text-lg text-gray-600">by {developer}</p>
        </div>
        {canAccessGame && (
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={onPlayGame}
          >
            <Play className="mr-2 h-5 w-5" />
            Play
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-semibold">{playersOnline.toLocaleString()}</span>
          <span className="text-gray-600 ml-1">playing</span>
        </div>
        <div className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          <span className="font-semibold">4.8</span>
          <span className="text-gray-600 ml-1">(2.1k)</span>
        </div>
        <FavoriteButton gameId={gameId} size="sm" />
      </div>

      {description && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">About</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}

      {keyFeatures && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Key Features</h3>
          <p className="text-gray-700">{keyFeatures}</p>
        </div>
      )}

      {instructions && (
        <div>
          <h3 className="text-xl font-semibold mb-3">How to Play</h3>
          <p className="text-gray-700">{instructions}</p>
        </div>
      )}
    </div>
  );
};

export default GameInfoSection;
