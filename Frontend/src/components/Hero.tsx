import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero.png';

const Hero: React.FC = () => {
  return (
    <div
      className="relative text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in"
              style={{ color: '#8d0b41' }}
            >
              Reimagine the Impossible with Roblox
            </h1>
            <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Roblox is the ultimate platform for immersive experiences. 
              Play, create, and share with a global community.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button className="bg-white text-roblox-blue hover:bg-gray-100 font-medium px-6 py-2 rounded-full">
                  Sign Up
                </Button>
              </Link>
              <Link to="/games">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 font-medium px-6 py-2 rounded-full">
                  Discover Games
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-80 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=400" 
                alt="Roblox Gaming" 
                className="absolute rounded-lg shadow-xl transform -rotate-2"
                style={{ top: '0', left: '20%', zIndex: 1 }}
              />
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=350" 
                alt="Roblox Platform" 
                className="absolute rounded-lg shadow-xl transform rotate-3"
                style={{ top: '80px', right: '10%', zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
