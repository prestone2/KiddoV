import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Lock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameImageSectionProps {
  gameImage: string;
  gameTitle: string;
  isPremium: boolean;
  canAccessGame: boolean;
  onPlayGame: () => void;
}

const GameImageSection: React.FC<GameImageSectionProps> = ({
  gameImage,
  gameTitle,
  isPremium,
  canAccessGame,
  onPlayGame
}) => {
  return (
    <div className="relative">
      <img 
        src={gameImage} 
        alt={gameTitle} 
        className="w-full h-96 object-cover rounded-t-lg"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=600';
        }}
      />

      {/* Premium badge */}
      {isPremium && (
        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
            <Crown className="w-4 h-4 mr-1" />
            Premium Game
          </div>
        </div>
      )}

      {/* Play overlay */}
      {canAccessGame ? (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={onPlayGame}
          >
            <Play className="mr-2 h-6 w-6" />
            Play Game
          </Button>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-center text-white">
            <Lock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Required</h3>
            <p className="mb-6">This premium game requires an active subscription</p>
            <Link to="/subscription">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameImageSection;
