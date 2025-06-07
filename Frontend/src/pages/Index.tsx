import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedGames from '@/components/FeaturedGames';
import Footer from '@/components/Footer';
import FancyCursor from '@/components/FancyCursor'; // <-- Add this import

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <FancyCursor /> {/* <-- Add this line */}
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 flex-grow">
        <FeaturedGames title="Popular Games" />
        
        {/* Featured Categories Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Adventure', 'Role Play', 'Action', 'Simulator'].map(category => (
              <div 
                key={category}
                className="rounded-lg overflow-hidden relative h-32 bg-gradient-to-r from-roblox-blue to-blue-600 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-xl">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <FeaturedGames title="Trending Now" />
        
        {/* Feature Callout */}
        <section className="py-12 my-8 bg-roblox-light-gray rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 px-4">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800&h=600"
                alt="Create on Roblox"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 px-8">
              <h2 className="text-3xl font-bold mb-4">Create Anything You Can Imagine</h2>
              <p className="text-gray-700 mb-6 text-lg">
                With Roblox Studio, anyone can design, build, and publish immersive 3D experiences. 
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
