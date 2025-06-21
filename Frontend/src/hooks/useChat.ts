
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

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
  });

  // Real-time subscription for new messages
  useEffect(() => {
    if (!user || !friendId) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id}))`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', user.id, friendId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, friendId, queryClient]);

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !friendId) throw new Error('User not authenticated or friend not selected');

      console.log('Sending message to:', friendId);

      const { error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: friendId,
          content: content.trim()
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', user.id, friendId] });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
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
