
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useFriends } from '@/hooks/useFriends';

interface SearchUser {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  relationshipStatus: 'none' | 'pending' | 'friends';
  sendFriendRequest: (userId: string) => void;
}

export const useUserSearch = () => {
  const { user } = useAuth();
  const { sendFriendRequest } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults = [], isLoading: isSearching, refetch } = useQuery({
    queryKey: ['user-search', searchQuery, user?.id],
    queryFn: async (): Promise<SearchUser[]> => {
      if (!user || !searchQuery.trim()) return [];

      console.log('Searching for users with query:', searchQuery);

      // Search for users by username or display name
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`)
        .neq('id', user.id)
        .limit(10);

      if (error) {
        console.error('Error searching users:', error);
        return [];
      }

      if (!profiles || profiles.length === 0) return [];

      // Get existing relationships for these users
      const userIds = profiles.map(p => p.id);
      const { data: relationships } = await supabase
        .from('user_relationships')
        .select('*')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .or(`requester_id.in.(${userIds.join(',')}),addressee_id.in.(${userIds.join(',')})`);

      return profiles.map(profile => {
        // Check relationship status
        const relationship = relationships?.find(rel => 
          (rel.requester_id === user.id && rel.addressee_id === profile.id) ||
          (rel.addressee_id === user.id && rel.requester_id === profile.id)
        );

        let relationshipStatus: 'none' | 'pending' | 'friends' = 'none';
        if (relationship) {
          if (relationship.status === 'accepted') {
            relationshipStatus = 'friends';
          } else if (relationship.status === 'pending') {
            relationshipStatus = 'pending';
          }
        }

        return {
          id: profile.id,
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          relationshipStatus,
          sendFriendRequest: (userId: string) => {
            sendFriendRequest(userId);
            refetch(); // Refresh search results
          }
        };
      });
    },
    enabled: !!user && !!searchQuery.trim(),
  });

  const searchUsers = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchResults,
    isSearching,
    searchUsers,
  };
};
