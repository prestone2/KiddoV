
import React from 'react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: string;
 title: string | null;
  creator: string | null;
  playersOnline?: number;
  image?: string;
  description?: string | null;
}

const GameCard: React.FC<GameCardProps> = ({ 
  id, 
  title, 
  creator, 
  playersOnline = Math.floor(Math.random() * 100000), // Random for now
  image = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400',
  description 
}) => {  return (
    <Link to={`/games/${id}`}>
      <div className="game-card">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title || 'game'} 
            className="game-card-image" 
          />
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
