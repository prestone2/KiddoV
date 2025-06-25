
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Award, Play, Download } from 'lucide-react';

const Education = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: "Roblox Education",
      description: "Comprehensive curriculum for K-12 educators",
      features: ["Lesson Plans", "Student Activities", "Assessment Tools", "Teacher Training"]
    },
    {
      icon: Users,
      title: "Classroom Management",
      description: "Tools to manage student accounts and activities",
      features: ["Student Dashboard", "Progress Tracking", "Safe Environment", "Collaboration Tools"]
    },
    {
      icon: BookOpen,
      title: "Learning Resources", 
      description: "Educational content and materials for all ages",
      features: ["Coding Tutorials", "Design Principles", "STEM Activities", "Digital Citizenship"]
    },
    {
      icon: Award,
      title: "Certification Programs",
      description: "Professional development for educators",
      features: ["Educator Certification", "Workshop Credits", "Community Access", "Ongoing Support"]
    }
  ];

  const subjects = [
    {
      title: "Computer Science",
      description: "Learn programming, algorithms, and computational thinking",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400&h=200",
      lessons: 15
    },
    {
      title: "Game Design",
      description: "Explore creativity, storytelling, and user experience design",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=200",
      lessons: 12
    },
    {
      title: "Digital Citizenship",
      description: "Learn about online safety, ethics, and responsible behavior",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=200",
      lessons: 8
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">kiddoverse Education</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower the next generation with hands-on learning experiences that inspire creativity, 
            collaboration, and computational thinking.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <program.icon className="h-8 w-8 text-roblox-blue mr-3" />
                <h3 className="text-xl font-semibold">{program.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <ul className="space-y-2 mb-4">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-roblox-blue rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline">Learn More</Button>
            </div>
          ))}
        </div>

        {/* Subject Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Subject Areas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={subject.image}
                  alt={subject.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{subject.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {subject.lessons} lessons
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <Button className="w-full bg-roblox-blue hover:bg-roblox-blue/90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-roblox-blue to-blue-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Education Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Educators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Lesson Plans</div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Free Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <BookOpen className="h-8 w-8 text-roblox-blue mb-3" />
              <h4 className="font-semibold mb-2">Curriculum Guide</h4>
              <p className="text-sm text-gray-600 mb-3">Complete guide for implementing Roblox in your classroom</p>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Users className="h-8 w-8 text-roblox-blue mb-3" />
              <h4 className="font-semibold mb-2">Teacher Community</h4>
              <p className="text-sm text-gray-600 mb-3">Connect with educators using kiddoverse worldwide</p>
              <Button size="sm" variant="outline">Join Community</Button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Play className="h-8 w-8 text-roblox-blue mb-3" />
              <h4 className="font-semibold mb-2">Video Tutorials</h4>
              <p className="text-sm text-gray-600 mb-3">Step-by-step videos for teachers and students</p>
              <Button size="sm" variant="outline">Watch Now</Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-roblox-light-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Learning?</h2>
          <p className="text-gray-600 mb-6">Join thousands of educators bringing creative learning to their classrooms.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Education;
