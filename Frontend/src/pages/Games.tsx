
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, Loader2 } from 'lucide-react';
import { useGames, useGenres, useFilteredGames } from '@/hooks/useGames';

const Games = () => {
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState<string>('All Genres');
  const [deviceFilter, setDeviceFilter] = useState<string>('All Devices');
  const [genderFilter, setGenderFilter] = useState<string>('All Genders');

  const { data: games, isLoading, error } = useGames();
  const { data: genres } = useGenres();
  const { data: filteredGames, isLoading: isFilterLoading } = useFilteredGames(
    genreFilter === 'All Genres' ? undefined : genreFilter,
    deviceFilter === 'All Devices' ? undefined : deviceFilter,
    genderFilter === 'All Genders' ? undefined : genderFilter
  );

  // Set genre filter from URL parameter
  useEffect(() => {
    const genre = searchParams.get('genre');
    if (genre && genres?.includes(genre)) {
      setGenreFilter(genre);
      setFilterOpen(true);
    }
  }, [searchParams, genres]);

  const displayGames = (genreFilter !== 'All Genres' || deviceFilter !== 'All Devices' || genderFilter !== 'All Genders') 
    ? filteredGames : games;

  const renderGamesGrid = (gamesList: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {gamesList.map(game => (
        <GameCard
          key={game.Id}
          id={game.Id}
          title={game.Title}
          creator={game.Developer}
          description={game.Description}
          assets={game.Assets}
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
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Genres">All Genres</SelectItem>
                    {genres?.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-2">Device</label>
                <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Devices">All Devices</SelectItem>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Console">Console</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-2">Gender</label>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Genders">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                className="bg-roblox-blue hover:bg-roblox-blue/90"
                onClick={() => {
                  // Filters are applied automatically through the hook
                  console.log('Filters applied:', { genreFilter, deviceFilter, genderFilter });
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {(isLoading || isFilterLoading) && (
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
        {!isLoading && !isFilterLoading && !error && displayGames && (
          <Tabs defaultValue="popular">
            <TabsList className="mb-8">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="mt-0">
              {displayGames.length > 0 ? (
                <>
                  {renderGamesGrid(displayGames)}
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="flex items-center gap-1">
                      Load More
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No games found matching your filters.</p>
                  <p className="text-sm text-gray-500">Try adjusting your filter criteria!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommended">
              {displayGames.length > 0 ? renderGamesGrid(displayGames.slice().reverse()) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No recommended games available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="top-rated">
              {displayGames.length > 0 ? renderGamesGrid(displayGames.slice().sort(() => Math.random() - 0.5)) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No top-rated games available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured">
              {displayGames.length > 0 ? renderGamesGrid(displayGames.slice(0, 6)) : (
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
