
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import FriendProfileActions from './FriendProfileActions';

interface FriendProfileHeaderProps {
  friendProfile: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    created_at: string;
  };
  isFriend: boolean;
  onSendMessage: () => void;
  onRemoveFriend: () => void;
}

const FriendProfileHeader: React.FC<FriendProfileHeaderProps> = ({
  friendProfile,
  isFriend,
  onSendMessage,
  onRemoveFriend,
}) => {
  const joinDate = new Date(friendProfile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img 
            src={friendProfile.avatar_url || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150'} 
            alt={friendProfile.display_name || friendProfile.username} 
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center md:text-left flex-grow">
            <CardTitle className="text-2xl mb-2">
              {friendProfile.display_name || friendProfile.username}
            </CardTitle>
            <p className="text-gray-600 mb-2">@{friendProfile.username}</p>
            <p className="text-sm text-gray-500">Member since {joinDate}</p>
          </div>
          {isFriend && (
            <FriendProfileActions
              onSendMessage={onSendMessage}
              onRemoveFriend={onRemoveFriend}
            />
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default FriendProfileHeader;
