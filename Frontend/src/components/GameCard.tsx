
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string | null;
  creator: string | null;
  playersOnline?: number;
  image?: string;
  description?: string | null;
  assets?: any;
}

const GameCard: React.FC<GameCardProps> = ({ 
  id, 
  title, 
  creator, 
  playersOnline = Math.floor(Math.random() * 100000), 
  image,
  description,
  assets 
}) => {
  // Handle game image from Assets field properly
  let gameImage = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400';
  
  if (assets) {
    try {
      let assetArray: any[] = [];
      
      // Handle different asset formats
      if (Array.isArray(assets)) {
        assetArray = assets;
      } else if (typeof assets === 'string') {
        try {
          assetArray = JSON.parse(assets);
        } catch {
          assetArray = [assets];
        }
      } else if (assets && typeof assets === 'object') {
        // Handle object format
        if (assets.length !== undefined) {
          assetArray = Array.from(assets);
        } else {
          assetArray = [assets];
        }
      }
      
      // Find the first valid image URL
      if (assetArray.length > 0) {
        const firstAsset = assetArray[0];
        if (typeof firstAsset === 'string' && firstAsset.startsWith('http')) {
          gameImage = firstAsset;
        } else if (firstAsset && typeof firstAsset === 'object' && firstAsset.url) {
          gameImage = firstAsset.url;
        }
      }
    } catch (error) {
      console.log('Error parsing assets:', error);
    }
  } else if (image) {
    gameImage = image;
  }

  return (
    <Link to={`/games/${id}`}>
      <div className="game-card group">
        <div className="overflow-hidden relative">
          <img 
            src={gameImage} 
            alt={title || 'Game'} 
            className="game-card-image group-hover:scale-105 transition-transform duration-200 w-full h-40 object-cover rounded-t-lg" 
            onError={(e) => {
              // Fallback image if the asset image fails to load
              e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-base truncate">{title || 'Untitled Game'}</h3>
          <p className="text-sm text-gray-500 truncate">{creator || 'Unknown Creator'}</p>
          <div className="mt-2 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            <span className="text-xs text-gray-600">{playersOnline.toLocaleString()} active</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
