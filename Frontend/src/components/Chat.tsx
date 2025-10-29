import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { useOnlineStatus } from "@/hooks/usePresence";
import { Filter } from "bad-words";

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
  const [messageText, setMessageText] = useState("");
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, isSending } = useChat(friend.id);
  const { isUserOnline } = useOnlineStatus([friend.id]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filter = new Filter();
  filter.addWords("sucks", "dumb", "idiot", "stupid");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && !isSending) {
      if (filter.isProfane(messageText)) {
        alert("⚠️ Message contains inappropriate language. Please rephrase.");
        return;
      }

      sendMessage(messageText);
      setMessageText("");
    }
  };
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 mr-3"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <img
          src={
            friend.avatar_url ||
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150"
          }
          alt={friend.display_name || friend.username}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">@{friend.username}</h3>
          <p className="text-sm opacity-75">
            {isUserOnline(friend.id) ? (
              <span className="text-green-300">● Online</span>
            ) : (
              <span className="text-gray-400">● Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">Loading messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">
              No messages yet. Start the conversation!
            </span>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                    isOwn
                      ? "bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      isOwn ? "text-pink-100" : "text-gray-500"
                    }`}
                  >
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
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isSending}
            className="flex-1 rounded-full border-gray-300 focus:border-[#8d0b41] focus:ring-2 focus:ring-[#8d0b41]/40 px-4 py-2"
          />
          <Button
            type="submit"
            disabled={!messageText.trim() || isSending}
            className="bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] hover:from-[#750935] hover:to-[#8d0b41] rounded-full px-6 py-2 shadow-lg transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
