import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import Footer from "@/components/Footer";
import RecentGames from "@/components/RecentGames";
import { useGames } from "@/hooks/useGames";
import { useGenres } from "@/hooks/useGenres";
import { Loader2, Sparkles, Users, Shield } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import createImg from "@/assets/create.png";
import FancyCursor from "@/components/FancyCursor";
import Seo from "@/components/Seo";

const Index = () => {
  const { data: genres, isLoading: genresLoading } = useGenres();
  const { data: games } = useGames();
  const navigate = useNavigate();

  const handleCategoryClick = (genre: string) => {
    navigate(`/games?genre=${encodeURIComponent(genre)}`);
  };

  const popularIds = games ? games.slice(0, 6).map((g) => g.Id) : [];

  const [activeGenreIdx, setActiveGenreIdx] = useState(0);
  const genreList = genres?.slice(0, 8) ?? [
    "Adventure",
    "Role Play",
    "Action",
    "Simulator",
    "Obby",
    "Tycoon",
    "Racing",
    "Fighting",
  ];

  useEffect(() => {
    if (genreList.length <= 1) return;
    const interval = setInterval(
      () => setActiveGenreIdx((prev) => (prev + 1) % genreList.length),
      2500
    );
    return () => clearInterval(interval);
  }, [genreList.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo
        title="Home — Kiddovase"
        description="Learn more about Home on Kiddovase — a safe and educational gaming platform for kids."
        canonicalUrl={`${window.location.origin}/`}
      ></Seo>

      <FancyCursor />
      <Navbar />
      <Hero />

      <main className="container mx-auto px-4 flex-grow">
        {/* 🕹️ Recent Games */}
        <RecentGames />

        {/* ⭐ Popular Games */}
        <FeaturedGames title="Popular Games" />

        {/* 🧩 Featured Categories */}
        <section className="py-12" aria-labelledby="featured-categories">
          <h2
            id="featured-categories"
            className="text-3xl font-bold mb-6 text-center"
          >
            Featured Categories
          </h2>

          {genresLoading ? (
            <div className="flex items-center justify-center py-8 text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading categories...</span>
            </div>
          ) : (
            <>
              {/* Mobile Carousel */}
              <div className="md:hidden overflow-hidden w-full h-32 mb-8">
                <div
                  className="flex transition-transform duration-700"
                  style={{
                    width: `${genreList.length * 100}%`,
                    transform: `translateX(-${
                      activeGenreIdx * (100 / genreList.length)
                    }%)`,
                  }}
                >
                  {genreList.map((genre) => (
                    <div
                      key={genre}
                      className="w-full flex-shrink-0 h-32 px-2 cursor-pointer"
                      onClick={() => handleCategoryClick(genre)}
                    >
                      <div className="rounded-lg bg-gradient-to-r from-roblox-blue to-blue-600 flex items-center justify-center h-full shadow-md hover:opacity-90 transition">
                        <h3 className="text-white font-bold text-xl text-center">
                          {genre}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {genreList.map((genre) => (
                  <div
                    key={genre}
                    className="rounded-lg bg-gradient-to-r from-roblox-blue to-blue-600 text-white flex items-center justify-center py-8 font-semibold hover:opacity-90 transition cursor-pointer"
                    onClick={() => handleCategoryClick(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* 🚀 Trending Now */}
        <FeaturedGames title="Trending Now" excludeIds={popularIds} />

        {/* 💡 Why Choose KiddoVase */}
        <section className="py-16 bg-white rounded-lg shadow-sm mt-12">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose KiddoVase?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Sparkles className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Fun Meets Learning</h3>
              <p className="text-gray-600">
                Every game is crafted to encourage creativity, logic, and
                exploration — turning fun into discovery.
              </p>
            </div>
            <div>
              <Shield className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Safe for Every Age</h3>
              <p className="text-gray-600">
                Protected by AI moderation, parental controls, and secure
                privacy features for worry-free playtime.
              </p>
            </div>
            <div>
              <Users className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Global Community</h3>
              <p className="text-gray-600">
                Join millions of kids, parents, and creators from around the
                world sharing, learning, and playing together.
              </p>
            </div>
          </div>
        </section>

        {/* 🎨 Create Section */}
        <section className="py-16 my-8 bg-roblox-light-gray rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src={createImg}
                alt="Kid creating a game world in Kiddo Studio"
                loading="lazy"
                className="rounded-lg shadow-lg w-full object-cover max-h-[350px]"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Create Anything You Can Imagine
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                With Kiddo Studio, kids can design, code, and publish 3D worlds
                safely. Every idea can come to life — from dream castles to
                adventure quests!
              </p>
              {/* <Link to="/create">
                <button className="bg-roblox-blue text-white py-3 px-6 rounded-full font-medium hover:bg-roblox-blue/90 transition">
                  Start Creating
                </button>
              </Link> */}
            </div>
          </div>
        </section>

        {/* 🧑‍🏫 For Parents & Educators */}
        <section className="py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-16">
          <h2 className="text-3xl font-bold mb-4">For Parents & Educators</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Learn how KiddoVase helps children play, learn, and grow safely
            online — with tools designed for both families and schools.
          </p>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/parents">
              <button className="bg-roblox-blue text-white py-3 px-6 rounded-full hover:bg-roblox-blue/90">
                Parents Guide
              </button>
            </Link>
            <Link to="/safety">
              <button className="border border-roblox-blue text-roblox-blue py-3 px-6 rounded-full hover:bg-blue-50">
                Safety Center
              </button>
            </Link>
          </div> */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
