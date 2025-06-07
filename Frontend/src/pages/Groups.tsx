
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Plus, Crown } from 'lucide-react';

const Groups = () => {
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = [
    {
      id: 1,
      name: 'Epic Builders',
      description: 'Building the most amazing structures in Roblox!',
      members: 15420,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300&h=200',
      role: 'Owner',
      isOwner: true
    },
    {
      id: 2,
      name: 'Adventure Seekers',
      description: 'Join us for the greatest adventures!',
      members: 8750,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200',
      role: 'Member',
      isOwner: false
    }
  ];

  const discoverGroups = [
    {
      id: 3,
      name: 'Pro Gamers United',
      description: 'For the most skilled players',
      members: 25680,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: 4,
      name: 'Creative Minds',
      description: 'Where creativity meets innovation',
      members: 12300,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=300&h=200'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Groups</h1>
          
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeTab === 'my-groups' ? 'default' : 'outline'}
              onClick={() => setActiveTab('my-groups')}
              className={activeTab === 'my-groups' ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
            >
              <Users className="w-4 h-4 mr-2" />
              My Groups
            </Button>
            <Button 
              variant={activeTab === 'discover' ? 'default' : 'outline'}
              onClick={() => setActiveTab('discover')}
              className={activeTab === 'discover' ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
            >
              <Search className="w-4 h-4 mr-2" />
              Discover
            </Button>
            <Button 
              variant="outline" 
              className="ml-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>

          <div className="relative mb-6">
            <Input 
              type="text" 
              placeholder="Search groups..." 
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {activeTab === 'my-groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map(group => (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={group.image} 
                  alt={group.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    {group.isOwner && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{group.members.toLocaleString()} members</span>
                    <span className="bg-roblox-blue text-white px-2 py-1 rounded text-xs">
                      {group.role}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-roblox-blue hover:bg-roblox-blue/90"
                    size="sm"
                  >
                    View Group
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoverGroups.map(group => (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={group.image} 
                  alt={group.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    Join Group
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Groups;
