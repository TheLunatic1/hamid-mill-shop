import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Hamid Oil Flour and Dal Mill",
  description: "Learn about Hamid Oil Flour and Dal Mill – your trusted source for pure mustard oil, fresh atta, premium dal, and grains since decades.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            About Hamid Oil Flour and Dal Mill
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Generations of trust, purity, and tradition – bringing the best of nature to your kitchen.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Legacy</h2>
            <div className="prose prose-lg max-w-none text-base-content/80">
              <p>
                Established decades ago in the heart of Bangladesh, <strong>Hamid Oil Flour and Dal Mill</strong> has been a symbol of quality and authenticity.
              </p>
              <p>
                What started as a small family-run mill has grown into a trusted name in households across the country. We are committed to preserving traditional methods while embracing modern quality standards.
              </p>
              <p>
                Every drop of oil, every bag of atta, and every packet of dal is processed with care, ensuring you get the purest and freshest products straight from our mill.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Hamid Mill Traditional Processing"
                width={1200}
                height={800}
                className="object-cover w-full h-96 lg:h-125"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white text-xl font-medium">
                  Traditional stone-ground milling – the secret to our authentic taste
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-4xl">🌾</span>
              </div>
              <h3 className="text-2xl font-bold text-primary">Purity First</h3>
              <p className="text-base-content/70">
                No additives, no preservatives – 100% natural and pure.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <span className="text-4xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary">Family Tradition</h3>
              <p className="text-base-content/70">
                Passed down through generations with love and care.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-accent">Sustainability</h3>
              <p className="text-base-content/70">
                Ethical sourcing and eco-friendly practices.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Taste the Tradition – Choose Hamid Mill
          </h2>
          <Link href="/products" className="btn btn-primary btn-lg">
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}