
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Settings, Users, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Parents = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Content Filtering",
      description: "Age-appropriate content filtering and moderation systems keep your child safe."
    },
    {
      icon: Eye,
      title: "Chat Restrictions", 
      description: "Customizable chat settings let you control who your child can communicate with."
    },
    {
      icon: Settings,
      title: "Account Restrictions",
      description: "Parental controls allow you to restrict who can contact your child and what games they can access."
    },
    {
      icon: Users,
      title: "Friend Management",
      description: "Monitor and manage your child's friend list and social interactions."
    }
  ];

  const ageGroups = [
    {
      age: "Under 9",
      description: "Extra safety restrictions with limited communication features",
      features: ["No chat outside of games", "Limited friend requests", "Curated game experiences"]
    },
    {
      age: "9-12", 
      description: "Balanced safety with more social features as children grow",
      features: ["Filtered chat in games", "Friend requests with approval", "Broader game selection"]
    },
    {
      age: "13+",
      description: "More freedom with continued safety monitoring",
      features: ["Full chat capabilities", "Open friend requests", "Access to all age-appropriate content"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Parents Guide to Roblox</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how Roblox keeps your child safe while they explore, create, and connect with friends in a digital world built for imagination.
          </p>
        </div>

        {/* Safety First Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-800 mb-4">Safety First</h2>
            <p className="text-green-700">
              Your child's safety is our top priority. We've built comprehensive systems to protect young users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Age-Appropriate Experiences */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Age-Appropriate Experiences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="bg-roblox-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">{group.age}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ages {group.age}</h3>
                  <p className="text-gray-600 text-sm">{group.description}</p>
                </div>
                <ul className="space-y-2">
                  {group.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Parental Controls */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Parental Controls</h2>
              <p className="text-gray-600 mb-6">
                Take control of your child's Roblox experience with our comprehensive parental control tools.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Settings className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Set spending limits and monitor purchases</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Control screen time and play sessions</span>
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Review chat logs and friend activities</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Restrict access to specific games or content</span>
                </li>
              </ul>
              <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
                Set Up Parental Controls
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Family using computer together"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Educational Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Creativity</h3>
              <p className="text-gray-600">Building games develops creative thinking and artistic skills.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coding</h3>
              <p className="text-gray-600">Learn programming concepts through Lua scripting in Roblox Studio.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">Work with friends on projects and develop teamwork skills.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Is Roblox safe for my child?</h3>
              <p className="text-gray-600">Yes, we have extensive safety measures including content moderation, chat filtering, and parental controls to ensure a safe environment.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much does Roblox cost?</h3>
              <p className="text-gray-600">Roblox is free to play. Optional purchases for virtual items and currency (Robux) are available with parental approval.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I limit my child's spending?</h3>
              <p className="text-gray-600">Yes, you can set spending limits, require approval for purchases, and monitor all transactions through parental controls.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What age is appropriate for Roblox?</h3>
              <p className="text-gray-600">Roblox is designed for users 9 and older, with additional safety features for younger children and parental oversight.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-roblox-light-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">Create a safe account for your child and explore Roblox together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
                Create Account
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More About Safety
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Parents;
