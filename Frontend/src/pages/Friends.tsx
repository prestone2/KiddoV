
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, MessageCircle, Users } from 'lucide-react';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');

  const friends = [
    {
      id: 1,
      username: 'GameMaster99',
      displayName: 'Mike',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'online',
      lastSeen: 'Online'
    },
    {
      id: 2,
      username: 'BuilderPro',
      displayName: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'offline',
      lastSeen: '2 hours ago'
    },
    {
      id: 3,
      username: 'RocketGamer',
      displayName: 'Jake',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
      status: 'online',
      lastSeen: 'Online'
    }
  ];

  const friendRequests = [
    {
      id: 1,
      username: 'NewPlayer123',
      displayName: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Friends</h1>
          
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeTab === 'friends' ? 'default' : 'outline'}
              onClick={() => setActiveTab('friends')}
              className={activeTab === 'friends' ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
            >
              <Users className="w-4 h-4 mr-2" />
              Friends ({friends.length})
            </Button>
            <Button 
              variant={activeTab === 'requests' ? 'default' : 'outline'}
              onClick={() => setActiveTab('requests')}
              className={activeTab === 'requests' ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Requests ({friendRequests.length})
            </Button>
          </div>

          <div className="relative mb-6">
            <Input 
              type="text" 
              placeholder="Search friends..." 
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {activeTab === 'friends' && (
          <div className="grid gap-4">
            {friends.map(friend => (
              <div key={friend.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={friend.avatar} 
                      alt={friend.displayName} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{friend.displayName}</h3>
                    <p className="text-sm text-gray-600">@{friend.username}</p>
                    <p className="text-xs text-gray-500">{friend.lastSeen}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="grid gap-4">
            {friendRequests.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={request.avatar} 
                    alt={request.displayName} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{request.displayName}</h3>
                    <p className="text-sm text-gray-600">@{request.username}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    Accept
                  </Button>
                </div>
              </div>
            ))}
            {friendRequests.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending friend requests</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Friends;
