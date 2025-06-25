import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedGames from '@/components/FeaturedGames';
import Footer from '@/components/Footer';
import { useGenres, useGames } from '@/hooks/useGames';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import createImg from '@/assets/create.png';
import FancyCursor from '@/components/FancyCursor'; // <-- Add this import

const Index = () => {
  const { data: genres, isLoading: genresLoading } = useGenres();
  const { data: games } = useGames();
  const navigate = useNavigate();

  const handleCategoryClick = (genre: string) => {
    navigate(`/games?genre=${encodeURIComponent(genre)}`);
  };

  const popularIds = games ? games.slice(0, 6).map(g => g.Id) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <FancyCursor /> {/* <-- Add the fancy cursor here */}
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 flex-grow">
        <FeaturedGames title="Popular Games" />
        
        {/* Featured Categories Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          {genresLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading categories...</span>
            </div>
          ) : genres && genres.length > 0 ? (
            <>
              {/* Carousel for small screens */}
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden">
                {genres.slice(0, 8).map((genre) => (
                  <div
                    key={genre}
                    className="min-w-[70%] snap-center rounded-lg overflow-hidden relative h-32 bg-gradient-to-r from-roblox-blue to-blue-600 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => handleCategoryClick(genre)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-bold text-xl text-center px-2">{genre}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {/* Grid for medium and up */}
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4">
                {(genres?.slice(0, 8) ?? ['Adventure', 'Role Play', 'Action', 'Simulator', 'Obby', 'Tycoon', 'Racing', 'Fighting']).map((genre) => (
                  <div
                    key={genre}
                    className="rounded-lg overflow-hidden relative h-24 bg-gradient-to-r from-roblox-blue to-blue-600 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => handleCategoryClick(genre)}
                    style={{ minWidth: 0 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-bold text-base text-center px-2">{genre}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Carousel for small screens */}
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden">
                {['Adventure', 'Role Play', 'Action', 'Simulator'].map((category) => (
                  <div
                    key={category}
                    className="min-w-[70%] snap-center rounded-lg overflow-hidden relative h-32 bg-gradient-to-r from-roblox-blue to-blue-600 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-bold text-xl">{category}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {/* Grid for medium and up */}
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4">
                {['Adventure', 'Role Play', 'Action', 'Simulator'].map((category) => (
                  <div
                    key={category}
                    className="rounded-lg overflow-hidden relative h-24 bg-gradient-to-r from-roblox-blue to-blue-600 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                    style={{ minWidth: 0 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-bold text-base text-center px-2">{category}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
        
        <FeaturedGames title="Trending Now" excludeIds={popularIds} />
        
        {/* Feature Callout */}
        <section className="py-12 my-8 bg-roblox-light-gray rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 px-4">
              <img
                src={createImg}
                alt="Create on Roblox"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 px-8">
              <h2 className="text-3xl font-bold mb-4">Create Anything You Can Imagine</h2>
              <p className="text-gray-700 mb-6 text-lg">
                With Kiddo Studio, anyone can design, build, and publish immersive 3D experiences. 
                Join millions of creators and publish your unique experience to reach billions of users.
              </p>
              <a 
                href="/create" 
                className="bg-roblox-blue text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
              >
                Start Creating
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
