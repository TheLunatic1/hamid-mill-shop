// app/products/page.tsx
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import mongoose from "mongoose";
import ProductModals from "@/components/ProductModals";
import ClientFilters from "./ClientFilters";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Our Products | Hamid Oil Flour and Dal Mill",
  description: "Pure mustard oil, fresh atta, premium dal, chola, mug dal, mashkalai, wheat, rice & more – direct from Hamid Mill",
};

export const revalidate = 60; // ISR: refresh every minute

// ──────────────────────────────────────────────
//   Client-safe product type (for ProductCard)
// ──────────────────────────────────────────────
export interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  stock: number;
  imageUrl: string;
  category: string;
}

// ──────────────────────────────────────────────
//   Query params type
// ──────────────────────────────────────────────
type SortOption = "newest" | "price-low" | "price-high" | "name-asc" | "name-desc";

interface ProductsQuery {
  search?: string;
  sort?: SortOption;
  category?: string;
}

// ──────────────────────────────────────────────
//   Data fetching function
// ──────────────────────────────────────────────
async function getProducts(query: ProductsQuery = {}): Promise<ProductCardProps[]> {
  const { search = "", sort = "newest", category = "" } = query;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    // Typed filter object
    const filter: {
      hidden: { $ne: true };
      $or?: Array<{ name: { $regex: string; $options: string } } | { description: { $regex: string; $options: string } }>;
      category?: string;
    } = { hidden: { $ne: true } };

    // Search in name or description
    if (search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Sorting
    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };

    switch (sort) {
      case "price-low":
        sortObj = { price: 1 };
        break;
      case "price-high":
        sortObj = { price: -1 };
        break;
      case "name-asc":
        sortObj = { name: 1 };
        break;
      case "name-desc":
        sortObj = { name: -1 };
        break;
    }

    const rawProducts = await Product.find(filter)
      .sort(sortObj)
      .lean();

    return rawProducts.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      description: doc.description || "",
      stock: doc.stock || 0,
      imageUrl: doc.imageUrl || "/placeholder-product.jpg",
      category: doc.category || "other",
    }));
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

// ──────────────────────────────────────────────
//   Page Component (Server)
// ──────────────────────────────────────────────
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  let sort = typeof params.sort === "string" ? params.sort : "newest";
  const category = typeof params.category === "string" ? params.category : "all";

  // Validate sort
  const validSorts: SortOption[] = ["newest", "price-low", "price-high", "name-asc", "name-desc"];
  if (!validSorts.includes(sort as SortOption)) {
    sort = "newest";
    const url = new URLSearchParams(params as Record<string, string>);
    url.set("sort", "newest");
    redirect(`/products?${url.toString()}`);
  }

  const products = await getProducts({ search, sort: sort as SortOption, category });

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Our Premium Products
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Pure mustard oil, fresh whole wheat atta, moong dal, chana dal, mashkalai, chola, rice & more – 
            straight from Hamid Oil Flour and Dal Mill to your kitchen.
          </p>
        </div>

        {/* Client-side filters + live search */}
        <Suspense fallback={<div className="skeleton h-12 w-full rounded-lg mb-8"></div>}>
          <ClientFilters initialProducts={products} />
        </Suspense>
      </div>

      {/* Modals */}
      <ProductModals products={products} />
    </div>
  );
}