
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingCart } from 'lucide-react';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'hats', name: 'Hats' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'gear', name: 'Gear' },
    { id: 'faces', name: 'Faces' }
  ];

  const catalogItems = [
    {
      id: 1,
      name: 'Dragon Crown',
      price: 500,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'hats',
      creator: 'Roblox',
      limited: true
    },
    {
      id: 2,
      name: 'Ninja Mask',
      price: 75,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'accessories',
      creator: 'BuildInc',
      limited: false
    },
    {
      id: 3,
      name: 'Space Helmet',
      price: 200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'hats',
      creator: 'SpaceStudio',
      limited: false
    },
    {
      id: 4,
      name: 'Royal Cape',
      price: 350,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'accessories',
      creator: 'RoyalItems',
      limited: true
    },
    {
      id: 5,
      name: 'Cool Sunglasses',
      price: 50,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'accessories',
      creator: 'StyleCorp',
      limited: false
    },
    {
      id: 6,
      name: 'Magic Wand',
      price: 125,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=300',
      category: 'gear',
      creator: 'MagicItems',
      limited: false
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? catalogItems 
    : catalogItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Catalog</h1>
          <p className="text-gray-600 mb-6">Browse and purchase items for your avatar</p>
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input 
                type="text" 
                placeholder="Search catalog..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-roblox-blue hover:bg-roblox-blue/90' : ''}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                {item.limited && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-roblox-red text-white px-2 py-1 rounded text-xs font-semibold">
                      Limited
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">By {item.creator}</p>
                <div className="flex items-center justify-between">
                  <span className="text-roblox-blue font-bold text-sm">{item.price} R$</span>
                  <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90 p-2">
                    <ShoppingCart className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
