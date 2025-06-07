
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter } from 'lucide-react';

// Mock data for games
const gamesData = [
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
  },
  {
    id: '7',
    title: 'Bloxburg',
    creator: 'Coeptus',
    playersOnline: 68490,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '8',
    title: 'Pet Simulator X',
    creator: 'BIG Games',
    playersOnline: 94837,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '9',
    title: 'Arsenal',
    creator: 'ROLVe Community',
    playersOnline: 42568,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '10',
    title: 'Jailbreak',
    creator: 'Badimo',
    playersOnline: 56729,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '11',
    title: 'Piggy',
    creator: 'MiniToon',
    playersOnline: 48375,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '12',
    title: 'Phantom Forces',
    creator: 'StyLiS Studios',
    playersOnline: 39482,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600&h=400',
  }
];

const Games = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Games</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            <span>Filter</span>
          </Button>
        </div>
        
        {filterOpen && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-2">Genre</label>
                <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-roblox-blue">
                  <option>All Genres</option>
                  <option>Adventure</option>
                  <option>Role Play</option>
                  <option>Action</option>
                  <option>Simulator</option>
                  <option>Horror</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">Device</label>
                <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-roblox-blue">
                  <option>All Devices</option>
                  <option>PC</option>
                  <option>Mobile</option>
                  <option>Console</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">Price</label>
                <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-roblox-blue">
                  <option>All Prices</option>
                  <option>Free</option>
                  <option>Paid</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="bg-roblox-blue hover:bg-roblox-blue/90">Apply Filters</Button>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="popular">
          <TabsList className="mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {gamesData.map(game => (
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
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="flex items-center gap-1">
                Load More
                <ChevronDown size={16} />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {gamesData.slice().reverse().map(game => (
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
          </TabsContent>
          
          <TabsContent value="top-rated">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {gamesData.slice().sort(() => Math.random() - 0.5).map(game => (
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
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {gamesData.slice(0, 6).map(game => (
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
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Games;
