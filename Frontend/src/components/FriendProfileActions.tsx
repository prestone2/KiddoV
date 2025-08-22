
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, UserMinus } from 'lucide-react';

interface FriendProfileActionsProps {
  onSendMessage: () => void;
  onRemoveFriend: () => void;
}

const FriendProfileActions: React.FC<FriendProfileActionsProps> = ({
  onSendMessage,
  onRemoveFriend,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Button 
        onClick={onSendMessage}
        className="bg-roblox-blue hover:bg-roblox-blue/90"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Message
      </Button>
      <Button 
        variant="outline" 
        onClick={onRemoveFriend}
        className="text-red-600 hover:text-red-700"
      >
        <UserMinus className="w-4 h-4 mr-2" />
        Remove Friend
      </Button>
    </div>
  );
};

export default FriendProfileActions;
