
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export const useChat = (friendId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', user?.id, friendId],
    queryFn: async (): Promise<Message[]> => {
      if (!user || !friendId) return [];

      console.log('Fetching messages between:', user.id, 'and', friendId);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${friendId},receiver_id.eq.${friendId}`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      // Filter messages to only show conversation between current user and friend
      return data?.filter(msg => 
        (msg.sender_id === user.id && msg.receiver_id === friendId) ||
        (msg.sender_id === friendId && msg.receiver_id === user.id)
      ) || [];
    },
    enabled: !!user && !!friendId,
    refetchInterval: 3000, // Poll for new messages every 3 seconds
  });

  // No real-time subscriptions - using polling instead

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !friendId) throw new Error('User not authenticated or friend not selected');

      console.log('Sending message to:', friendId, 'from user:', user.id);

      // Insert the message first
      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: friendId,
          content: content.trim()
        }]);

      if (messageError) {
        console.error('Error inserting message:', messageError);
        throw messageError;
      }

      console.log('Message sent successfully, now creating notification...');

      // Get sender's profile info for the notification
      const { data: senderProfile, error: profileError } = await supabase
        .from('profiles')
        .select('username, display_name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching sender profile:', profileError);
        // Don't throw error here, message was sent successfully
        return;
      }

      if (!senderProfile) {
        console.warn('No sender profile found, skipping notification');
        return;
      }

      console.log('Sender profile found:', senderProfile);

      // Create notification for the receiver
      const senderName = senderProfile.display_name || senderProfile.username;
      console.log('Creating notification for receiver:', friendId, 'from sender:', senderName);
      
      try {
        const notificationResult = await notificationService.createMessageNotification(
          friendId,
          senderName,
          content,
          user.id
        );
        console.log('Notification created successfully:', notificationResult);
      } catch (notificationError) {
        console.error('Failed to create notification:', notificationError);
        // Don't throw error here, message was sent successfully
        // The notification failure shouldn't block the message sending
      }
    },
    onSuccess: () => {
      console.log('Message mutation completed successfully');
      queryClient.invalidateQueries({ queryKey: ['messages', user.id, friendId] });
      // Also invalidate notifications to show the new notification
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Error in sendMessage mutation:', error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    },
  });

  return {
    messages,
    isLoading,
    sendMessage: sendMessage.mutate,
    isSending: sendMessage.isPending,
  };
};
