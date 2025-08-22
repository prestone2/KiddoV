
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, User, Crown, Palette, Zap, Trophy, Star, Flame } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const marketplaceItems = [

];

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { hasPremiumAccess } = usePremiumAccess();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Gaming Marketplace</h1>
          <p className="text-gray-600 mb-6">Power up your gaming experience with awesome items!</p>

          {/* Avatar Customization Section */}
          <Card className="mb-8 border-2 border-roblox-blue/20 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-roblox-blue">
                <Palette className="h-5 w-5" />
                Avatar Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url || undefined} alt="Your avatar" />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Customize Your Avatar</h3>
                    <p className="text-gray-600 text-sm">
                      Choose from our collection of cartoon avatars
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 flex justify-end">
                  {user ? (
                    hasPremiumAccess ? (
                      <Button 
                        onClick={() => navigate('/avatar-customization')}
                        className="bg-roblox-blue hover:bg-roblox-blue/90"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Customize Avatar
                      </Button>
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-amber-600 mb-2">
                          <Crown className="h-4 w-4" />
                          <span className="text-sm font-medium">Premium Feature</span>
                        </div>
                        <Button 
                          onClick={() => navigate('/subscription')}
                          variant="outline"
                          className="border-amber-500 text-amber-600 hover:bg-amber-50"
                        >
                          Upgrade to Premium
                        </Button>
                      </div>
                    )
                  ) : (
                    <Button 
                      onClick={() => navigate('/login')}
                      variant="outline"
                    >
                      Sign In to Customize
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Input 
                type="text" 
                placeholder="Search items..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-md">
              <option>All Categories</option>
              <option>Power-ups</option>
              <option>Avatar Effects</option>
              <option>Avatar Accessories</option>
              <option>Game Boosters</option>
              <option>VIP Items</option>
              <option>Pets</option>
              <option>Magic Items</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketplaceItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                  {item.icon}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-roblox-blue font-bold text-lg">
                    {item.price} R$
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-roblox-blue hover:bg-roblox-blue/90"
                    disabled={!user}
                  >
                    {user ? 'Buy Now' : 'Sign In'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaming Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Trophy className="h-5 w-5" />
              Pro Gaming Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Use Power-ups Strategically</h4>
                <p className="text-sm text-gray-600">
                  Save your best power-ups for challenging levels or boss fights
                </p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Collect XP Boosters</h4>
                <p className="text-sm text-gray-600">
                  Level up faster with XP boosters during special events
                </p>
              </div>
              <div className="text-center">
                <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Show Off Your Style</h4>
                <p className="text-sm text-gray-600">
                  Customize your avatar to stand out in multiplayer games
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
