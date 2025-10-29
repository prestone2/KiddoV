import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  UserPlus,
  MessageCircle,
  Users,
  Loader2,
  UserMinus,
} from "lucide-react";
import { useFriends } from "@/hooks/useFriends";
import { useAuth } from "@/hooks/useAuth";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useOnlineStatus } from "@/hooks/usePresence";

import { formatLastSeen } from "@/utils/timeUtils";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "@/components/Seo";

const Friends = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "friends";
  const chatFriendId = searchParams.get("chat");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendFilter, setFriendFilter] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const { user } = useAuth();
  const {
    friends,
    friendRequests,
    isLoading,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
  } = useFriends();
  const { searchResults, isSearching, searchUsers } = useUserSearch();
  const friendIds = friends.map((f) => f.id);
  const { isUserOnline } = useOnlineStatus(friendIds);

  // Update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Handle chat parameter from URL
  useEffect(() => {
    if (chatFriendId) {
      const friend = friends.find((f) => f.id === chatFriendId);
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

  // Filter friends based on name
  const filteredFriends = friends.filter((friend) => {
    if (!friendFilter.trim()) return true;
    const displayName = (friend.display_name || "").toLowerCase();
    const username = friend.username.toLowerCase();
    const filterTerm = friendFilter.toLowerCase();
    return displayName.includes(filterTerm) || username.includes(filterTerm);
  });

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Seo
          title="Friends & Safe Social Play"
          description="Build friendships and enjoy positive social play in a safe, moderated environment. Kiddovase ensures that every chat and interaction is secure, age-appropriate, and respectful."
          keywords="safe chat, kids social play, moderated communication, child-friendly community, online safety for kids"
          canonicalUrl="https://kiddovase.com/friends"
        />
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your friends.
            </p>
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
              variant={activeTab === "friends" ? "default" : "outline"}
              onClick={() => setActiveTab("friends")}
              className={
                activeTab === "friends"
                  ? "bg-roblox-blue hover:bg-roblox-blue/90"
                  : ""
              }
            >
              <Users className="w-4 h-4 mr-2" />
              Friends ({friends.length})
            </Button>
            <Button
              variant={activeTab === "requests" ? "default" : "outline"}
              onClick={() => setActiveTab("requests")}
              className={
                activeTab === "requests"
                  ? "bg-roblox-blue hover:bg-roblox-blue/90"
                  : ""
              }
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Requests ({friendRequests.length})
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              onClick={() => setActiveTab("search")}
              className={
                activeTab === "search"
                  ? "bg-roblox-blue hover:bg-roblox-blue/90"
                  : ""
              }
            >
              <Search className="w-4 h-4 mr-2" />
              Add Friends
            </Button>
          </div>

          {/* Filter form for Friends tab */}
          {activeTab === "friends" && friends.length > 0 && (
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Filter friends by name..."
                className="pl-10"
                value={friendFilter}
                onChange={(e) => setFriendFilter(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          )}

          {/* Search form for Add Friends tab */}
          {activeTab === "search" && (
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
        {activeTab === "friends" && (
          <div className="grid gap-4">
            {friends.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No friends yet. Start making connections!
                </p>
              </div>
            ) : filteredFriends.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No friends found matching "{friendFilter}"
                </p>
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            friend.avatar_url ||
                            "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150"
                          }
                          alt={friend.display_name || friend.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            isUserOnline(friend.id)
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {isUserOnline(friend.id) && (
                            <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">
                          {friend.display_name || friend.username}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          @{friend.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isUserOnline(friend.id) ? (
                            <span className="text-green-600 font-medium">
                              Online
                            </span>
                          ) : (
                            `Last seen ${formatLastSeen(friend.last_seen)}`
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-row gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChatOpen(friend)}
                        className="flex-1 sm:flex-none"
                      >
                        <MessageCircle className="w-4 h-4 sm:mr-0" />
                        <span className="ml-2 sm:hidden">Chat</span>
                      </Button>
                      <Link
                        to={`/friends/${friend.id}`}
                        className="flex-1 sm:flex-none"
                      >
                        <Button
                          size="sm"
                          className="bg-roblox-blue hover:bg-roblox-blue/90 w-full"
                        >
                          <span className="hidden sm:inline">View Profile</span>
                          <span className="sm:hidden">Profile</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFriend(friend.id)}
                        className="text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                      >
                        <UserMinus className="w-4 h-4 sm:mr-0" />
                        <span className="ml-2 sm:hidden">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Friend Requests Tab */}
        {activeTab === "requests" && (
          <div className="grid gap-4">
            {friendRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending friend requests</p>
              </div>
            ) : (
              friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        request.avatar_url ||
                        "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150"
                      }
                      alt={request.display_name || request.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {request.display_name || request.username}
                      </h3>
                      <p className="text-sm text-gray-600">
                        @{request.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        declineFriendRequest(request.relationship_id)
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() =>
                        acceptFriendRequest(request.relationship_id)
                      }
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
        {activeTab === "search" && (
          <div className="grid gap-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Searching users...</span>
              </div>
            ) : searchResults.length === 0 && searchQuery ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No users found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              searchResults.map((searchUser) => (
                <div
                  key={searchUser.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        searchUser.avatar_url ||
                        "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=150&h=150"
                      }
                      alt={searchUser.display_name || searchUser.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {searchUser.display_name || searchUser.username}
                      </h3>
                      <p className="text-sm text-gray-600">
                        @{searchUser.username}
                      </p>
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
                      onClick={() =>
                        searchUser.sendFriendRequest(searchUser.id)
                      }
                      disabled={searchUser.relationshipStatus !== "none"}
                    >
                      {searchUser.relationshipStatus === "pending"
                        ? "Request Sent"
                        : searchUser.relationshipStatus === "friends"
                        ? "Friends"
                        : "Add Friend"}
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
