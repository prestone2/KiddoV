
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 ${isFullscreen ? '' : 'p-4'}`}>
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
      <iframe
        src={gameUrl}
        className="w-full h-full"
        style={{ height: 'calc(100% - 60px)' }}
        frameBorder="0"
        allowFullScreen
        title={gameTitle}
      />
    </div>
  );
};

export default GamePlayer;
