import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chat from '@/components/Chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, MessageCircle, Users, Loader2, UserMinus } from 'lucide-react';
import { useFriends } from '@/hooks/useFriends';
import { useAuth } from '@/hooks/useAuth';
import { useUserSearch } from '@/hooks/useUserSearch';
import { Link, useSearchParams } from 'react-router-dom';

const Friends = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'friends';
  const chatFriendId = searchParams.get('chat');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const { user } = useAuth();
  const { friends, friendRequests, isLoading, acceptFriendRequest, declineFriendRequest, removeFriend } = useFriends();
  const { searchResults, isSearching, searchUsers } = useUserSearch();

  // Update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Handle chat parameter from URL
  useEffect(() => {
    if (chatFriendId) {
      const friend = friends.find(f => f.id === chatFriendId);
      if (friend) {
        setSelectedFriend(friend);
      }
    }
  }, [chatFriendId, friends]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchUsers(searchQuery);
    }
  };

  const handleChatOpen = (friend: any) => {
    setSelectedFriend(friend);
  };

  const handleChatClose = () => {
    setSelectedFriend(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-4">You need to be logged in to view your friends.</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading friends...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show chat if a friend is selected
  if (selectedFriend) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <Chat friend={selectedFriend} onClose={handleChatClose} />
        </div>
        <Footer />
      </div>
    );
  }

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
            <Button 
              variant={activeTab === 'search' ? 'default' : 'outline'}
              onClick={() => setActiveTab('search')}
              className={activeTab === 'search' ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
            >
              <Search className="w-4 h-4 mr-2" />
              Add Friends
            </Button>
          </div>

          {/* Search form for Add Friends tab */}
          {activeTab === 'search' && (
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input 
                type="text" 
                placeholder="Search users by username or display name..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          )}
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="grid gap-4">
            {friends.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No friends yet. Start making connections!</p>
              </div>
            ) : (
              friends.map(friend => (
                <div key={friend.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={friend.avatar_url || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150'}
                        alt={friend.display_name || friend.username} 
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{friend.display_name || friend.username}</h3>
                      <p className="text-sm text-gray-600">@{friend.username}</p>
                      <p className="text-xs text-gray-500">{friend.lastSeen}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleChatOpen(friend)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Link to={`/friends/${friend.id}`}>
                      <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                        View Profile
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeFriend(friend.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Friend Requests Tab */}
        {activeTab === 'requests' && (
          <div className="grid gap-4">
            {friendRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending friend requests</p>
              </div>
            ) : (
              friendRequests.map(request => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={request.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'} 
                      alt={request.display_name || request.username} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{request.display_name || request.username}</h3>
                      <p className="text-sm text-gray-600">@{request.username}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => declineFriendRequest(request.relationship_id)}
                    >
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => acceptFriendRequest(request.relationship_id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="grid gap-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Searching users...</span>
              </div>
            ) : searchResults.length === 0 && searchQuery ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found matching "{searchQuery}"</p>
              </div>
            ) : (
              searchResults.map(searchUser => (
                <div key={searchUser.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={searchUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'} 
                      alt={searchUser.display_name || searchUser.username} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{searchUser.display_name || searchUser.username}</h3>
                      <p className="text-sm text-gray-600">@{searchUser.username}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/friends/${searchUser.id}`}>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="bg-roblox-blue hover:bg-roblox-blue/90"
                      onClick={() => searchUser.sendFriendRequest(searchUser.id)}
                      disabled={searchUser.relationshipStatus !== 'none'}
                    >
                      {searchUser.relationshipStatus === 'pending' ? 'Request Sent' : 
                       searchUser.relationshipStatus === 'friends' ? 'Friends' : 
                       'Add Friend'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Friends;
