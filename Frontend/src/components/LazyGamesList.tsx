import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfiniteGames } from '@/hooks/useInfiniteGames';
import { useInfiniteFilteredGames } from '@/hooks/useFilteredGames';

interface LazyGamesListProps {
  genreFilter?: string;
  deviceFilter?: string;
  genderFilter?: string;
  pageSize?: number;
  sortType?: string;
}

const LazyGamesList: React.FC<LazyGamesListProps> = ({
  genreFilter,
  deviceFilter,
  genderFilter,
  pageSize = 12,
  sortType = 'popular',
}) => {
  const hasFilters = (genreFilter && genreFilter !== 'All Genres') || 
                    (deviceFilter && deviceFilter !== 'All Devices') || 
                    (genderFilter && genderFilter !== 'All Genders');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = hasFilters 
    ? useInfiniteFilteredGames(genreFilter, deviceFilter, genderFilter, pageSize, sortType)
    : useInfiniteGames(pageSize, sortType);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading games: {error?.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const allGames = data?.pages.flatMap(page => page.games) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  if (allGames.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No games found matching your filters.</p>
        <p className="text-sm text-gray-500">Try adjusting your filter criteria!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 mb-4">
        Showing {allGames.length} of {totalCount} games
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4">
        {allGames.map((game, index) => (
          <GameCard
            key={`${game.Id}-${index}`}
            id={game.Id}
            title={game.Title || 'Untitled Game'}
            creator={game.Developer || 'Unknown Developer'}
            assets={game.Assets}
            isPremium={game.is_premium || false}
          />
        ))}
      </div>

      {/* Loading indicator and trigger for infinite scroll */}
      <div ref={ref} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="flex items-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading more games...</span>
          </div>
        ) : hasNextPage ? (
          <Button 
            onClick={() => fetchNextPage()} 
            variant="outline"
            disabled={isFetchingNextPage}
          >
            Load More Games
          </Button>
        ) : allGames.length > 0 ? (
          <p className="text-gray-500">You've reached the end of the games list!</p>
        ) : null}
      </div>
    </div>
  );
};

export default LazyGamesList;
