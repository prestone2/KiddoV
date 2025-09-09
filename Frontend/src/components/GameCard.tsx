import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Play, Crown, Lock } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import { useAddToGameHistory } from '@/hooks/useGameHistory';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import type { Json } from '@/integrations/supabase/types';

interface GameCardProps {
  id: string;
  title: string;
  creator: string;
  description?: string;
  assets?: Json | null;
  players?: number;
  maxPlayers?: number;
  isPublic?: boolean;
  tags?: string[];
  isPremium?: boolean;
  size?: "default" | "small"; // 👈 added size prop
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  creator,
  description,
  assets,
  players = Math.floor(Math.random() * 1000) + 1,
  maxPlayers = 1000,
  isPublic = true,
  tags,
  isPremium = false,
  size = "default",
}) => {
  const addToHistory = useAddToGameHistory();
  const { hasPremiumAccess, isAuthenticated } = usePremiumAccess();

  // Handle image URL - use first asset or fallback
  let imageUrl =
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=300";

  if (assets) {
    let assetsArray: any[] = [];
    if (Array.isArray(assets)) {
      assetsArray = assets;
    } else if (typeof assets === "string") {
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

  const canAccessGame = !isPremium || hasPremiumAccess;

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
        size === "small" ? "text-sm" : "text-base"
      }`}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            size === "small" ? "h-32" : "h-48"
          }`}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=300";
          }}
        />

        {/* Premium badge overlay */}
        {isPremium && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}

        {/* Play button overlay */}
        {canAccessGame ? (
          <Link to={`/games/${id}`} onClick={handleGameClick}>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div
                className={`bg-roblox-blue text-white rounded-full ${
                  size === "small" ? "p-2" : "p-3"
                } opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300`}
              >
                <Play className={`${size === "small" ? "w-4 h-4" : "w-6 h-6"} fill-current`} />
              </div>
            </div>
          </Link>
        ) : (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs font-medium">Premium Required</p>
              <Link to="/subscription" className="text-xs underline hover:no-underline">
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
      </div>

      <CardContent className={`${size === "small" ? "p-2" : "p-4"}`}>
        {canAccessGame ? (
          <Link to={`/games/${id}`} className="block" onClick={handleGameClick}>
            <h3
              className={`font-semibold mb-1 group-hover:text-roblox-blue transition-colors line-clamp-1 ${
                size === "small" ? "text-sm" : "text-lg"
              }`}
            >
              {title}
            </h3>
          </Link>
        ) : (
          <h3
            className={`font-semibold mb-1 text-gray-500 line-clamp-1 ${
              size === "small" ? "text-sm" : "text-lg"
            }`}
          >
            {title}
          </h3>
        )}

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-500">
            <Users className={`${size === "small" ? "w-3 h-3 mr-1" : "w-4 h-4 mr-1"}`} />
            <span className={`${size === "small" ? "text-xs" : "text-sm"}`}>
              {players.toLocaleString()}/{maxPlayers}
            </span>
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`${size === "small" ? "text-[10px] px-1" : "text-xs"}`}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className={`${size === "small" ? "text-[10px]" : "text-xs"}`}>
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameCard;
