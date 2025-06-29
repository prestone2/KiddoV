
import { supabase } from '@/integrations/supabase/client';

export type NotificationType = 'friend_request' | 'friend_accepted' | 'game_update' | 'group_invite' | 'message' | 'general';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string;
}

export const notificationService = {
  async createNotification({ userId, type, title, message, relatedId }: CreateNotificationParams) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type,
          title,
          message,
          related_id: relatedId,
          is_read: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating notification:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createNotification:', error);
      return null;
    }
  },

  // Helper methods for common notification types
  async createFriendRequestNotification(userId: string, requesterName: string, requesterId: string) {
    return this.createNotification({
      userId,
      type: 'friend_request',
      title: 'Friend Request',
      message: `${requesterName} sent you a friend request`,
      relatedId: requesterId
    });
  },

  async createFriendAcceptedNotification(userId: string, accepterName: string, accepterId: string) {
    return this.createNotification({
      userId,
      type: 'friend_accepted',
      title: 'Friend Request Accepted',
      message: `${accepterName} accepted your friend request`,
      relatedId: accepterId
    });
  },

  async createMessageNotification(userId: string, senderName: string, messageContent: string, senderId: string) {
    return this.createNotification({
      userId,
      type: 'message',
      title: 'New Message',
      message: `${senderName} sent you a message: "${messageContent.length > 50 ? messageContent.substring(0, 50) + '...' : messageContent}"`,
      relatedId: senderId
    });
  },

  async createGameUpdateNotification(userId: string, gameTitle: string, gameId: string) {
    return this.createNotification({
      userId,
      type: 'game_update',
      title: 'Game Update',
      message: `${gameTitle} has been updated with new features`,
      relatedId: gameId
    });
  },

  async createGroupInviteNotification(userId: string, groupName: string, inviterName: string, groupId: string) {
    return this.createNotification({
      userId,
      type: 'group_invite',
      title: 'Group Invitation',
      message: `${inviterName} invited you to join ${groupName}`,
      relatedId: groupId
    });
  },

  async createGeneralNotification(userId: string, title: string, message: string) {
    return this.createNotification({
      userId,
      type: 'general',
      title,
      message
    });
  },

  // Bulk notification creation for multiple users
  async createBulkNotifications(notifications: CreateNotificationParams[]) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notifications.map(notif => ({
          user_id: notif.userId,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          related_id: notif.relatedId,
          is_read: false
        })));

      if (error) {
        console.error('Error creating bulk notifications:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in createBulkNotifications:', error);
      return false;
    }
  }
};
