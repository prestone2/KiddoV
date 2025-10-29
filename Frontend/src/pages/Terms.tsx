import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { FileText, Calendar, AlertCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Terms of Service"
        description="Read KiddoVase's Terms of Service to understand our rules, user responsibilities, and platform policies for a safe gaming experience for kids."
        keywords="KiddoVase terms, gaming terms, kids online safety, user policy, children's games rules, KiddoVase legal, parental consent"
        canonicalUrl="https://kiddovase.com/terms"
      >
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "KiddoVase Terms of Service",
          "url": "https://kiddovase.com/terms",
          "provider": {
            "@type": "Organization",
            "name": "KiddoVase",
            "url": "https://kiddovase.com"
          },
          "description": "These Terms of Service outline the rules and conditions for using KiddoVase, a fun and safe gaming platform for kids.",
          "inLanguage": "en"
        }`}</script>
      </Seo>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-roblox-blue mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-600">Last updated: July 1, 2025</span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using our platform.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Important Notice</h3>
          </div>
          <p className="text-yellow-700">
            By accessing and using our platform, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        {/* Terms Content */}
        <div className="prose prose-lg max-w-4xl mx-auto">
          {/* (your existing sections remain unchanged) */}

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Related Policies</h2>
            <p className="text-gray-700 mb-4">
              Please review our related policies for a complete understanding of your rights and responsibilities:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <a href="/privacy" className="text-roblox-blue hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/contact" className="text-roblox-blue hover:underline">Contact Support</a>
              </li>
            </ul>
          </section>
        </div>

        {/* Agreement Section */}
        <div className="bg-roblox-blue text-white rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Agreement Acknowledgment</h2>
          <p className="mb-6">
            By using our platform, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service.
          </p>
          <p className="text-sm opacity-90">
            These terms are effective as of July 1, 2025, and will remain in effect 
            until modified or terminated.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
