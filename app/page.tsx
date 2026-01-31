import { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";
import Image from "next/image";
import Product from "@/models/Product";
import mongoose from "mongoose";

export const metadata: Metadata = {
  title: "Hamid Oil Flour and Dal Mill – Pure & Fresh Since Generations",
  description: "Premium mustard oil, whole wheat atta, moong dal, chana dal, mashkalai & more – direct from our mill to your kitchen.",
};

export const revalidate = 300;

async function getFeaturedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const products = await Product.find({ hidden: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    return products.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      imageUrl: doc.imageUrl || "/placeholder-product.jpg",
    }));
  } catch (error) {
    console.error("Featured products error:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen pt-20 bg-base-200">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <section className="py-16 bg-base-100 border-t border-base-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="space-y-4">
              <div className="text-6xl text-primary">🌿</div>
              <h3 className="text-2xl font-bold">100% Pure & Natural</h3>
              <p className="text-base-content/70">
                No chemicals, no adulteration – just honest goodness.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl text-secondary">👨‍🌾</div>
              <h3 className="text-2xl font-bold">Family Tradition</h3>
              <p className="text-base-content/70">
                Generations of authentic stone-ground milling.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl text-accent">🚚</div>
              <h3 className="text-2xl font-bold">Fast Home Delivery</h3>
              <p className="text-base-content/70">
                Serving Pabna and surrounding areas with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <figure className="px-6 pt-6 relative overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="rounded-xl object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-xl font-semibold">{product.name}</h2>
                    <p className="text-2xl font-bold text-secondary">
                      ৳{product.price} <span className="text-base font-normal">/ {product.unit}</span>
                    </p>
                    <div className="card-actions mt-4">
                      <Link href="/products" className="btn btn-outline btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-xl text-base-content/70 py-12">
                Loading featured products...
              </p>
            )}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="btn btn-primary btn-lg px-12">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-content text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Taste the Tradition Today
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            From our family mill to your family table – pure, fresh, and full of love.
          </p>
          <Link href="/products" className="btn btn-secondary btn-lg text-lg px-12">
            Explore Our Range
          </Link>
        </div>
      </section>
    </main>
  );
}