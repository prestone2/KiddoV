
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

export const useFriendsWithNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get all friend relationships
  const { data: friendships = [], isLoading } = useQuery({
    queryKey: ['friendships', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_relationships')
        .select(`
          *,
          requester:profiles!user_relationships_requester_id_fkey(id, username, display_name, avatar_url),
          addressee:profiles!user_relationships_addressee_id_fkey(id, username, display_name, avatar_url)
        `)
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) {
        console.error('Error fetching friendships:', error);
        return [];
      }

      return data || [];
    },
    enabled: !!user,
  });

  // Send friend request
  const sendFriendRequest = useMutation({
    mutationFn: async ({ addresseeId, addresseeName }: { addresseeId: string; addresseeName: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_relationships')
        .insert({
          requester_id: user.id,
          addressee_id: addresseeId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Create notification for the addressee
      await notificationService.createFriendRequestNotification(
        addresseeId,
        user.user_metadata?.display_name || user.email || 'Someone',
        user.id
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Friend request sent!",
        description: "Your friend request has been sent successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send friend request",
        variant: "destructive"
      });
    }
  });

  // Accept friend request
  const acceptFriendRequest = useMutation({
    mutationFn: async ({ relationshipId, requesterId }: { relationshipId: string; requesterId: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_relationships')
        .update({ status: 'accepted' })
        .eq('id', relationshipId)
        .select()
        .single();

      if (error) throw error;

      // Create notification for the requester
      await notificationService.createFriendAcceptedNotification(
        requesterId,
        user.user_metadata?.display_name || user.email || 'Someone',
        user.id
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Friend request accepted!",
        description: "You are now friends!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to accept friend request",
        variant: "destructive"
      });
    }
  });

  // Reject/remove friend request
  const rejectFriendRequest = useMutation({
    mutationFn: async (relationshipId: string) => {
      const { error } = await supabase
        .from('user_relationships')
        .delete()
        .eq('id', relationshipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendships'] });
      toast({
        title: "Friend request rejected",
        description: "The friend request has been removed."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reject friend request",
        variant: "destructive"
      });
    }
  });

  // Process friendships to separate categories
  const friends = friendships.filter(f => f.status === 'accepted');
  const pendingRequests = friendships.filter(f => 
    f.status === 'pending' && f.addressee_id === user?.id
  );
  const sentRequests = friendships.filter(f => 
    f.status === 'pending' && f.requester_id === user?.id
  );

  return {
    friends,
    pendingRequests,
    sentRequests,
    isLoading,
    sendFriendRequest: sendFriendRequest.mutate,
    acceptFriendRequest: acceptFriendRequest.mutate,
    rejectFriendRequest: rejectFriendRequest.mutate,
    isSending: sendFriendRequest.isPending,
    isAccepting: acceptFriendRequest.isPending,
    isRejecting: rejectFriendRequest.isPending
  };
};
