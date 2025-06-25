
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Calendar, Trophy, Heart, Star } from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      icon: Users,
      title: "Developer Groups",
      description: "Join specialized groups based on your interests and skill level",
      members: "50K+ members"
    },
    {
      icon: MessageCircle,
      title: "Forums & Discussions",
      description: "Ask questions, share ideas, and get help from the community",
      members: "Active discussions"
    },
    {
      icon: Calendar,
      title: "Events & Contests",
      description: "Participate in community challenges and showcase your creations",
      members: "Weekly events"
    },
    {
      icon: Trophy,
      title: "Recognition Program",
      description: "Get recognized for your contributions to the community",
      members: "Achievement system"
    }
  ];

  const featuredCreators = [
    {
      name: "AlexDev",
      role: "Top Developer",
      games: 15,
      followers: "2.3M",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "GameMaster22",
      role: "Community Leader",
      games: 8,
      followers: "1.8M",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "CreativeBuilder",
      role: "Designer",
      games: 12,
      followers: "950K",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  const communityPosts = [
    {
      user: "DevMaster",
      time: "2 hours ago",
      content: "Just released my new horror game! Would love feedback from the community 🎮",
      likes: 234,
      replies: 45
    },
    {
      user: "ScriptingPro",
      time: "5 hours ago", 
      content: "Hosting a free scripting workshop this weekend. Limited spots available!",
      likes: 156,
      replies: 23
    },
    {
      user: "DesignGuru",
      time: "1 day ago",
      content: "New UI design trends in kiddoverse games - what do you think about minimalist interfaces?",
      likes: 89,
      replies: 67
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">kiddoverse Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with millions of creators, developers, and players from around the world. 
            Share your creations, learn from others, and be part of something amazing.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">200M+</div>
            <div className="text-gray-600">Monthly Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">2M+</div>
            <div className="text-gray-600">Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">40M+</div>
            <div className="text-gray-600">Experiences</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-roblox-blue mb-2">180+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {communityFeatures.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-roblox-blue mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <span className="text-sm text-gray-500">{feature.members}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button variant="outline">Join Now</Button>
            </div>
          ))}
        </div>

        {/* Featured Creators */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Creators</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCreators.map((creator, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <img 
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{creator.name}</h3>
                <p className="text-roblox-blue mb-3">{creator.role}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{creator.games} games</span>
                  <span>{creator.followers} followers</span>
                </div>
                <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Community Feed</h2>
            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-roblox-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {post.user[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold">{post.user}</h4>
                      <span className="text-sm text-gray-500">{post.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <button className="flex items-center hover:text-red-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center hover:text-roblox-blue">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.replies}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Trending Topics</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">#kiddoDevCon2024</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#NewGameRelease</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#ScriptingTips</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#GameJam2024</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">Be part of the world's largest creative platform. Share, learn, and grow with millions of creators.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Create Account
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-roblox-blue">
              Explore Community
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
