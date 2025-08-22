import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { useProfile, useCreatedGames } from '@/hooks/useProfile';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: createdGames, isLoading: createdLoading } = useCreatedGames();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  // Fetch real-time friend statistics
  const { data: friendStats, isLoading: statsLoading } = useQuery({
    queryKey: ['friend-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return { friends: 0, following: 0, followers: 0 };

      // Get friends count (accepted relationships)
      const { data: friendsData, error: friendsError } = await supabase
        .from('user_relationships')
        .select('*', { count: 'exact' })
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (friendsError) {
        console.error('Error fetching friends count:', friendsError);
      }

      // Get following count (where user is the requester)
      const { data: followingData, error: followingError } = await supabase
        .from('user_relationships')
        .select('*', { count: 'exact' })
        .eq('requester_id', user.id)
        .eq('status', 'accepted');

      if (followingError) {
        console.error('Error fetching following count:', followingError);
      }

      // Get followers count (where user is the addressee)
      const { data: followersData, error: followersError } = await supabase
        .from('user_relationships')
        .select('*', { count: 'exact' })
        .eq('addressee_id', user.id)
        .eq('status', 'accepted');

      if (followersError) {
        console.error('Error fetching followers count:', followersError);
      }

      return {
        friends: friendsData?.length || 0,
        following: followingData?.length || 0,
        followers: followersData?.length || 0,
      };
    },
    enabled: !!user?.id,
  });

  // Fetch actual favorite games based on user's favorites
  const { data: favoriteGames, isLoading: favoritesLoading } = useQuery({
    queryKey: ['user-favorite-games', user?.id, favorites],
    queryFn: async () => {
      if (!user || !favorites || favorites.length === 0) return [];
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .in('Id', favorites);

      if (error) {
        console.error('Error fetching favorite games:', error);
        return [];
      }

      return data;
    },
    enabled: !!user && !!favorites && favorites.length > 0,
  });

  const handleAddFriend = () => {
    navigate('/friends?tab=search');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading profile...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero banner */}
        <div className="relative h-48 md:h-60 bg-gradient-to-r from-roblox-blue to-blue-600 rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{profile.display_name || 'User'}</h1>
            <p className="text-white/80">@{profile.username}</p>
          </div>
        </div>
        
        {/* Profile info section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-b-lg p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <div className="relative mt-[-60px] mb-4">
                <img 
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150'}
                  alt={profile.username} 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              </div>
              
              <div className="flex space-x-4 mb-6">
                <div className="text-center">
                  <div className="font-bold">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : (
                      friendStats?.friends || 0
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Friends</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : (
                      friendStats?.following || 0
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">
                    {statsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : (
                      friendStats?.followers || 0
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto mb-4">
                <Button 
                  className="bg-roblox-blue hover:bg-roblox-blue/90"
                  onClick={handleAddFriend}
                >
                  Add Friend
                </Button>
                <Button variant="outline">Message</Button>
                <Link to="/settings">
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </Link>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-700">Welcome to my profile! I love playing and creating games.</p>
                <p className="text-gray-500 text-sm mt-2">Member since {joinDate}</p>
                {profile.robux_balance !== null && (
                  <p className="text-green-600 font-semibold mt-2">
                    Kiddocash: {profile.robux_balance?.toLocaleString() ?? 0}
                  </p>
                )}
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
                  {favoritesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      <span>Loading favorites...</span>
                    </div>
                  ) : favoriteGames && favoriteGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {favoriteGames.map(game => {
                        // Handle Assets field properly - it can be a string, array, or null
                        let gameAssets = null;
                        if (game.Assets) {
                          if (Array.isArray(game.Assets)) {
                            gameAssets = game.Assets;
                          } else if (typeof game.Assets === 'string') {
                            try {
                              gameAssets = JSON.parse(game.Assets);
                            } catch {
                              gameAssets = [game.Assets];
                            }
                          }
                        }
                        
                        return (
                          <GameCard
                            key={game.Id}
                            id={game.Id}
                            title={game.Title}
                            creator={game.Developer}
                            description={game.Description}
                            assets={gameAssets}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No favorite games yet. Start exploring!</p>
                      <Link to="/games">
                        <Button>Browse Games</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="creations" className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Created Games</h2>
                  {createdLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      <span>Loading creations...</span>
                    </div>
                  ) : createdGames && createdGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {createdGames.map(game => {
                        // Handle Assets field properly
                        let gameAssets = null;
                        if (game.Assets) {
                          if (Array.isArray(game.Assets)) {
                            gameAssets = game.Assets;
                          } else if (typeof game.Assets === 'string') {
                            try {
                              gameAssets = JSON.parse(game.Assets);
                            } catch {
                              gameAssets = [game.Assets];
                            }
                          }
                        }
                        
                        return (
                          <GameCard
                            key={game.Id}
                            id={game.Id}
                            title={game.Title}
                            creator={game.Developer}
                            description={game.Description}
                            assets={gameAssets}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No games created yet.</p>
                      <Link to="/create">
                        <Button>Create Your First Game</Button>
                      </Link>
                    </div>
                  )}
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
