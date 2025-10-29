import React, { useState, useMemo } from "react";
import {
  MessageCircle,
  X,
  Search,
  Mail,
  HeartHandshake,
  ChevronDown,
  Shield,
  Settings,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HelpWidget = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    { name: "All", icon: <Search className="w-4 h-4 text-[#8d0b41]" /> },
    {
      name: "Account & Settings",
      icon: <Settings className="w-4 h-4 text-[#8d0b41]" />,
    },
    {
      name: "Safety & Civility",
      icon: <Shield className="w-4 h-4 text-[#8d0b41]" />,
    },
    {
      name: "Social Features",
      icon: <Users className="w-4 h-4 text-[#8d0b41]" />,
    },
  ];

  // ✅ Filter FAQs by category + search
  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (f) =>
        (selectedCategory === "all" || f.category === selectedCategory) &&
        (f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, selectedCategory]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white rounded-full p-4 shadow-lg hover:scale-105 transition-all duration-200"
        aria-label="Open Help Widget"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Widget Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 animate-slide-up flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white p-4 rounded-t-2xl flex items-center justify-between">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-pink-100 transition"
              aria-label="Close Help Widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 rounded-full text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const isSelected =
                  selectedCategory === cat.name ||
                  (cat.name === "All" && selectedCategory === "all");

                return (
                  <button
                    key={cat.name}
                    onClick={() =>
                      setSelectedCategory(cat.name === "All" ? "all" : cat.name)
                    }
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs transition-all duration-200 ${
                      isSelected
                        ? "bg-[#8d0b41] text-white border-[#8d0b41]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#8d0b41] hover:text-[#8d0b41]"
                    }`}
                  >
                    <cat.icon.type
                      className={`w-4 h-4 ${
                        isSelected ? "text-white" : "text-[#8d0b41]"
                      } transition-colors duration-200`}
                    />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* FAQs */}
            <div className="space-y-2">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg shadow-sm"
                >
                  <button
                    className="w-full flex justify-between items-center px-4 py-2 text-left text-sm font-medium text-gray-800"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === idx ? null : idx)
                    }
                  >
                    {faq.question}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFaq === idx ? "rotate-180 text-[#8d0b41]" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-4 pb-2 text-xs text-gray-600 border-t bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">
                  No results found for “{searchQuery}”.
                </p>
              )}
            </div>
          </div>

          {/* Footer Links */}
          <div className="border-t p-3 text-center space-y-2 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-600">
              Still need help? Reach out below:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:support@kiddovase.com"
                className="flex items-center gap-1 text-sm text-[#8d0b41] hover:underline"
              >
                <Mail className="w-4 h-4" /> Email Support
              </a>
              <Link
                to="/parents"
                className="flex items-center gap-1 text-sm text-[#8d0b41] hover:underline"
              >
                <HeartHandshake className="w-4 h-4" /> Parents’ Guide
              </Link>
              <Link
                to="/help-center"
                className="flex items-center gap-1 text-sm text-[#8d0b41] hover:underline"
              >
                View Full Help Center →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default HelpWidget;
