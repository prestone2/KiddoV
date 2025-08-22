
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Book, Shield, Settings, Users, ChevronDown } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    {
      icon: Settings,
      title: "Account & Settings",
      description: "Manage your account, privacy settings, and preferences",
      articles: ["Change Password", "Privacy Settings", "Account Recovery", "Parental Controls"]
    },
    {
      icon: Shield,
      title: "Safety & Civility",
      description: "Learn about our safety features and reporting tools",
      articles: ["Reporting Users", "Blocking Players", "Chat Safety", "Age Verification"]
    },
    {
      icon: Users,
      title: "Social Features",
      description: "Friends, groups, and social interaction help",
      articles: ["Adding Friends", "Creating Groups", "Voice Chat", "Trading Items"]
    },
    {
      icon: Book,
      title: "Game Development",
      description: "Resources for creating and publishing games",
      articles: ["kiddo Studio Basics", "Scripting Help", "Publishing Games", "Monetization"]
    }
  ];

  const popularArticles = [
    "How to reset my password",
    "How to report inappropriate behavior",
    "Why can't I log in to my account?",
    "How to enable two-step verification",
    "How to change my username",
    "How to get kiddocash"
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner of any page and fill out the required information. You'll need a valid email address to verify your account."
    },
    {
      question: "Is the platform safe for children?",
      answer: "Yes, we have comprehensive safety measures including content moderation, chat filters, parental controls, and reporting systems to ensure a safe environment for all users."
    },
    {
      question: "How do I report inappropriate content or behavior?",
      answer: "Use the report button available on user profiles, games, and chat messages. Our moderation team reviews all reports within 24 hours."
    },
    {
      question: "Can I play games without creating an account?",
      answer: "Yes, you can browse and play many games without an account, but creating an account unlocks features like saving favorites, tracking progress, and connecting with friends."
    },
    {
      question: "How do I get Kiddocash?",
      answer: "Kiddocash can be purchased through our store or earned through our subscription plans. Premium members receive monthly kiddocash allowances."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get answers to your questions and learn how to make the most of our platform
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg"
            />
            <Button className="absolute right-2 top-1.5 bg-roblox-blue hover:bg-roblox-blue/90">
              Search
            </Button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <category.icon className="h-8 w-8 text-roblox-blue mr-3" />
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <a href="#" className="text-roblox-blue hover:underline">{article}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <a key={index} href="#" className="flex items-center p-3 bg-white rounded border hover:shadow-sm transition-shadow">
                <Book className="h-5 w-5 text-roblox-blue mr-3 flex-shrink-0" />
                <span className="text-gray-700 hover:text-roblox-blue">{article}</span>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-roblox-blue text-white rounded-lg p-8">
          <MessageCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <Button variant="secondary" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
// This code defines a Help Center page with a search bar, categorized help sections, popular articles, FAQs, and a contact support button.
// It uses React hooks for state management and includes icons from Lucide for visual enhancement. The