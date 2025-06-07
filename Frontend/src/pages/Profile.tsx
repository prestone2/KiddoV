
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GameCard from '@/components/GameCard';

// Mock user data
const userData = {
  username: 'CoolRobloxUser123',
  displayName: 'Alex',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
  friends: 245,
  following: 38,
  followers: 129,
  joinDate: 'June 2018',
  about: 'Hey there! I love playing and creating games on Roblox. Check out my latest creations!',
};

// Mock favorite games
const favoriteGames = [
  {
    id: '1',
    title: 'Adopt Me!',
    creator: 'DreamCraft',
    playersOnline: 384620,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '2',
    title: 'Brookhaven RP',
    creator: 'Wolfpaq',
    playersOnline: 426839,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '3',
    title: 'Blox Fruits',
    creator: 'Gamer Robot Inc',
    playersOnline: 187235,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

// Mock created games
const createdGames = [
  {
    id: '7',
    title: 'My Awesome RPG',
    creator: userData.username,
    playersOnline: 1243,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '8',
    title: 'Survival Island',
    creator: userData.username,
    playersOnline: 876,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero banner */}
        <div className="relative h-48 md:h-60 bg-gradient-to-r from-roblox-blue to-blue-600 rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{userData.displayName}</h1>
            <p className="text-white/80">@{userData.username}</p>
          </div>
        </div>
        
        {/* Profile info section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-b-lg p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <div className="relative mt-[-60px] mb-4">
                <img 
                  src={userData.avatar} 
                  alt={userData.username} 
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
              
              <div className="flex space-x-4 mb-6">
                <div className="text-center">
                  <div className="font-bold">{userData.friends}</div>
                  <div className="text-sm text-gray-500">Friends</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{userData.following}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{userData.followers}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
              </div>
              
              <Button className="bg-roblox-blue hover:bg-roblox-blue/90 w-full md:w-auto mb-4">Add Friend</Button>
              <Button variant="outline" className="w-full md:w-auto">Message</Button>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-700">{userData.about}</p>
                <p className="text-gray-500 text-sm mt-2">Member since {userData.joinDate}</p>
              </div>
            </div>
            
            <div className="md:w-2/3 md:pl-8 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
              <Tabs defaultValue="favorites">
                <TabsList>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="creations">Creations</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
                
                <TabsContent value="favorites" className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Favorite Games</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favoriteGames.map(game => (
                      <GameCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        creator={game.creator}
                        playersOnline={game.playersOnline}
                        image={game.image}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="creations" className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Created Games</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {createdGames.map(game => (
                      <GameCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        creator={game.creator}
                        playersOnline={game.playersOnline}
                        image={game.image}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Create New Game
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Items Yet</h3>
                    <p className="text-gray-500 text-center mb-6">Explore the Marketplace to find cool items for your avatar!</p>
                    <Button variant="outline">Visit Marketplace</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Groups Joined</h3>
                    <p className="text-gray-500 text-center mb-6">Join groups to connect with other players!</p>
                    <Button variant="outline">Find Groups</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
