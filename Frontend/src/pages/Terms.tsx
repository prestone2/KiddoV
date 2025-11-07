import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { FileText, Calendar, AlertCircle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Terms & Conditions — Kiddovase"
        description="Read the Kiddovase Terms of Service — learn about user conduct, parental supervision, content ownership, and our child-safety policies."
        canonicalUrl={`${window.location.origin}/terms`}
      ></Seo>

      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-[#8d0b41] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-600">Last updated: July 1, 2025</span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using Kiddovase.
            Your use of our platform means you agree to these terms.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">
              Important Notice
            </h3>
          </div>
          <p className="text-yellow-700">
            By accessing and using Kiddovase, you agree to abide by our Terms of
            Service. If you do not agree with any part of these terms, please do
            not use the platform.
          </p>
        </div>

        {/* Terms Content */}
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed">
          {/* 🧩 Kiddovase Content Enrichment Patch — Full Legal Content */}

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              Kiddovase is a safe, educational gaming platform designed to
              nurture creativity and learning for children and families. By
              accessing or using the site, you confirm that you understand and
              agree to these Terms of Service. Parents and guardians are
              responsible for monitoring children under the age of 13 and for
              ensuring appropriate use of the platform.
            </p>
            <p>
              These terms apply to all Kiddovase users — including players,
              parents, and educators — and form a legal agreement between you
              and Kiddovase regarding your use of the platform and its content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. Safe and Respectful Conduct
            </h2>
            <p>
              Kiddovase promotes kindness, collaboration, and respect among
              users. You may not post, share, or upload any content that is
              offensive, misleading, or harmful. Personal information such as
              names, phone numbers, or addresses must never be shared publicly
              within Kiddovase.
            </p>
            <p>
              Harassment, bullying, discrimination, or cheating are strictly
              prohibited. Kiddovase reserves the right to remove content,
              suspend, or permanently close accounts that violate our community
              guidelines.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Parental and Educational Involvement
            </h2>
            <p>
              Kiddovase is designed to complement both home and classroom
              learning. Parents and educators are encouraged to engage with
              their children’s gaming activities, discuss safe online behavior,
              and use Kiddovase as a positive tool for digital literacy.
            </p>
            <p>
              Parents may access guidance articles on safety and privacy through
              our Help Center. All educational content on Kiddovase is created
              in compliance with COPPA and GDPR-K standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Content Ownership</h2>
            <p>
              All games, text, graphics, and code on Kiddovase are the
              intellectual property of Kiddovase or its content partners. Users
              are not permitted to reproduce, modify, or distribute any part of
              the platform without written consent.
            </p>
            <p>
              Creators who publish content on Kiddovase retain ownership of
              their original work but grant Kiddovase a limited license to
              display and distribute it for educational use within the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. User Responsibilities
            </h2>
            <p>
              Users agree to use Kiddovase only for lawful purposes and in a way
              that does not infringe on the rights of others. Attempting to
              exploit bugs, reverse-engineer code, or disrupt services is not
              allowed.
            </p>
            <p>
              If you encounter any bugs or security concerns, please report them
              to our support team immediately rather than sharing them publicly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              Kiddovase is provided “as is,” without warranties of any kind.
              While we make every effort to provide a safe and reliable
              experience, Kiddovase cannot be held responsible for any direct,
              indirect, or incidental damages resulting from the use or
              inability to use the service.
            </p>
            <p>
              Users acknowledge that online platforms carry inherent risks and
              agree to use Kiddovase responsibly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Updates to Terms</h2>
            <p>
              These Terms of Service may be updated from time to time to reflect
              new features, changes in law, or improvements in safety standards.
              Significant updates will be communicated via notifications or
              email.
            </p>
            <p>
              Continued use of Kiddovase after changes are made constitutes your
              acceptance of the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact
              us through the <a href="/contact" className="text-[#8d0b41] hover:underline">Contact
              page</a>. We are committed to providing clear communication and
              quick responses to ensure all families and educators understand
              their rights and responsibilities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Related Policies</h2>
            <p>
              Please review our related policies for a complete understanding of
              your rights and responsibilities:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="/privacy" className="text-[#8d0b41] hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/safety" className="text-[#8d0b41] hover:underline">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#8d0b41] hover:underline">
                  Contact Support
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Agreement Section */}
        <div className="bg-[#8d0b41] text-white rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Agreement Acknowledgment</h2>
          <p className="mb-6">
            By using Kiddovase, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service. Continued use of
            our services indicates ongoing acceptance of these terms.
          </p>
          <p className="text-sm opacity-90">
            These terms are effective as of July 1, 2025, and will remain in
            effect until modified or terminated.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
