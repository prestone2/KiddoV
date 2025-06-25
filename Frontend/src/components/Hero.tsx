import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero.png';
import heroImg1 from '@/assets/hero-img-1.png'; // Replace with your actual file name
import heroImg2 from '@/assets/hero-img-2.png'; // Replace with your actual file name

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
              Reimagine the Impossible with Kiddoverse
            </h1>
            <p
              className="text-xl opacity-100 animate-fade-in"
              style={{ animationDelay: '0.2s', color: '#000' }} // Change '#444' to any color you prefer
            >
              KiddoVerse is the ultimate platform for immersive experiences. 
              Play, create, and share with a global community.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {/* <Link to="/signup">
                <Button className="bg-white text-roblox-blue hover:bg-gray-100 font-medium px-6 py-2 rounded-full">
                  Sign Up
                </Button>
              </Link> */}
              <Link to="/games">
                <Button
                  variant="outline"
                  className="text-white font-medium px-6 py-2 rounded-full border-none hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#8d0b41' }}
                >
                  Discover Games
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-80 w-[540px] animate-float">
              <img 
                src={heroImg1}
                alt="Roblox Gaming"
                className="absolute rounded-lg shadow-xl transform -rotate-2 h-52" // h-52 = 13rem = 208px
                style={{ top: '0', left: '20%', zIndex: 1 }}
              />
              <img 
                src={heroImg2}
                alt="Roblox Platform"
                className="absolute rounded-lg shadow-xl transform rotate-3 h-64" // h-64 = 16rem = 256px
                style={{ top: '52px', right: '10%', zIndex: 2 }}
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
