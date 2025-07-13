
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import ReportGameModal from '@/components/ReportGameModal';
import GameDetailHeader from '@/components/GameDetailHeader';
import GameDetailContent from '@/components/GameDetailContent';
import GameSidebar from '@/components/GameSidebar';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { toast } = useToast();
  const { hasPremiumAccess, isAuthenticated } = usePremiumAccess();

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
    // Check if game is premium and user has access
    if (game?.is_premium && !hasPremiumAccess) {
      toast({
        title: "Premium Required",
        description: "This is a premium game. Please upgrade your subscription to play.",
        variant: "destructive",
      });
      return;
    }

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
            <GameDetailHeader gameTitle="Game Not Found" />
            <Button>Back to Games</Button>
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
  const canAccessGame = !game.is_premium || hasPremiumAccess;

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
          <GameDetailHeader gameTitle={game.Title || 'Game'} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GameDetailContent
              game={game}
              gameImage={gameImage}
              playersOnline={playersOnline}
              canAccessGame={canAccessGame}
              onPlayGame={handlePlayGame}
            />

            <GameSidebar
              developer={game.Developer || 'Unknown'}
              createdAt={game.created_at || undefined}
              isPremium={game.is_premium || false}
              genres={game.Genres}
              tags={game.Tags}
              gameId={game.Id}
              onShareGame={handleShareGame}
              onReportGame={() => setIsReportModalOpen(true)}
            />
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
