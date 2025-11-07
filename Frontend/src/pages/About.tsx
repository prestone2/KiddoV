import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Seo from "@/components/Seo";

const About = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="About — Kiddovase"
        description="Learn more about About on Kiddovase — a safe and educational gaming platform for kids."
        canonicalUrl={`${window.location.origin}/about`}
      ></Seo>

      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About KiddoVase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            KiddoVase is a global platform that brings children together through
            safe, interactive, and educational play. Our mission is to empower
            creativity, learning, and friendship through fun experiences
            designed just for kids.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            To connect children around the world through imagination,
            positivity, and learning — fostering creativity and safe digital
            play.
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center">
          {[
            { number: "1M+", label: "Monthly Active Users" },
            { number: "50k+", label: "Daily Active Players" },
            { number: "180+", label: "Countries & Regions" },
            { number: "24B+", label: "Hours of Gameplay" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-3xl font-bold text-roblox-blue mb-2">
                {item.number}
              </div>
              <div className="text-gray-600">{item.label}</div>
            </div>
          ))}
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Create</h3>
            <p className="text-gray-600 leading-relaxed">
              Build immersive 3D experiences with <strong>Kiddo Studio</strong>{" "}
              — our free creative playground for children. Kids can design
              worlds, develop simple games, and share them safely with friends.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Play</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore millions of kid-friendly adventures made by young creators
              worldwide. From fun puzzles to educational challenges — there’s
              always something new to discover.
            </p>
          </div>
        </section>

        {/* Community Feedback Section */}
        <section className="py-12 bg-gradient-to-b from-white to-blue-50 rounded-lg mt-10 mb-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              What Our Community Says
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-10">
              Thousands of kids, parents, and teachers use KiddoVase to explore
              fun, safe, and educational games every day. Here’s what our
              growing community loves about it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                <p className="text-gray-600 italic">
                  “My kids enjoy the creative and adventure games. I love that
                  everything is child-safe and learning-focused.”
                </p>
                <span className="block mt-4 text-roblox-blue font-semibold">
                  Parent Feedback
                </span>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                <p className="text-gray-600 italic">
                  “KiddoVase makes game discovery fun and easy! The educational
                  games are perfect for school breaks.”
                </p>
                <span className="block mt-4 text-roblox-blue font-semibold">
                  Teacher’s Comment
                </span>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                <p className="text-gray-600 italic">
                  “I like trying new adventure and racing games with my friends.
                  It’s my favorite site for fun challenges!”
                </p>
                <span className="block mt-4 text-roblox-blue font-semibold">
                  Community Player
                </span>
              </div>
            </div>

            <p className="text-gray-600 mt-8 max-w-xl mx-auto">
              We’re always improving KiddoVase with feedback from players,
              parents, and educators to make it the best place for kids to play,
              learn, and create.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join millions of kids discovering, creating, and having fun every
            day on KiddoVase!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-roblox-blue hover:bg-roblox-blue/90"
                >
                  Sign Up Free
                </Button>
              </Link>
            )}
            <Link to="/games">
              <Button size="lg" variant="outline">
                Explore Games
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
