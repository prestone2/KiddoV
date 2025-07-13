
import type { Game } from './useGames';

// Helper function to filter games
export const filterGames = (games: Game[], genreFilter?: string, deviceFilter?: string, genderFilter?: string) => {
  let filteredData = games;

  if (genreFilter && genreFilter !== 'All Genres') {
    filteredData = filteredData.filter(game => {
      if (!game.Genres) return false;
      
      // Handle Json type properly
      let genres: any[] = [];
      if (Array.isArray(game.Genres)) {
        genres = game.Genres;
      } else if (typeof game.Genres === 'string') {
        try {
          genres = JSON.parse(game.Genres);
        } catch {
          genres = [game.Genres];
        }
      }
      
      return genres.some(genre => String(genre) === genreFilter);
    });
  }

  if (deviceFilter && deviceFilter !== 'All Devices') {
    filteredData = filteredData.filter(game => {
      if (deviceFilter === 'Mobile') {
        if (!game.MobileReady) return false;
        
        // Handle Json type properly
        let mobileReady: any[] = [];
        if (Array.isArray(game.MobileReady)) {
          mobileReady = game.MobileReady;
        } else if (typeof game.MobileReady === 'string') {
          try {
            mobileReady = JSON.parse(game.MobileReady);
          } catch {
            mobileReady = [game.MobileReady];
          }
        }
        
        return mobileReady.includes(true) || mobileReady.includes('true');
      }
      return true; // For PC/Console, we assume all games are compatible
    });
  }

  if (genderFilter && genderFilter !== 'All Genders') {
    filteredData = filteredData.filter(game => {
      if (!game.Gender) return false;
      
      // Handle Json type properly
      let genders: any[] = [];
      if (Array.isArray(game.Gender)) {
        genders = game.Gender;
      } else if (typeof game.Gender === 'string') {
        try {
          genders = JSON.parse(game.Gender);
        } catch {
          genders = [game.Gender];
        }
      }
      
      return genders.some(gender => String(gender) === genderFilter);
    });
  }

  return filteredData;
};
