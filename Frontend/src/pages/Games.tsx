import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LazyGamesList from '@/components/LazyGamesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useGenres } from '@/hooks/useGames';

const Games = () => {
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState<string>('All Genres');
  const [deviceFilter, setDeviceFilter] = useState<string>('All Devices');
  const [genderFilter, setGenderFilter] = useState<string>('All Genders');

  const { data: genres } = useGenres();

  // Set genre filter from URL parameter
  useEffect(() => {
    const genre = searchParams.get('genre');
    if (genre && genres?.includes(genre)) {
      setGenreFilter(genre);
      setFilterOpen(true);
    }
  }, [searchParams, genres]);

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
        
        {/* Games Content with Lazy Loading */}
        <Tabs defaultValue="popular">
          <TabsList className="mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="mt-0">
            <LazyGamesList 
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
            />
          </TabsContent>
          
          <TabsContent value="recommended">
            <LazyGamesList 
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
            />
          </TabsContent>
          
          <TabsContent value="top-rated">
            <LazyGamesList 
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
            />
          </TabsContent>
          
          <TabsContent value="featured">
            <LazyGamesList 
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
              pageSize={6}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Games;
