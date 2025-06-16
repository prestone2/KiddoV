
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  status: 'online' | 'offline';
  lastSeen: string;
}

interface FriendRequest {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  relationship_id: string;
}

export const useFriends = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ['friends', user?.id],
    queryFn: async (): Promise<Friend[]> => {
      if (!user) return [];

      console.log('Fetching friends for user:', user.id);

      // Get accepted relationships
      const { data: relationships, error } = await supabase
        .from('user_relationships')
        .select('*')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) {
        console.error('Error fetching relationships:', error);
        return [];
      }

      if (!relationships || relationships.length === 0) return [];

      // Get friend user IDs
      const friendIds = relationships.map(rel => 
        rel.requester_id === user.id ? rel.addressee_id : rel.requester_id
      );

      // Get friend profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', friendIds);

      if (profilesError) {
        console.error('Error fetching friend profiles:', profilesError);
        return [];
      }

      return profiles?.map(profile => ({
        id: profile.id,
        username: profile.username,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        status: Math.random() > 0.5 ? 'online' : 'offline' as 'online' | 'offline',
        lastSeen: Math.random() > 0.5 ? 'Online' : `${Math.floor(Math.random() * 24)} hours ago`,
      })) || [];
    },
    enabled: !!user,
  });

  const { data: friendRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['friend-requests', user?.id],
    queryFn: async (): Promise<FriendRequest[]> => {
      if (!user) return [];

      console.log('Fetching friend requests for user:', user.id);

      // Get pending requests where current user is the addressee
      const { data: relationships, error } = await supabase
        .from('user_relationships')
        .select('*')
        .eq('status', 'pending')
        .eq('addressee_id', user.id);

      if (error) {
        console.error('Error fetching friend requests:', error);
        return [];
      }

      if (!relationships || relationships.length === 0) return [];

      // Get requester profiles
      const requesterIds = relationships.map(rel => rel.requester_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', requesterIds);

      if (profilesError) {
        console.error('Error fetching requester profiles:', profilesError);
        return [];
      }

      return relationships.map(request => {
        const profile = profiles?.find(p => p.id === request.requester_id);
        return {
          id: profile?.id || '',
          username: profile?.username || '',
          display_name: profile?.display_name || null,
          avatar_url: profile?.avatar_url || null,
          relationship_id: request.id,
        };
      }).filter(req => req.id);
    },
    enabled: !!user,
  });

  const sendFriendRequest = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Sending friend request to:', targetUserId);

      // Check if relationship already exists
      const { data: existingRelationship } = await supabase
        .from('user_relationships')
        .select('*')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .or(`requester_id.eq.${targetUserId},addressee_id.eq.${targetUserId}`)
        .single();

      if (existingRelationship) {
        throw new Error('Relationship already exists');
      }

      const { error } = await supabase
        .from('user_relationships')
        .insert([{
          requester_id: user.id,
          addressee_id: targetUserId,
          status: 'pending'
        }]);

      if (error) throw error;

      // Create notification for the target user
      await supabase
        .from('notifications')
        .insert([{
          user_id: targetUserId,
          type: 'friend_request',
          title: 'New Friend Request',
          message: `${user.email} sent you a friend request`,
          related_id: user.id
        }]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-search'] });
      toast({
        title: "Friend request sent",
        description: "Your friend request has been sent!",
      });
    },
    onError: (error) => {
      console.error('Error sending friend request:', error);
      toast({
        title: "Error",
        description: "Failed to send friend request.",
        variant: "destructive",
      });
    },
  });

  const acceptFriendRequest = useMutation({
    mutationFn: async (relationshipId: string) => {
      console.log('Accepting friend request:', relationshipId);

      const { error } = await supabase
        .from('user_relationships')
        .update({ status: 'accepted', updated_at: new Date().toISOString() })
        .eq('id', relationshipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      toast({
        title: "Friend request accepted",
        description: "You are now friends!",
      });
    },
    onError: (error) => {
      console.error('Error accepting friend request:', error);
      toast({
        title: "Error",
        description: "Failed to accept friend request.",
        variant: "destructive",
      });
    },
  });

  const declineFriendRequest = useMutation({
    mutationFn: async (relationshipId: string) => {
      console.log('Declining friend request:', relationshipId);

      const { error } = await supabase
        .from('user_relationships')
        .delete()
        .eq('id', relationshipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      toast({
        title: "Friend request declined",
        description: "Friend request has been declined.",
      });
    },
    onError: (error) => {
      console.error('Error declining friend request:', error);
      toast({
        title: "Error",
        description: "Failed to decline friend request.",
        variant: "destructive",
      });
    },
  });

  const removeFriend = useMutation({
    mutationFn: async (friendId: string) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Removing friend:', friendId);

      // Find and delete the relationship
      const { error } = await supabase
        .from('user_relationships')
        .delete()
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .or(`requester_id.eq.${friendId},addressee_id.eq.${friendId}`)
        .eq('status', 'accepted');

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast({
        title: "Friend removed",
        description: "Friend has been removed from your friends list.",
      });
    },
    onError: (error) => {
      console.error('Error removing friend:', error);
      toast({
        title: "Error",
        description: "Failed to remove friend.",
        variant: "destructive",
      });
    },
  });

  return {
    friends,
    friendRequests,
    isLoading: friendsLoading || requestsLoading,
    sendFriendRequest: sendFriendRequest.mutate,
    acceptFriendRequest: acceptFriendRequest.mutate,
    declineFriendRequest: declineFriendRequest.mutate,
    removeFriend: removeFriend.mutate,
  };
};
