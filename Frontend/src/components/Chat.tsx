
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

interface ChatProps {
  friend: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ friend, onClose }) => {
  const [messageText, setMessageText] = useState('');
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, isSending } = useChat(friend.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && !isSending) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b bg-roblox-blue text-white rounded-t-lg">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/20 mr-3"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <img 
          src={friend.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'} 
          alt={friend.display_name || friend.username} 
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">{friend.display_name || friend.username}</h3>
          <p className="text-sm opacity-75">@{friend.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">Loading messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">No messages yet. Start the conversation!</span>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            return (
              <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwn 
                    ? 'bg-roblox-blue text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isSending}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!messageText.trim() || isSending}
            className="bg-roblox-blue hover:bg-roblox-blue/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
