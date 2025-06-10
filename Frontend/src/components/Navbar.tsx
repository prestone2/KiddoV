import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, Settings, LogOut, User, Users, Coins, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-auto rounded" />
            </Link>
            <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-auto rounded" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/games" className="text-black-700 hover:text-roblox-blue transition-colors">
              Games
            </Link>
            <Link to="/catalog" className="text-black-700 hover:text-roblox-blue transition-colors">
              Catalog
            </Link>
            <Link to="/create" className="text-black-700 hover:text-roblox-blue transition-colors">
              Create
            </Link>
            <Link to="/groups" className="text-black-700 hover:text-roblox-blue transition-colors">
              Groups
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-black-400" />
          </div>

          {/* Right Side - User Menu or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/robux"
                  className="flex items-center space-x-1 text-white px-3 py-1 rounded transition-colors"
                  style={{ backgroundColor: '#8d0b41' }}
                >
                  <Coins className="w-4 h-4" />
                  <span className="hidden sm:inline">ksh 1,250</span>
                </Link>
                <Link to="/friends">
                  <Button variant="ghost" size="sm">
                    <Users className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="relative group">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <img 
                       src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
                      alt="User Avatar" 
                      className="w-6 h-6 rounded-full"
                    />
                     <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <Link to="/marketplace" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Marketplace
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-roblox-blue hover:bg-roblox-blue/90" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/games" className="text-gray-700 hover:text-roblox-blue transition-colors">
                Games
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-roblox-blue transition-colors">
                Catalog
              </Link>
              <Link to="/create" className="text-gray-700 hover:text-roblox-blue transition-colors">
                Create
              </Link>
              <Link to="/groups" className="text-gray-700 hover:text-roblox-blue transition-colors">
                Groups
              </Link>
              {user && (
                <>
                  <Link to="/friends" className="text-gray-700 hover:text-roblox-blue transition-colors">
                    Friends
                  </Link>
                  <Link to="/robux" className="text-gray-700 hover:text-roblox-blue transition-colors">
                    Robux
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
