
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface GameDetailHeaderProps {
  gameTitle: string;
}

const GameDetailHeader: React.FC<GameDetailHeaderProps> = ({ gameTitle }) => {
  return (
    <div className="mb-6">
      <Link to="/games" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Games
      </Link>
    </div>
  );
};

export default GameDetailHeader;
