
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { useToast } from '@/hooks/use-toast';

export const useNotificationActions = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createNotification = useMutation({
    mutationFn: notificationService.createNotification,
    onSuccess: () => {
      // Invalidate notifications to refresh the list
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to create notification:', error);
      toast({
        title: "Error",
        description: "Failed to create notification",
        variant: "destructive"
      });
    }
  });

  const createFriendRequestNotification = useMutation({
    mutationFn: ({ userId, requesterName, requesterId }: { 
      userId: string; 
      requesterName: string; 
      requesterId: string; 
    }) => notificationService.createFriendRequestNotification(userId, requesterName, requesterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const createFriendAcceptedNotification = useMutation({
    mutationFn: ({ userId, accepterName, accepterId }: { 
      userId: string; 
      accepterName: string; 
      accepterId: string; 
    }) => notificationService.createFriendAcceptedNotification(userId, accepterName, accepterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const createMessageNotification = useMutation({
    mutationFn: ({ userId, senderName, messageContent, senderId }: { 
      userId: string; 
      senderName: string; 
      messageContent: string;
      senderId: string; 
    }) => notificationService.createMessageNotification(userId, senderName, messageContent, senderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const createGameUpdateNotification = useMutation({
    mutationFn: ({ userId, gameTitle, gameId }: { 
      userId: string; 
      gameTitle: string; 
      gameId: string; 
    }) => notificationService.createGameUpdateNotification(userId, gameTitle, gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const createGroupInviteNotification = useMutation({
    mutationFn: ({ userId, groupName, inviterName, groupId }: { 
      userId: string; 
      groupName: string; 
      inviterName: string; 
      groupId: string; 
    }) => notificationService.createGroupInviteNotification(userId, groupName, inviterName, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const createGeneralNotification = useMutation({
    mutationFn: ({ userId, title, message }: { 
      userId: string; 
      title: string; 
      message: string; 
    }) => notificationService.createGeneralNotification(userId, title, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  return {
    createNotification: createNotification.mutate,
    createFriendRequestNotification: createFriendRequestNotification.mutate,
    createFriendAcceptedNotification: createFriendAcceptedNotification.mutate,
    createMessageNotification: createMessageNotification.mutate,
    createGameUpdateNotification: createGameUpdateNotification.mutate,
    createGroupInviteNotification: createGroupInviteNotification.mutate,
    createGeneralNotification: createGeneralNotification.mutate,
    isCreating: createNotification.isPending || 
                createFriendRequestNotification.isPending || 
                createFriendAcceptedNotification.isPending ||
                createMessageNotification.isPending ||
                createGameUpdateNotification.isPending ||
                createGroupInviteNotification.isPending ||
                createGeneralNotification.isPending
  };
};
