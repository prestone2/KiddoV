
import React from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GamePlayerProps {
  gameUrl: string;
  gameTitle: string;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ gameUrl, gameTitle, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const playerRef = React.useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (playerRef.current?.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        } else if ((playerRef.current as any)?.webkitRequestFullscreen) {
          await (playerRef.current as any).webkitRequestFullscreen();
        } else if ((playerRef.current as any)?.msRequestFullscreen) {
          await (playerRef.current as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={playerRef} className={`fixed inset-0 bg-black z-50 ${isFullscreen ? '' : 'p-4'}`}>
      {!isFullscreen && (
        <div className="flex items-center justify-between bg-gray-900 text-white p-3">
          <h2 className="text-lg font-semibold">{gameTitle}</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-gray-700"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-700"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      )}
      <iframe
        src={gameUrl}
        className="w-full h-full"
        style={{ height: isFullscreen ? '100%' : 'calc(100% - 60px)' }}
        frameBorder="0"
        allowFullScreen
        title={gameTitle}
      />
      {isFullscreen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 text-white hover:bg-gray-700/50 z-10"
        >
          <Minimize2 size={18} />
        </Button>
      )}
    </div>
  );
};

export default GamePlayer;
