import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Settings, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import parentsGuideImg from "@/assets/parentsguide.png";

const Parents = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Content Filtering",
      description:
        "Age-appropriate content filtering and moderation systems keep your child safe.",
    },
    {
      icon: Eye,
      title: "Chat Restrictions",
      description:
        "Customizable chat settings let you control who your child can communicate with.",
    },
    {
      icon: Settings,
      title: "Account Restrictions",
      description:
        "Set playtime limits, manage access, and adjust account features easily.",
    },
    {
      icon: Users,
      title: "Friend Management",
      description:
        "Monitor and manage your child's friend list and interactions.",
    },
  ];

  const ageGroups = [
    {
      age: "1-9",
      description:
        "Extra safety restrictions with limited communication features",
      features: [
        "No chat outside of games",
        "Limited friend requests",
        "Curated game experiences",
      ],
    },
    {
      age: "9-12",
      description: "Balanced safety with more social features as children grow",
      features: [
        "Filtered chat in games",
        "Friend requests with approval",
        "Broader game selection",
      ],
    },
    {
      age: "13+",
      description: "More freedom with continued safety monitoring",
      features: [
        "Full chat capabilities",
        "Open friend requests",
        "Access to all age-appropriate content",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Parents Guide | Keeping Your Child Safe on KiddoVase"
        description="Discover how KiddoVase helps parents protect their children online with content filters, chat restrictions, and age-appropriate gaming experiences."
        keywords="parents guide, kid safety, online games for kids, parental controls, child privacy, internet safety, family-friendly games"
        canonicalUrl="https://kiddovase.com/parents"
      >
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is KiddoVase safe for my child?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, KiddoVase uses advanced moderation, chat filters, and parental controls to create a safe environment for children."
              }
            },
            {
              "@type": "Question",
              "name": "Can I monitor my child's activity?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, parents can monitor chat logs, spending limits, and friends directly from the Parental Dashboard."
              }
            }
          ]
        }`}</script>
      </Seo>

      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Parents’ Guide to KiddoVase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how KiddoVase keeps your child safe while they explore,
            create, and connect in a world built for imagination — with you in
            control.
          </p>
        </header>

        {/* Safety Features */}
        <section
          aria-label="Safety Features"
          className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12"
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Safety First
            </h2>
            <p className="text-green-700">
              Your child’s safety is our top priority. Every interaction is
              monitored with AI-powered moderation tools.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, i) => (
              <article key={i} className="text-center">
                <feature.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Age-Appropriate Experiences */}
        <section aria-label="Age-Appropriate Experiences" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Age-Appropriate Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ageGroups.map((group, i) => (
              <article
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="text-center mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                    {group.age}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ages {group.age}
                  </h3>
                  <p className="text-gray-600 text-sm">{group.description}</p>
                </div>
                <ul className="space-y-2">
                  {group.features.map((f, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Parental Controls */}
        <section
          aria-label="Parental Controls"
          className="bg-blue-50 rounded-lg p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Parental Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Manage your child’s KiddoVase experience easily with real-time
                reports, safety settings, and playtime management tools.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Settings className="w-5 h-5 text-blue-600 mr-3" />
                  Set spending limits and monitor purchases
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  Control screen time and schedule breaks
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-blue-600 mr-3" />
                  Review chat logs and friends list
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  Restrict access to specific games or content
                </li>
              </ul>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Go to Parental Dashboard
              </Button>
            </div>
            <div>
              <img
                src={parentsGuideImg}
                alt="Parent guiding child online"
                className="rounded-lg shadow-lg border border-blue-200 w-3/4 mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Educational Benefits */}
        <section aria-label="Educational Benefits" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Educational Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Creativity",
                desc: "Building games develops creative thinking and artistic skills.",
              },
              {
                icon: "💻",
                title: "Coding",
                desc: "Learn programming concepts through fun, interactive challenges.",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                desc: "Work with friends on projects to develop teamwork skills.",
              },
            ].map((item, i) => (
              <article key={i} className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section
          aria-label="Parent FAQs"
          className="bg-gray-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-white border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Is KiddoVase safe for my child?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes. We use AI moderation, parental controls, and age filters to
                ensure a safe experience for all users.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Can I control who my child talks to?
              </summary>
              <p className="text-gray-600 mt-2">
                Absolutely. You can customize chat permissions and approve
                friend requests from your dashboard.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                Is there educational value in KiddoVase?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes! Children can learn coding, creativity, and teamwork while
                having fun.
              </p>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <section
          aria-label="Get Started"
          className="text-center bg-blue-100 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Create a safe account for your child and explore KiddoVase together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Create Account
              </Button>
            </Link>
            <Link to="/safety">
              <Button size="lg" variant="outline">
                Learn About Safety
              </Button>
            </Link>
          </div>
        </section>

      {/* Help & Support Section */}
      <section aria-label="Help and Support" className="mt-8 mb-8 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Need More Guidance?</h2>
          <p className="text-base mb-6">
            Whether you’re setting up parental controls or learning how to
            monitor activity, our Help Center has step-by-step guides, FAQs, and
            safety resources for families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/help-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#8d0b41] hover:bg-pink-100 font-semibold px-8 py-3 transition-all rounded-full"
              >
                Visit Help Center
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-secondary text-white font-semibold px-8 py-3 rounded-full border border-white/30 transition-all"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Parents;
