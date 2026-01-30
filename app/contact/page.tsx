import { Metadata } from "next";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

export const metadata: Metadata = {
  title: "Contact Us | Hamid Oil Flour and Dal Mill",
  description: "Get in touch with Hamid Oil Flour and Dal Mill – we're here to serve you with the best quality products.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            We’d love to hear from you! Whether you have questions about our products or want to place a bulk order – we’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary mb-8">Reach Out</h2>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <HiPhone className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="text-base-content/80 text-lg">+880 1711-XXXXXX (Main)</p>
                    <p className="text-base-content/80">+880 1911-XXXXXX (Orders)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <HiMail className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="text-base-content/80 text-lg">
                      info@hamidoilflour.com
                    </p>
                    <p className="text-base-content/80">
                      orders@hamidoilflour.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <HiLocationMarker className="text-2xl text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Address</h3>
                    <p className="text-base-content/80 text-lg">
                      M/s Hamid Oil, Flour & Dal Mill (Head Office)<br />
                      X6XV+JXG, South, Pabna, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Your Message</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you today?"
                    className="textarea textarea-bordered w-full"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-base-content/60 mt-6">
                We usually respond within 24 hours. Thank you for reaching out!
              </p>
            </div>
          </div>
        </div>

        {/* Updated Google Maps – your location */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Find Us
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902916835837!2d89.2446822!3d23.9992536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b0053276095%3A0xc6f87b0f1e9dd32!2sM%2Fs%20Hamid%20Oil%2CFlour%20%26%20Dal%20Mill%2CHead%20office!5e0!3m2!1sen!2sbd!4v1725023456789"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}