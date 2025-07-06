
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Users, Eye, Lock, MessageSquare, UserX, Flag } from 'lucide-react';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Content Moderation",
      description: "Our AI-powered moderation system reviews all content 24/7 to ensure a safe environment for all users."
    },
    {
      icon: MessageSquare,
      title: "Chat Filtering",
      description: "Advanced chat filters automatically block inappropriate language and personal information sharing."
    },
    {
      icon: UserX,
      title: "Blocking & Reporting",
      description: "Easy-to-use tools allow users to block others and report inappropriate behavior instantly."
    },
    {
      icon: Eye,
      title: "Parental Controls",
      description: "Comprehensive parental controls help parents manage their child's online experience."
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Strong privacy settings ensure personal information stays private and secure."
    },
    {
      icon: Flag,
      title: "Community Guidelines",
      description: "Clear community guidelines help users understand what behavior is expected and acceptable."
    }
  ];

  const safetyTips = [
    {
      title: "Never Share Personal Information",
      description: "Don't share your real name, address, phone number, school, or other personal details with strangers online."
    },
    {
      title: "Use Strong Passwords",
      description: "Create unique, strong passwords and enable two-factor authentication to protect your account."
    },
    {
      title: "Be Respectful",
      description: "Treat others with kindness and respect. Bullying, harassment, and hate speech are not tolerated."
    },
    {
      title: "Report Suspicious Behavior",
      description: "If someone makes you uncomfortable or breaks the rules, report them immediately using our reporting tools."
    },
    {
      title: "Think Before You Share",
      description: "Consider the consequences before sharing content or information. Once online, it can be difficult to remove."
    },
    {
      title: "Talk to Trusted Adults",
      description: "If you're unsure about something or feel unsafe, talk to a parent, teacher, or other trusted adult."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-roblox-blue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety & Security</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety is our top priority. Learn about our safety features and how to stay safe while gaming and socializing online.
          </p>
        </div>

        {/* Safety Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Safety Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <feature.icon className="w-12 h-12 text-roblox-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-roblox-blue">
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-700">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mb-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-800 mb-4">Report Safety Concerns</h2>
            <p className="text-red-700 mb-6">
              If you encounter inappropriate behavior, feel unsafe, or need immediate help, don't hesitate to report it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700">
                Report User
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Safety Report
              </Button>
            </div>
          </div>
        </section>

        {/* For Parents */}
        <section className="mb-12">
          <div className="bg-green-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-green-800">For Parents</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-800">Parental Controls</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Set account restrictions and privacy settings</li>
                  <li>• Control who can contact your child</li>
                  <li>• Monitor and restrict chat features</li>
                  <li>• Review and approve friend requests</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-800">Stay Involved</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Talk to your child about online safety</li>
                  <li>• Review their gaming activity regularly</li>
                  <li>• Learn about the games they play</li>
                  <li>• Set time limits for gaming</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                Parental Controls Guide
              </Button>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-3">Community Guidelines</h3>
              <p className="text-gray-600 mb-4">Learn about our community standards and what behavior is expected.</p>
              <Button variant="outline">Read Guidelines</Button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-3">Digital Citizenship</h3>
              <p className="text-gray-600 mb-4">Resources for being a responsible and respectful digital citizen.</p>
              <Button variant="outline">Learn More</Button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-3">Safety Education</h3>
              <p className="text-gray-600 mb-4">Interactive lessons and activities about online safety.</p>
              <Button variant="outline">Start Learning</Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Safety;
