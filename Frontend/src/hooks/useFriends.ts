
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

      const { data, error } = await supabase
        .from('user_relationships')
        .select(`
          *,
          requester:profiles!user_relationships_requester_id_fkey(id, username, display_name, avatar_url),
          addressee:profiles!user_relationships_addressee_id_fkey(id, username, display_name, avatar_url)
        `)
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) {
        console.error('Error fetching friends:', error);
        return [];
      }

      return data?.map(relationship => {
        const friend = relationship.requester_id === user.id ? relationship.addressee : relationship.requester;
        return {
          id: friend.id,
          username: friend.username,
          display_name: friend.display_name,
          avatar_url: friend.avatar_url,
          status: Math.random() > 0.5 ? 'online' : 'offline', // Mock status
          lastSeen: Math.random() > 0.5 ? 'Online' : `${Math.floor(Math.random() * 24)} hours ago`,
        };
      }) || [];
    },
    enabled: !!user,
  });

  const { data: friendRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['friend-requests', user?.id],
    queryFn: async (): Promise<FriendRequest[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_relationships')
        .select(`
          id,
          requester:profiles!user_relationships_requester_id_fkey(id, username, display_name, avatar_url)
        `)
        .eq('status', 'pending')
        .eq('addressee_id', user.id);

      if (error) {
        console.error('Error fetching friend requests:', error);
        return [];
      }

      return data?.map(request => ({
        id: request.requester.id,
        username: request.requester.username,
        display_name: request.requester.display_name,
        avatar_url: request.requester.avatar_url,
        relationship_id: request.id,
      })) || [];
    },
    enabled: !!user,
  });

  const sendFriendRequest = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user) throw new Error('User not authenticated');

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

  return {
    friends,
    friendRequests,
    isLoading: friendsLoading || requestsLoading,
    sendFriendRequest: sendFriendRequest.mutate,
    acceptFriendRequest: acceptFriendRequest.mutate,
    declineFriendRequest: declineFriendRequest.mutate,
  };
};
