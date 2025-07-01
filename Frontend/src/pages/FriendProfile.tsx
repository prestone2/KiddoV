
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, MessageCircle, UserMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useFriends } from '@/hooks/useFriends';
import GameCard from '@/components/GameCard';

const FriendProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { removeFriend } = useFriends();

  // Fetch friend's profile
  const { data: friendProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['friend-profile', id],
    queryFn: async () => {
      if (!id) throw new Error('Friend ID is required');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch friend's favorite games
  const { data: favoriteGames, isLoading: favoritesLoading } = useQuery({
    queryKey: ['friend-favorites', id],
    queryFn: async () => {
      if (!id) return [];
      
      const { data: favorites, error: favError } = await supabase
        .from('user_favorites')
        .select('game_id')
        .eq('user_id', id);

      if (favError || !favorites || favorites.length === 0) return [];

      const gameIds = favorites.map(f => f.game_id);
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .in('Id', gameIds)
        .limit(6);

      if (gamesError) throw gamesError;
      return games || [];
    },
    enabled: !!id,
  });

  // Fetch friend's created games
  const { data: createdGames, isLoading: createdLoading } = useQuery({
    queryKey: ['friend-created-games', id],
    queryFn: async () => {
      if (!id) return [];
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('creator_id', id)
        .limit(6);

      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  // Check if current user is friends with this profile
  const { data: friendshipStatus, isLoading: friendshipLoading } = useQuery({
    queryKey: ['friendship-status', user?.id, id],
    queryFn: async () => {
      if (!user?.id || !id) return null;
      
      const { data, error } = await supabase
        .from('user_relationships')
        .select('*')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .or(`requester_id.eq.${id},addressee_id.eq.${id}`)
        .eq('status', 'accepted')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!id,
  });

  const handleRemoveFriend = () => {
    if (id) {
      removeFriend(id);
      navigate('/friends');
    }
  };

  const handleSendMessage = () => {
    // Navigate to friends page with chat parameter to open chat interface
    navigate(`/friends?chat=${id}`);
  };

  if (profileLoading || friendshipLoading) {
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

  if (!friendProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-gray-600 mb-4">This user profile could not be found.</p>
            <Link to="/friends">
              <Button>Back to Friends</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const joinDate = new Date(friendProfile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  const isFriend = !!friendshipStatus;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/friends')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Friends
          </Button>
        </div>

        {/* Profile header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={friendProfile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'} 
                alt={friendProfile.display_name || friendProfile.username} 
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center md:text-left flex-grow">
                <CardTitle className="text-2xl mb-2">
                  {friendProfile.display_name || friendProfile.username}
                </CardTitle>
                <p className="text-gray-600 mb-2">@{friendProfile.username}</p>
                <p className="text-sm text-gray-500">Member since {joinDate}</p>
              </div>
              {isFriend && (
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-roblox-blue hover:bg-roblox-blue/90"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRemoveFriend}
                    className="text-red-600 hover:text-red-700"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Remove Friend
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Profile content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Favorite Games */}
          <Card>
            <CardHeader>
              <CardTitle>Favorite Games</CardTitle>
            </CardHeader>
            <CardContent>
              {favoritesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Loading favorites...</span>
                </div>
              ) : favoriteGames && favoriteGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteGames.map(game => {
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
                  <p className="text-gray-500">No favorite games yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Created Games */}
          <Card>
            <CardHeader>
              <CardTitle>Created Games</CardTitle>
            </CardHeader>
            <CardContent>
              {createdLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Loading creations...</span>
                </div>
              ) : createdGames && createdGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {createdGames.map(game => {
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
                  <p className="text-gray-500">No games created yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FriendProfile;
