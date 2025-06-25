
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Code, BookOpen, Video, Users, Download, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperHub = () => {
  const resources = [
    {
      icon: Code,
      title: "API Documentation",
      description: "Complete reference for kiddo APIs and services",
      link: "#"
    },
    {
      icon: BookOpen,
      title: "Tutorials & Guides",
      description: "Step-by-step tutorials for game development",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Courses",
      description: "Learn through comprehensive video tutorials",
      link: "#"
    },
    {
      icon: Users,
      title: "Developer Forum",
      description: "Connect with other developers and get help",
      link: "#"
    }
  ];

  const featuredTutorials = [
    {
      title: "Your First Game",
      description: "Learn the basics of creating your first kiddoverse game",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400&h=200",
      duration: "30 min"
    },
    {
      title: "Scripting Fundamentals",
      description: "Master Lua scripting for kiddoverse development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400&h=200",
      duration: "45 min"
    },
    {
      title: "Monetization Strategies",
      description: "Learn how to monetize your games effectively",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=400&h=200",
      duration: "25 min"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Developer Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create amazing experiences on kiddoverse. From tutorials to API documentation.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 mr-3" />
              <h2 className="text-3xl font-bold">Quick Start</h2>
            </div>
            <p className="text-lg mb-6">Ready to start creating? Download kiddoverse Studio and begin your development journey.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download kiddo Studio
              </Button>
              <Link to="/create">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-roblox-blue">
                  Start Creating
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-center">
              <resource.icon className="h-12 w-12 text-roblox-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <Button variant="outline" size="sm">
                Explore
              </Button>
            </div>
          ))}
        </div>

        {/* Featured Tutorials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTutorials.map((tutorial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-roblox-blue text-white text-xs px-2 py-1 rounded">
                      Tutorial
                    </span>
                    <span className="text-sm text-gray-500">{tutorial.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <Button className="w-full bg-roblox-blue hover:bg-roblox-blue/90">
                    Start Tutorial
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Stats */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Developer Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-roblox-blue mb-2">2M+</div>
              <div className="text-gray-600">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roblox-blue mb-2">40M+</div>
              <div className="text-gray-600">Experiences Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roblox-blue mb-2">$500M+</div>
              <div className="text-gray-600">Paid to Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-roblox-blue mb-2">180+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-roblox-light-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-gray-600 mb-6">Join millions of developers creating the future of entertainment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DeveloperHub;
