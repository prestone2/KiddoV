
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Calendar, AlertCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              These Terms of Service ("Terms") govern your use of our gaming platform and services. 
              By creating an account, accessing, or using our services, you agree to comply with and 
              be legally bound by these Terms.
            </p>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of our services after any changes 
              constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              To access certain features, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Providing accurate and complete registration information</li>
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
            <p className="text-gray-700">
              You must be at least 13 years old to create an account. Users under 18 require 
              parental consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, bully, or threaten other users</li>
              <li>Share inappropriate, offensive, or harmful content</li>
              <li>Attempt to hack, disrupt, or damage our services</li>
              <li>Share personal information of yourself or others</li>
              <li>Create multiple accounts to circumvent restrictions</li>
              <li>Engage in any form of cheating or exploiting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Content and Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on our platform, including games, graphics, text, and software, is 
              protected by intellectual property rights. You may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Copy, distribute, or modify our content without permission</li>
              <li>Use our content for commercial purposes</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>
            <p className="text-gray-700">
              When you create content on our platform, you retain ownership but grant us a 
              license to use, display, and distribute it within our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Virtual Currency and Purchases</h2>
            <p className="text-gray-700 mb-4">
              Our platform may offer virtual currency (Robux) and digital items for purchase:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Virtual currency has no real-world value</li>
              <li>All purchases are final and non-refundable</li>
              <li>We reserve the right to modify pricing at any time</li>
              <li>Virtual items may be removed or modified without notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, 
              use, and protect your information. By using our services, you consent to our 
              data practices as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Safety and Moderation</h2>
            <p className="text-gray-700 mb-4">
              We employ various safety measures including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Automated content filtering and moderation</li>
              <li>User reporting and blocking features</li>
              <li>Human moderation review of reported content</li>
              <li>Account restrictions and bans for violations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Violation of these Terms</li>
              <li>Inappropriate behavior or content</li>
              <li>Suspected fraudulent activity</li>
              <li>Extended periods of inactivity</li>
            </ul>
            <p className="text-gray-700">
              You may delete your account at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Disclaimers and Limitations</h2>
            <p className="text-gray-700 mb-4">
              Our services are provided "as is" without warranties. We are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Service interruptions or technical issues</li>
              <li>Loss of virtual items or progress</li>
              <li>User-generated content or interactions</li>
              <li>Third-party content or links</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li>Email: legal@kiddovase.com</li>
              <li>Address: 123 Gaming Street, Tech City, TC 12345</li>
              <li>Phone:</li>
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
