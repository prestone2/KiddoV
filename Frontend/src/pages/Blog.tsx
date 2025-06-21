
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "Introducing New Creator Tools in Kiddoverse Studio",
      excerpt: "Discover the latest features that make building games easier and more powerful than ever before.",
      author: "Kiddoverse Team",
      date: "2024-06-15",
      category: "Product Updates",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=300"
    },
    {
      title: "Safety First: Our Commitment to Digital Civility",
      excerpt: "Learn about our comprehensive approach to keeping the Kiddoverse platform safe for everyone.",
      author: "Safety Team",
      date: "2024-06-10", 
      category: "Safety",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=300"
    },
    {
      title: "Developer Success Stories: From Hobby to Career",
      excerpt: "Meet the creators who turned their passion for game development into successful careers on Kiddoverse.",
      author: "Community Team",
      date: "2024-06-05",
      category: "Community",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=300"
    },
    {
      title: "The Future of Virtual Experiences",
      excerpt: "Exploring how Kiddoverse is shaping the metaverse and the future of digital interaction.",
      author: "Product Team",
      date: "2024-05-30",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=300"
    }
  ];

  const categories = ["All", "Product Updates", "Safety", "Community", "Innovation", "Developer News"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kiddoverse Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, product updates, and stories from the Kiddoverse community.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={category === "All" ? "bg-roblox-blue hover:bg-roblox-blue/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-roblox-blue text-white text-xs px-2 py-1 rounded mr-2">
                    Featured
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                </div>
                <Button className="bg-roblox-blue hover:bg-Kiddoverse-blue/90">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(1).map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Get the latest Kiddoverse news and updates delivered to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded text-gray-900"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
