
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Kiddoverse</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kiddoverse is a global platform that brings people together through play. We enable anyone to imagine, create, and have fun with friends as they explore millions of immersive 3D experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To connect a billion people with optimism and civility through shared experiences.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">200M+</div>
            <div className="text-gray-600">Monthly Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">50M+</div>
            <div className="text-gray-600">Daily Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">180+</div>
            <div className="text-gray-600">Countries & Regions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">24B+</div>
            <div className="text-gray-600">Hours Engaged</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=400"
              alt="Creating on Roblox"
              className="rounded-lg shadow-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">Create</h3>
            <p className="text-gray-600">
              Build immersive 3D experiences with Kiddo Studio, our free desktop design tool. 
              Create anything you can imagine with our comprehensive set of building and scripting tools.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600&h=400"
              alt="Playing on Roblox"
              className="rounded-lg shadow-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">Play</h3>
            <p className="text-gray-600">
              Discover millions of immersive experiences created by our global community. 
              From adventure games to social hangouts, there's always something new to explore.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">Join millions of creators and players on Kiddoverse today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/games">
              <Button size="lg" variant="outline">
                Explore Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
