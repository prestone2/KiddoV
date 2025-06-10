
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, Loader2 } from 'lucide-react';
import { useGames } from '@/hooks/useGames';

const Games = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { data: games, isLoading, error } = useGames();

  const renderGamesGrid = (gamesList: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {gamesList.map(game => (
        <GameCard
          key={game.Id}
          id={game.Id}
          title={game.Title}
          creator={game.Developer}
          description={game.Description}
        />
      ))}
    </div>
  );

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
                {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading games...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading games: {error.message}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {/* Games Content */}
        {!isLoading && !error && games && (
          <Tabs defaultValue="popular">
            <TabsList className="mb-8">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="mt-0">
              {games.length > 0 ? (
                <>
                  {renderGamesGrid(games)}
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="flex items-center gap-1">
                      Load More
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No games found in the database.</p>
                  <p className="text-sm text-gray-500">Add some games to see them here!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommended">
              {games.length > 0 ? renderGamesGrid(games.slice().reverse()) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No recommended games available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="top-rated">
              {games.length > 0 ? renderGamesGrid(games.slice().sort(() => Math.random() - 0.5)) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No top-rated games available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured">
              {games.length > 0 ? renderGamesGrid(games.slice(0, 6)) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No featured games available.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Games;
