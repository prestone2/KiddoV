
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const Careers = () => {
  const jobListings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Mateo, CA",
      type: "Full-time",
      salary: "$150k - $200k"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $180k"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "San Mateo, CA",
      type: "Full-time",
      salary: "$120k - $160k"
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$140k - $190k"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers at kiddoverse</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our mission to connect a billion people with optimism and civility. 
            Help us build the future of human co-experience.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-roblox-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Respect the Community</h3>
            <p className="text-gray-600">We treat everyone with kindness, dignity, and respect.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-roblox-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Own the Results</h3>
            <p className="text-gray-600">We take ownership and deliver results that matter.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-roblox-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Be Bold</h3>
            <p className="text-gray-600">We take calculated risks and innovate boldly.</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Work at Roblox?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Health & Wellness</h4>
              <p className="text-sm text-gray-600">Comprehensive medical, dental, and vision coverage</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Flexible Work</h4>
              <p className="text-sm text-gray-600">Hybrid and remote work options available</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Growth</h4>
              <p className="text-sm text-gray-600">Learning and development opportunities</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Equity</h4>
              <p className="text-sm text-gray-600">Stock options for all employees</p>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobListings.map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-roblox-light-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-gray-600 mb-6">We're always looking for talented people to join our team.</p>
          <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90">
            Send Us Your Resume
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
