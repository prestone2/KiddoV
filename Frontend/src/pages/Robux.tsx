
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, CreditCard, Gift } from 'lucide-react';

const Robux = () => {
  const robuxPackages = [
    { amount: 400, price: 4.99, bonus: 0 },
    { amount: 800, price: 9.99, bonus: 0 },
    { amount: 1700, price: 19.99, bonus: 0 },
    { amount: 4500, price: 49.99, bonus: 450 },
    { amount: 10000, price: 99.99, bonus: 1000 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Get Robux</h1>
          <p className="text-xl text-gray-600">
            Robux is the virtual currency of Roblox that allows you to buy upgrades or accessories for your avatar and buy special abilities in experiences.
          </p>
        </div>

        <div className="mb-8 bg-gradient-to-r from-roblox-blue to-blue-700 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Coins className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Robux Balance</h2>
                <p className="text-blue-100">Current balance</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">1,250 R$</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {robuxPackages.map((pkg, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-shadow">
              {pkg.bonus > 0 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-roblox-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    +{pkg.bonus} Bonus!
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-roblox-blue">
                  {pkg.amount.toLocaleString()} R$
                </CardTitle>
                {pkg.bonus > 0 && (
                  <p className="text-sm text-gray-600">
                    ({(pkg.amount - pkg.bonus).toLocaleString()} + {pkg.bonus} bonus)
                  </p>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold mb-4">${pkg.price}</div>
                <Button className="w-full bg-roblox-blue hover:bg-roblox-blue/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-roblox-blue" />
                Earn Free Robux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Roblox Premium</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Get monthly Robux stipend and other benefits
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Create & Sell</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Earn Robux by creating and selling items
                </p>
                <Button variant="outline" size="sm">Get Started</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span>Credit/Debit Card</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
                <span>PayPal</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Gift className="w-5 h-5 text-green-500" />
                <span>Gift Cards</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Robux;