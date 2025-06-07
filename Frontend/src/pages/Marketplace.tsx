
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const marketplaceItems = [
  {
    id: 1,
    name: 'Cool Hat',
    price: 100,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Hats'
  },
  {
    id: 2,
    name: 'Awesome Shirt',
    price: 50,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Shirts'
  },
  {
    id: 3,
    name: 'Epic Sword',
    price: 250,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Gear'
  },
  {
    id: 4,
    name: 'Super Wings',
    price: 300,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Accessories'
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
          <p className="text-gray-600 mb-6">Customize your avatar with awesome items!</p>
          
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
              <option>Hats</option>
              <option>Shirts</option>
              <option>Gear</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {marketplaceItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-roblox-blue font-bold">{item.price} R$</span>
                  <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                    Buy
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

export default Marketplace;