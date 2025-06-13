
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';

interface FavoriteButtonProps {
  gameId: string;
  size?: 'sm' | 'default' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId, size = 'default' }) => {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite } = useFavorites();

  if (!user) {
    return null;
  }

  const isLoading = isAddingFavorite || isRemovingFavorite;
  const favorited = isFavorite(gameId);

  const handleClick = () => {
    if (favorited) {
      removeFavorite(gameId);
    } else {
      addFavorite(gameId);
    }
  };

  return (
    <Button
      variant={favorited ? 'default' : 'outline'}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={favorited ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
      )}
      {size !== 'sm' && (
        <span className="ml-2">
          {favorited ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </Button>
  );
};

export default FavoriteButton;
