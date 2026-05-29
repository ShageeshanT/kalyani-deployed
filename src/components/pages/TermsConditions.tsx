"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export default function TermsConditions() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Terms &amp; Conditions
            </h1>
            <div className="w-16 h-px bg-[#C49B08] mx-auto" />
          </div>

          <div className="prose prose-lg max-w-none font-inter text-charcoal/80 leading-relaxed space-y-8">
            <p>
              Welcome to New Kalyani Jewellers. These Terms and Conditions
              govern your use of our website and the purchase and sale of
              products from our platform. By accessing and using our website,
              you agree to comply with these terms. Please read them carefully
              before proceeding with any transactions.
            </p>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Use of the Website
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  You must be at least 18 years old to use our website or make
                  purchases.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account information, including your username and password.
                </li>
                <li>
                  You agree to provide accurate and current information during
                  the registration and checkout process.
                </li>
                <li>
                  You may not use our website for any unlawful or unauthorized
                  purposes.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Product Information and Pricing
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  We strive to provide accurate product descriptions, images,
                  and pricing information. However, we do not guarantee the
                  accuracy or completeness of such information.
                </li>
                <li>
                  Prices are subject to change without notice. Any promotions or
                  discounts are valid for a limited time and may be subject to
                  additional terms and conditions.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Orders and Payments
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  By placing an order on our website, you are making an offer to
                  purchase the selected products.
                </li>
                <li>
                  We reserve the right to refuse or cancel any order for any
                  reason, including but not limited to product availability,
                  errors in pricing or product information, or suspected
                  fraudulent activity.
                </li>
                <li>
                  You agree to provide valid and up-to-date payment information
                  and authorize us to charge the total order amount, including
                  applicable taxes and shipping fees, to your chosen payment
                  method.
                </li>
                <li>
                  We use trusted third-party payment processors to handle your
                  payment information securely. We do not store or have access
                  to your full payment details.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Shipping and Delivery
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  We will make reasonable efforts to ensure timely shipping and
                  delivery of your orders.
                </li>
                <li>
                  Shipping and delivery times provided are estimates and may
                  vary based on your location and other factors.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Returns and Refunds
              </h2>
              <p>
                Our Returns and Refund Policy governs the process and conditions
                for returning products and seeking refunds. Please refer to our{" "}
                <Link
                  href="/refund"
                  className="text-[#C49B08] hover:underline"
                >
                  Refund Policy
                </Link>{" "}
                page for more information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Intellectual Property
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  All content and materials on our website, including but not
                  limited to text, images, logos, and graphics, are protected by
                  intellectual property rights and are the property of New
                  Kalyani Jewellers or its licensors.
                </li>
                <li>
                  You may not use, reproduce, distribute, or modify any content
                  from our website without our prior written consent.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Limitation of Liability
              </h2>
              <ul className="list-[lower-alpha] pl-6 space-y-2">
                <li>
                  In no event shall New Kalyani Jewellers, its directors,
                  employees, or affiliates be liable for any direct, indirect,
                  incidental, special, or consequential damages arising out of
                  or in connection with your use of our website or the purchase
                  and use of our products.
                </li>
                <li>
                  We make no warranties or representations, express or implied,
                  regarding the quality, accuracy, or suitability of the
                  products offered on our website.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Amendments and Termination
              </h2>
              <p>
                We reserve the right to modify, update, or terminate these Terms
                and Conditions at any time without prior notice. It is your
                responsibility to review these terms periodically for any
                changes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions about these Terms and Conditions,
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
              These Terms and Conditions are provided as a general guideline and
              are subject to change. Last updated: May 2026.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
