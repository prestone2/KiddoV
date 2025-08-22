import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cookie, Settings, Shield, BarChart3, Target, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cookie className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground">
            Learn about how we use cookies and similar technologies to enhance your experience.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: August 2025
          </p>
        </div>

        {/* Cookie Content */}
        <div className="space-y-8">
          {/* What Are Cookies */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Cookie className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
              <p>
                We use both session cookies (which expire when you close your browser) and persistent cookies 
                (which remain on your device for a set period or until you delete them).
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-foreground">Essential Cookies</h3>
                </div>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable core functionality 
                  such as security, authentication, and accessibility features. These cannot be disabled.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p><strong>Examples:</strong> Login sessions, security tokens, consent preferences</p>
                  <p><strong>Duration:</strong> Session or up to 1 year</p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-secondary pl-4">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 text-secondary mr-2" />
                  <h3 className="font-semibold text-foreground">Analytics Cookies</h3>
                </div>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors use our website by collecting and reporting 
                  information anonymously. This helps us improve our site performance and user experience.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p><strong>Examples:</strong> Google Analytics, page views, user interactions</p>
                  <p><strong>Duration:</strong> Up to 2 years</p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-accent pl-4">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-5 w-5 text-accent mr-2" />
                  <h3 className="font-semibold text-foreground">Functional Cookies</h3>
                </div>
                <p className="text-muted-foreground">
                  These cookies enable enhanced functionality and personalization, such as remembering your 
                  preferences, language settings, and customizations.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p><strong>Examples:</strong> Language preferences, theme settings, customization options</p>
                  <p><strong>Duration:</strong> Up to 1 year</p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-destructive pl-4">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-destructive mr-2" />
                  <h3 className="font-semibold text-foreground">Marketing Cookies</h3>
                </div>
                <p className="text-muted-foreground">
                  These cookies track your activity across websites to show you relevant advertisements. 
                  They may be set by advertising partners through our site.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p><strong>Examples:</strong> Ad targeting, conversion tracking, social media pixels</p>
                  <p><strong>Duration:</strong> Up to 1 year</p>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Some cookies on our site are set by third-party services we use to enhance functionality:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-background/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Google Analytics</h4>
                  <p className="text-sm">Helps us understand website usage and improve user experience.</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Social Media</h4>
                  <p className="text-sm">Enables social sharing and embedded content from social platforms.</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Payment Providers</h4>
                  <p className="text-sm">Secure processing of payments and subscription management.</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Customer Support</h4>
                  <p className="text-sm">Live chat and help desk functionality for user support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You have control over how cookies are used on our website. Here are your options:
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Browser Settings</h4>
                  <p>Most browsers allow you to view, manage, and delete cookies through their settings menu. 
                     You can usually find this under "Privacy" or "Security" settings.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Cookie Banner</h4>
                  <p>When you first visit our site, you can choose to accept all cookies or reject non-essential ones 
                     through our cookie consent banner.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Opt-Out Links</h4>
                  <p>For third-party cookies, you can often opt out directly through the service provider's website 
                     or through industry opt-out tools.</p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Important Note</h4>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  Disabling certain cookies may affect the functionality of our website and limit your ability 
                  to use some features. Essential cookies cannot be disabled as they are necessary for the site to work.
                </p>
              </div>
            </div>
          </section>

          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;