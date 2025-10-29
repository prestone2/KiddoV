import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react';
import Seo from '@/components/Seo';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ✅ SEO Metadata */}
      <Seo
        title="Privacy Policy - KiddoVase | Protecting Kids' Data & Online Safety"
        description="Learn how KiddoVase protects your privacy. We collect minimal data, ensure child safety, and comply with COPPA and global data protection laws."
        keywords="kiddovase privacy, kids data protection, online safety for kids, COPPA compliance, GDPR for children, secure gaming platform"
      >
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "KiddoVase Privacy Policy",
            "url": "https://kiddovase.com/privacy",
            "description": "KiddoVase protects kids' privacy and ensures compliance with COPPA and GDPR for a safe online experience.",
            "publisher": {
              "@type": "Organization",
              "name": "KiddoVase",
              "url": "https://kiddovase.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kiddovase.com/logo.png"
              }
            },
            "inLanguage": "en"
          }`}
        </script>
      </Seo>

      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy and safety matter to us. Learn how we protect your personal data and maintain a secure environment for every user.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 2024
          </p>
        </section>

        {/* Privacy Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>KiddoVase collects minimal information necessary to create a fun, safe, and personalized gaming experience.</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Personal Information:</strong> Username, email, and profile preferences.</li>
                <li><strong>Usage Data:</strong> Games played, time spent, and community interactions.</li>
                <li><strong>Device Info:</strong> IP address, browser type, and operating system — used for performance and safety.</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>To Provide Services:</strong> Deliver games, maintain performance, and personalize experiences.</li>
              <li><strong>To Improve Experience:</strong> Analyze feedback and usage data to enhance the platform.</li>
              <li><strong>To Communicate:</strong> Send account updates, safety alerts, and support messages.</li>
              <li><strong>To Ensure Safety:</strong> Prevent fraud, detect abuse, and maintain a child-safe environment.</li>
              <li><strong>To Comply with Law:</strong> Meet COPPA, GDPR, and other legal obligations.</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Data Protection & Security</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              We use industry-leading security technologies to safeguard user data and maintain compliance with global privacy standards.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Encryption in transit and at rest using SSL/TLS and AES protocols.</li>
              <li>Regular security audits and vulnerability assessments.</li>
              <li>Limited employee access to personal data based on necessity.</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              KiddoVase does not sell or rent personal data. Information may be shared only when necessary:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>With Service Providers:</strong> For hosting, analytics, or customer support.</li>
              <li><strong>For Legal Reasons:</strong> When required to comply with regulations or protect users.</li>
              <li><strong>For Safety:</strong> To prevent harm or illegal activity.</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-card/50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <UserCheck className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Your Rights</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Correction:</strong> Update or fix inaccurate details.</li>
              <li><strong>Deletion:</strong> Request account or data removal.</li>
              <li><strong>Portability:</strong> Download your data in standard format.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from any marketing communication.</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground">
              KiddoVase complies with the Children’s Online Privacy Protection Act (COPPA).  
              We do not knowingly collect data from children under 13 without verified parental consent.  
              Parents may review or delete their child’s data at any time by contacting us.
            </p>
          </section>

          {/* Contact Info */}
          <section className="bg-card/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy or your data, please contact us:
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Email:</strong> privacy@kiddovase.com
            </p>
            <p className="text-muted-foreground">
              <strong>Address:</strong> 5th Floor, Parklands Plaza, Chiromo Road, Nairobi, Kenya
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
