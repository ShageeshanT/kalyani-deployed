"use client";

import { Layout } from "@/components/layout/Layout";

export default function RefundPolicy() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Refund Policy
            </h1>
            <div className="w-16 h-px bg-[#C49B08] mx-auto" />
          </div>

          <div className="prose prose-lg max-w-none font-inter text-charcoal/80 leading-relaxed space-y-8">
            <p>
              Thank you for shopping at New Kalyani Jewellers. We value your
              satisfaction and strive to provide you with the best online
              shopping experience possible. If, for any reason, you are not
              completely satisfied with your purchase, we are here to help.
            </p>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Returns
              </h2>
              <p>
                We accept returns within 7 days from the date of purchase. To be
                eligible for a return, your item must be unused and in the same
                condition that you received it. It must also be in the original
                packaging.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Refunds
              </h2>
              <p>
                Once we receive your return and inspect the item, we will notify
                you of the status of your refund. If your return is approved, we
                will initiate a refund to your original method of payment. Please
                note that the refund amount will exclude any shipping charges
                incurred during the initial purchase.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Exchanges
              </h2>
              <p>
                If you would like to exchange your item for a different size,
                color, or style, please contact our customer support team within
                7 days of receiving your order. We will provide you with further
                instructions on how to proceed with the exchange.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Non-Returnable Items
              </h2>
              <p>Certain items are non-returnable and non-refundable. These include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Gift cards</li>
                <li>Personalized or custom-made items</li>
                <li>Items that have been resized or altered after purchase</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Damaged or Defective Items
              </h2>
              <p>
                In the unfortunate event that your item arrives damaged or
                defective, please contact us immediately. We will arrange for a
                replacement or issue a refund, depending on your preference and
                product availability.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Return Shipping
              </h2>
              <p>
                You will be responsible for paying the shipping costs for
                returning your item unless the return is due to our error (e.g.,
                wrong item shipped, defective product). In such cases, we will
                provide you with a prepaid shipping label.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Processing Time
              </h2>
              <p>
                Refunds and exchanges will be processed within 5 business days
                after we receive your returned item. Please note that it may
                take additional time for the refund to appear in your account,
                depending on your payment provider.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding our refund
                policy, please contact our customer support team. We are here to
                assist you and ensure your shopping experience with us is
                enjoyable and hassle-free.
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
              This Refund Policy is provided as a general guideline and is
              subject to change. Last updated: May 2026.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
