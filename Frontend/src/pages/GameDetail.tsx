
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import FavoriteButton from '@/components/FavoriteButton';
import ReportGameModal from '@/components/ReportGameModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, ArrowLeft, Users, Star, Share, Flag } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: game, isLoading, error } = useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      if (!id) throw new Error('Game ID is required');
      
      console.log('Fetching game details for ID:', id);
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('Id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching game:', error);
        throw error;
      }

      console.log('Fetched game:', data);
      return data;
    },
    enabled: !!id,
  });

  const handlePlayGame = () => {
    if (game?.GameURL) {
      setIsPlaying(true);
    } else {
      toast({
        title: "Game not available",
        description: "This game cannot be played at the moment.",
        variant: "destructive",
      });
    }
  };

  const handleShareGame = async () => {
    try {
      const gameUrl = `${window.location.origin}/games/${id}`;
      await navigator.clipboard.writeText(gameUrl);
      toast({
        title: "Link Copied!",
        description: "Game link has been copied to your clipboard.",
      });
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = `${window.location.origin}/games/${id}`;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: "Link Copied!",
          description: "Game link has been copied to your clipboard.",
        });
      } catch (fallbackError) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy link to clipboard.",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading game...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
            <p className="text-gray-600 mb-4">The game you're looking for doesn't exist.</p>
            <Link to="/games">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get game image from Assets array or use fallback
  const gameImage = game.Assets && Array.isArray(game.Assets) && game.Assets.length > 0 
    ? String(game.Assets[0])
    : 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=600';

  const playersOnline = Math.floor(Math.random() * 100000);

  return (
    <>
      {isPlaying && game.GameURL && (
        <GamePlayer
          gameUrl={game.GameURL}
          gameTitle={game.Title || 'Game'}
          onClose={() => setIsPlaying(false)}
        />
      )}
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="mb-6">
            <Link to="/games" className="flex items-center text-blue-600 hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Game Image and Play Button */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={gameImage} 
                        alt={game.Title || 'Game'} 
                        className="w-full h-96 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=600';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button 
                          size="lg" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handlePlayGame}
                        >
                          <Play className="mr-2 h-6 w-6" />
                          Play Game
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{game.Title || 'Untitled Game'}</h1>
                          <p className="text-lg text-gray-600">by {game.Developer || 'Unknown Developer'}</p>
                        </div>
                        <Button 
                          size="lg" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handlePlayGame}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Play
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-green-500" />
                          <span className="font-semibold">{playersOnline.toLocaleString()}</span>
                          <span className="text-gray-600 ml-1">playing</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-500" />
                          <span className="font-semibold">4.8</span>
                          <span className="text-gray-600 ml-1">(2.1k)</span>
                        </div>
                        <FavoriteButton gameId={id!} size="sm" />
                      </div>

                      {game.Description && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-3">About</h3>
                          <p className="text-gray-700 leading-relaxed">{game.Description}</p>
                        </div>
                      )}

                      {game.KeyFeatures && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                          <p className="text-gray-700">{game.KeyFeatures}</p>
                        </div>
                      )}

                      {game.Instructions && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3">How to Play</h3>
                          <p className="text-gray-700">{game.Instructions}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Game Info Sidebar */}
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Game Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Developer:</span>
                        <p className="text-gray-600">{game.Developer || 'Unknown'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>
                        <p className="text-gray-600">
                          {game.created_at ? new Date(game.created_at).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                      {game.Genres && Array.isArray(game.Genres) && game.Genres.length > 0 && (
                        <div>
                          <span className="font-medium">Genres:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {game.Genres.map((genre, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {String(genre)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {game.Tags && Array.isArray(game.Tags) && game.Tags.length > 0 && (
                        <div>
                          <span className="font-medium">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {game.Tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                {String(tag)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <FavoriteButton gameId={id!} size="default" />
                      <Button className="w-full" variant="outline" onClick={handleShareGame}>
                        <Share className="mr-2 h-4 w-4" />
                        Share Game
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setIsReportModalOpen(true)}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        Report Game
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>

      <ReportGameModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        gameId={id!}
        gameTitle={game.Title || 'Unknown Game'}
      />
    </>
  );
};

export default GameDetail;
