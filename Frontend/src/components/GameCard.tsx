
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: string;
  title: string;
  creator: string;
  playersOnline: number;
  image: string;
}

const GameCard: React.FC<GameCardProps> = ({ id, title, creator, playersOnline, image }) => {
  return (
    <Link to={`/games/${id}`}>
      <div className="game-card">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="game-card-image" 
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{creator}</p>
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
