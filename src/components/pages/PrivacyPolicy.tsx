"use client";

import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Privacy Policy
            </h1>
            <div className="w-16 h-px bg-[#C49B08] mx-auto" />
          </div>

          <div className="prose prose-lg max-w-none font-inter text-charcoal/80 leading-relaxed space-y-8">
            <p>
              At New Kalyani Jewellers, we are committed to protecting the
              privacy and security of our customers&apos; personal information.
              This Privacy Policy outlines how we collect, use, and safeguard
              your information when you visit or make a purchase on our website.
              By using our website, you consent to the practices described in
              this policy.
            </p>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Information We Collect
              </h2>
              <p>
                When you visit our website, we may collect certain information
                about you, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Personal identification information (such as your name, email
                  address, and phone number) provided voluntarily by you during
                  the registration or checkout process.
                </li>
                <li>
                  Payment and billing information necessary to process your
                  orders, including credit card details, which are securely
                  handled by trusted third-party payment processors.
                </li>
                <li>
                  Browsing information, such as your IP address, browser type,
                  and device information, collected automatically using cookies
                  and similar technologies.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Use of Information
              </h2>
              <p>
                We may use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  To process and fulfill your orders, including shipping and
                  delivery.
                </li>
                <li>
                  To communicate with you regarding your purchases, provide
                  customer support, and respond to inquiries or requests.
                </li>
                <li>
                  To personalize your shopping experience and present relevant
                  product recommendations and promotions.
                </li>
                <li>
                  To improve our website, products, and services based on your
                  feedback and browsing patterns.
                </li>
                <li>
                  To detect and prevent fraud, unauthorized activities, and abuse
                  of our website.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Information Sharing
              </h2>
              <p>
                We respect your privacy and do not sell, trade, or otherwise
                transfer your personal information to third parties without your
                consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Trusted service providers:</strong> We may share your
                  information with third-party service providers who assist us in
                  operating our website, processing payments, and delivering
                  products. These providers are contractually obligated to handle
                  your data securely and confidentially.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose your
                  information if required to do so by law or in response to
                  valid legal requests or orders.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. However, please be aware that no
                method of transmission over the internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar technologies to enhance your browsing
                experience, analyze website traffic, and gather information about
                your preferences and interactions with our website. You have the
                option to disable cookies through your browser settings, but
                this may limit certain features and functionality of our
                website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Changes to the Privacy Policy
              </h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at
                any time. Any changes will be posted on this page with a revised
                &ldquo;last updated&rdquo; date. We encourage you to review this
                Privacy Policy periodically to stay informed about how we
                collect, use, and protect your information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding our
                Privacy Policy or the handling of your personal information,
                please contact us.
              </p>
              <ul className="list-none pl-0 mt-3 space-y-1">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:kj.kalyanijewellers@gmail.com"
                    className="text-[#C49B08] hover:underline"
                  >
                    kj.kalyanijewellers@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:01122571482"
                    className="text-[#C49B08] hover:underline"
                  >
                    0112 257 1482
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> 475/A Kaduwela Rd, Sri
                  Jayawardenepura Kotte
                </li>
              </ul>
            </div>

            <p className="text-sm text-charcoal/50 italic mt-12 border-t border-charcoal/10 pt-6">
              This Privacy Policy is provided as a general guideline and is
              subject to change. Last updated: May 2026.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
