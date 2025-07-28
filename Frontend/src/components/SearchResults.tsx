
import React from 'react';
import { Link } from 'react-router-dom';
import { GamepadIcon, Loader2 } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  results: {
    games: any[];
  } | undefined;
  isLoading: boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  query, 
  results, 
  isLoading, 
  onClose 
}) => {
  if (!query || query.length < 2) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {isLoading ? (
        <div className="p-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Searching games...</span>
        </div>
      ) : results && results.games.length > 0 ? (
        <div className="p-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 px-2 py-1 flex items-center">
              <GamepadIcon className="h-4 w-4 mr-1" />
              Games ({results.games.length})
            </h3>
            {results.games.map(game => (
              <Link
                key={game.Id}
                to={`/games/${game.Id}`}
                onClick={onClose}
                className="block px-2 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={
                      game.Assets && Array.isArray(game.Assets) 
                        ? game.Assets[0] 
                        : game.Assets && typeof game.Assets === 'string'
                        ? JSON.parse(game.Assets)[0] || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=100&h=100'
                        : 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=100&h=100'
                    }
                    alt={game.Title || 'Game'}
                    className="w-10 h-10 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=100&h=100';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{game.Title || 'Untitled Game'}</p>
                    <p className="text-xs text-gray-500 truncate">{game.Developer || 'Unknown Developer'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : query.length >= 2 ? (
        <div className="p-4 text-center">
          <GamepadIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">No games found for "{query}"</p>
          <p className="text-xs text-gray-500 mt-1">Try different keywords or check spelling</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
