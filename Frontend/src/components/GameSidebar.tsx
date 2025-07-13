
import React from 'react';
import { Crown, Share, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/FavoriteButton';
import type { Json } from '@/integrations/supabase/types';

interface GameSidebarProps {
  developer: string;
  createdAt?: string;
  isPremium: boolean;
  genres?: Json;
  tags?: Json;
  gameId: string;
  onShareGame: () => void;
  onReportGame: () => void;
}

const GameSidebar: React.FC<GameSidebarProps> = ({
  developer,
  createdAt,
  isPremium,
  genres,
  tags,
  gameId,
  onShareGame,
  onReportGame
}) => {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Game Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Developer:</span>
              <p className="text-gray-600">{developer}</p>
            </div>
            <div>
              <span className="font-medium">Created:</span>
              <p className="text-gray-600">
                {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            {isPremium && (
              <div>
                <span className="font-medium">Access:</span>
                <div className="flex items-center mt-1">
                  <Crown className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="text-yellow-600 font-medium">Premium Game</span>
                </div>
              </div>
            )}
            {genres && Array.isArray(genres) && genres.length > 0 && (
              <div>
                <span className="font-medium">Genres:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {genres.map((genre, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {String(genre)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tags && Array.isArray(tags) && tags.length > 0 && (
              <div>
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {String(tag)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <FavoriteButton gameId={gameId} size="default" />
            <Button className="w-full" variant="outline" onClick={onShareGame}>
              <Share className="mr-2 h-4 w-4" />
              Share Game
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onReportGame}
            >
              <Flag className="mr-2 h-4 w-4" />
              Report Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSidebar;
