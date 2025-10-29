import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero.png';
import heroImg1 from '@/assets/hero-img-1.png';
import heroImg2 from '@/assets/hero-img-2.png';

const Hero: React.FC = () => {
  return (
    <section
      className="relative text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div className="space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#8d0b41] drop-shadow-sm">
            <span className="text-[#8d0b41]">KiddoVase</span> — Where Fun Meets Learning
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-lg">
            Play hundreds of fun, <strong>safe</strong>, and <strong>educational games</strong> designed 
            for kids of all ages. Learn, explore, and grow in a world built 
            for imagination and creativity.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link to="/games">
              <Button
                className="bg-[#8d0b41] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-all"
              >
                Play Now
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-2 italic">
            Trusted by parents. Loved by kids. Powered by creativity.
          </p>
        </div>

        {/* Right Images */}
        <div className="hidden md:block relative h-96 w-full">
          <img
            src={heroImg1}
            alt="Kids playing fun online games on KiddoVase"
            className="absolute rounded-xl shadow-2xl transform -rotate-2 h-56 w-80 object-cover top-0 left-[15%] animate-float-slow"
          />
          <img
            src={heroImg2}
            alt="Educational 3D learning games on KiddoVase"
            className="absolute rounded-xl shadow-2xl transform rotate-3 h-64 w-96 object-cover top-20 right-[5%] animate-float"
          />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
