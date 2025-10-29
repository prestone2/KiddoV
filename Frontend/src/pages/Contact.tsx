import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Seo from '@/components/Seo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ SEO Metadata */}
      <Seo
        title="Contact KiddoVase - Get in Touch with Our Support Team"
        description="Need help or have questions about KiddoVase? Contact our support team for assistance with games, safety, or account issues. We're here to help!"
        keywords="contact kiddovase, kiddovase support, kids gaming help, parental support, report issue, kids games contact"
        canonicalUrl="https://kiddovase.com/contact"
      >
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact KiddoVase",
            "url": "https://kiddovase.com/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254799855480",
              "contactType": "Customer Support",
              "areaServed": "KE",
              "availableLanguage": ["English"]
            }
          }`}
        </script>
      </Seo>

      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question or need help? Our team is always happy to assist you. Reach out through our form or use the contact details below.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="What’s your message about?"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="mt-1"
                  placeholder="Type your message here..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-roblox-blue hover:bg-roblox-blue/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <aside className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-roblox-blue mr-3" />
                  <span>support@kiddovase.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-roblox-blue mr-3 flex-shrink-0" />
                  <span className="whitespace-normal text-base">
                    5th Floor, Parklands Plaza, Chiromo Road, Nairobi, Kenya.
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-roblox-blue mr-3" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-roblox-blue text-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
              <p className="mb-4">
                For urgent issues or technical support, Contact Us for quick solutions and safety information.
              </p>
              {/* <Button variant="secondary" className="w-full">
                Visit Help Center
              </Button> */}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-800">Safety First</h3>
              <p className="text-green-700">
                KiddoVase prioritizes child safety. If you encounter any suspicious or inappropriate behavior, please report it immediately. Our team will respond within 24 hours.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
