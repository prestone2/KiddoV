import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Search,
  Shield,
  Settings,
  Users,
  Mail,
  HeartHandshake,
  Home,
} from "lucide-react";
import Seo from "@/components/Seo";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const location = useLocation();

  // ✅ Categorized FAQs
  const faqs = [
    {
      category: "Account & Settings",
      question: "How do I reset my password?",
      answer:
        "Go to Settings → Account → Change Password. Enter your current and new password to update securely.",
    },
    {
      category: "Account & Settings",
      question: "How can I recover my account?",
      answer:
        "Click 'Forgot Password' on the login page and follow the email recovery instructions.",
    },
    {
      category: "Safety & Civility",
      question: "How do I report inappropriate behavior?",
      answer:
        "Click on the user's profile → Select 'Report User' → Choose the reason. Our moderators review reports 24/7.",
    },
    {
      category: "Safety & Civility",
      question: "What parental controls are available?",
      answer:
        "Parents can restrict chat, screen time, and purchases via the Kiddovase Parents Dashboard.",
    },
    {
      category: "Social Features",
      question: "How do I add friends safely?",
      answer:
        "You can send friend requests only to verified accounts. All friend interactions are monitored for safety.",
    },
    {
      category: "Social Features",
      question: "Why can’t I send a message?",
      answer:
        "Messages are restricted if the recipient’s chat settings or parental controls are active.",
    },
  ];

  const categories = [
    { name: "All", icon: <Search className="w-5 h-5 text-[#8d0b41]" /> },
    {
      name: "Account & Settings",
      icon: <Settings className="w-5 h-5 text-[#8d0b41]" />,
    },
    {
      name: "Safety & Civility",
      icon: <Shield className="w-5 h-5 text-[#8d0b41]" />,
    },
    {
      name: "Social Features",
      icon: <Users className="w-5 h-5 text-[#8d0b41]" />,
    },
  ];

  // ✅ Parse category from URL query (e.g. /help-center?category=safety)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      const formatted =
        categoryParam === "account"
          ? "Account & Settings"
          : categoryParam === "safety"
          ? "Safety & Civility"
          : categoryParam === "social"
          ? "Social Features"
          : "all";

      setSelectedCategory(formatted);

      // Smooth scroll to FAQ section after preselection
      setTimeout(() => {
        const faqSection = document.getElementById("faq-section");
        if (faqSection) faqSection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.search]);

  // ✅ Filter + search logic
  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (f) =>
        (selectedCategory === "all" || f.category === selectedCategory) &&
        (f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, selectedCategory]);

  // ✅ Dynamic search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return faqs
      .filter((f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map((f) => f.question);
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Seo
        title="Help Center – Safe Play & Support for Families"
        description="Search FAQs, browse help categories, and learn how Kiddovase keeps your child’s gaming experience safe, educational, and fun."
        keywords="help center, support, FAQ, child safety, parental guide, Kiddovase"
        canonicalUrl="https://kiddovase.com/help-center"
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] py-16 text-white text-center relative">
        <h1 className="text-4xl font-bold mb-3">Help Center</h1>
        <p className="text-lg opacity-90 mb-6">
          Find answers, safety tips, and guides for parents and players.
        </p>

        {/* Back to Help Page */}
        <Link
          to="/help"
          className="inline-flex items-center justify-center text-white hover:underline mb-6"
        >
          <Home className="w-4 h-4 mr-2" /> Back to Help Page
        </Link>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-4 relative">
          <Search className="absolute left-4 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-full text-gray-800"
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white mt-2 rounded-xl shadow-lg text-gray-800 text-sm z-10 border">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(s)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b py-6 px-6 md:px-12 lg:px-20 flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => {
          const isActive =
            selectedCategory === cat.name ||
            (cat.name === "All" && selectedCategory === "all");

          const Icon = cat.icon;

          return (
            <button
              key={cat.name}
              onClick={() =>
                setSelectedCategory(cat.name === "All" ? "all" : cat.name)
              }
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-200 ${
                isActive
                  ? "bg-[#8d0b41] text-white border-[#8d0b41]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#8d0b41]"
              }`}
            >
              <cat.icon.type
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#8d0b41]"
                }`}
              />
              <span className="font-medium">{cat.name}</span>
            </button>
          );
        })}
      </section>

      {/* FAQs */}
      <section
        id="faq-section"
        className="flex-1 py-16 px-6 md:px-12 lg:px-20 bg-gray-50"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">
          {selectedCategory === "all" ? "All FAQs" : `${selectedCategory} FAQs`}
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl shadow-sm bg-white"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedFaq === idx ? "rotate-180 text-[#8d0b41]" : ""
                  }`}
                />
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-4 text-gray-600 border-t bg-gray-50 transition-all duration-300 ease-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No results found for "{searchQuery}".
            </p>
          )}
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="bg-white border-t py-16 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Still Need Help?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          If you can’t find what you’re looking for, our team is here to help.
          Reach out for additional support, report issues, or get advice on
          child safety.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:support@kiddovase.com"
            className="flex items-center justify-center gap-2 bg-[#8d0b41] text-white px-6 py-3 rounded-full shadow hover:bg-[#a60e4d] transition"
          >
            <Mail className="w-5 h-5" /> Email Support
          </a>

          <Link
            to="/parents"
            className="flex items-center justify-center gap-2 bg-pink-100 text-[#8d0b41] px-6 py-3 rounded-full shadow hover:bg-pink-200 transition"
          >
            <HeartHandshake className="w-5 h-5" /> Parents’ Guide
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
