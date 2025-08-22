import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 2024
          </p>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <p>When you create an account, we collect your username, email address, and profile information you choose to provide.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                <p>We collect information about how you use our platform, including games played, time spent, and interactions with other users.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Device Information</h3>
                <p>We may collect device information such as IP address, browser type, and operating system for security and optimization purposes.</p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>• <strong>Provide Services:</strong> To operate and maintain our gaming platform</p>
              <p>• <strong>Improve Experience:</strong> To personalize content and improve our services</p>
              <p>• <strong>Communication:</strong> To send important updates, notifications, and support messages</p>
              <p>• <strong>Safety:</strong> To detect fraud, abuse, and maintain a safe environment</p>
              <p>• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations</p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Data Protection</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              <p>Your data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
              <p>We regularly review and update our security practices to ensure the highest level of protection.</p>
            </div>
          </section>

          {/* Sharing Information */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>We do not sell, trade, or rent your personal information to third parties.</p>
              <p>We may share information in the following circumstances:</p>
              <p>• <strong>Service Providers:</strong> With trusted partners who help us operate our platform</p>
              <p>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</p>
              <p>• <strong>Safety:</strong> To prevent harm or illegal activities</p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <UserCheck className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Your Rights</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>You have the right to:</p>
              <p>• <strong>Access:</strong> Request a copy of your personal data</p>
              <p>• <strong>Correction:</strong> Update or correct inaccurate information</p>
              <p>• <strong>Deletion:</strong> Request deletion of your personal data</p>
              <p>• <strong>Portability:</strong> Export your data in a machine-readable format</p>
              <p>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>We are committed to protecting the privacy of children under 13 years of age.</p>
              <p>We do not knowingly collect personal information from children under 13 without parental consent.</p>
              <p>If you believe we have collected information from a child under 13, please contact us immediately.</p>
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.</p>
              <p>We will notify you of any material changes by posting the updated policy on our website.</p>
              <p>Your continued use of our services after changes indicates your acceptance of the updated policy.</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <p>• Email: privacy@example.com</p>
              <p>• Address: 123 Privacy Street, Data City, DC 12345</p>
              <p>• Phone: (555) 123-4567</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;