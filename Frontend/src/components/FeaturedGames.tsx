
import React from 'react';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for featured games
const featuredGames = [
  {
    id: '1',
    title: 'Adopt Me!',
    creator: 'DreamCraft',
    playersOnline: 384620,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '2',
    title: 'Brookhaven RP',
    creator: 'Wolfpaq',
    playersOnline: 426839,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '3',
    title: 'Blox Fruits',
    creator: 'Gamer Robot Inc',
    playersOnline: 187235,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '4',
    title: 'Tower of Hell',
    creator: 'YXCeptional Studios',
    playersOnline: 71284,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '5',
    title: 'Murder Mystery 2',
    creator: 'Nikilis',
    playersOnline: 53247,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '6',
    title: 'Royale High',
    creator: 'callmehbob',
    playersOnline: 86521,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400',
  }
];

interface FeaturedGamesProps {
  title: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title }) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to="/games" className="flex items-center text-roblox-blue hover:underline">
          <span className="mr-1">See All</span>
          <ChevronRight size={18} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredGames.map(game => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            creator={game.creator}
            playersOnline={game.playersOnline}
            image={game.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;
