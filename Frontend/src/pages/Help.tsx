import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Users, Book, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const Help = () => {
  const categories = [
    {
      icon: <Settings className="w-6 h-6 text-[#8d0b41]" />,
      title: "Account & Settings",
      description:
        "Manage your account, privacy options, and parental controls.",
      link: "/help-center?category=account",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#8d0b41]" />,
      title: "Safety & Civility",
      description:
        "Learn how we keep Kiddovase safe, including chat filters and reporting tools.",
      link: "/help-center?category=safety",
    },
    {
      icon: <Users className="w-6 h-6 text-[#8d0b41]" />,
      title: "Friends & Social",
      description:
        "Get help with friends, groups, and social features safely.",
      link: "/help-center?category=social",
    },
    {
      icon: <Book className="w-6 h-6 text-[#8d0b41]" />,
      title: "Game Creation",
      description:
        "Discover resources to create, publish, and share your own games.",
      link: "/help-center?category=creation",
    },
  ];

  const popularArticles = [
    "How to reset my password",
    "How to report inappropriate behavior",
    "Why can’t I log in to my account?",
    "How to change my username",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Seo
        title="Help & Support – Learn, Stay Safe, and Play Confidently"
        description="Get support for Kiddovase — from parental controls to safe chat settings. Find guides, FAQs, and tutorials to help your child play and learn safely online."
        keywords="help, support, safety, parental guide, FAQ, Kiddovase help center"
        canonicalUrl="https://kiddovase.com/help"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">Need Help?</h1>
        <p className="text-lg opacity-90">
          We’re here to make your Kiddovase experience safe, fun, and easy to
          use.
        </p>
        <Link to="/help-center">
          <Button className="mt-6 bg-white text-[#8d0b41] hover:bg-pink-100 rounded-full px-6 py-3 font-semibold">
            Go to Help Center
          </Button>
        </Link>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
          Help Categories
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link to={cat.link} key={cat.title}>
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer rounded-2xl border border-gray-200 bg-white">
                <div className="flex justify-center mb-4">{cat.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                <span className="inline-flex items-center text-[#8d0b41] font-semibold">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20 border-t">
        <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
          Popular Help Topics
        </h2>
        <ul className="max-w-2xl mx-auto space-y-4 text-center">
          {popularArticles.map((topic) => (
            <li key={topic} className="text-[#8d0b41] font-medium">
              <Link to="/help-center" className="hover:underline">
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default Help;
