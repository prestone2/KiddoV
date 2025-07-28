import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from '@/components/SearchResults';
import NotificationDropdown from '@/components/NotificationDropdown';
import NotificationBell from '@/components/NotificationBell';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { user, signOut } = useAuth();
  const { data: searchResults, isLoading: searchLoading } = useSearch(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.length >= 2);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Games', href: '/games' },
    { name: 'Create', href: '/create' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Friends', href: '/friends' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-auto rounded" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for games..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              
              {showSearchResults && (
                <SearchResults
                  query={searchQuery}
                  results={searchResults}
                  isLoading={searchLoading}
                  onClose={closeSearchResults}
                />
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-roblox-blue font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NotificationBell />
                 <Link to="/subscription">
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Button>
                </Link>
                {/* <Link to="/robux">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    Buy Robux
                  </Button>
                </Link> */}
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <div className="mb-4 relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for games ..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                
                {showSearchResults && (
                  <SearchResults
                    query={searchQuery}
                    results={searchResults}
                    isLoading={searchLoading}
                    onClose={closeSearchResults}
                  />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-gray-700 hover:text-roblox-blue font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 space-y-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notifications</span>
                    <NotificationBell />
                  </div>
                  <Link to="/subscription" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-purple-600 border-purple-600">
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </Button>
                  </Link>
                  {/* <Link to="/robux" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-green-600 border-green-600">
                      Buy Robux
                    </Button>
                  </Link> */}
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 space-y-2 border-t">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full bg-roblox-blue hover:bg-roblox-blue/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
