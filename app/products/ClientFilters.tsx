// app/products/ClientFilters.tsx
"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductCardProps } from "@/app/products/page";

type SortOption = "newest" | "price-low" | "price-high" | "name-asc" | "name-desc";

type Props = {
  initialProducts: ProductCardProps[];
};

export default function ClientFilters({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Live search (name + description)
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "newest") return 0;
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [initialProducts, search, category, sort]);

  return (
    <div className="mb-8">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Live Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Live search (e.g. চাকা মার্কা সরিষার তেল)"
          className="input input-bordered w-full sm:w-96"
        />

        {/* Category + Sort */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-44"
          >
            <option value="all">All Categories</option>
            <option value="oil">Oil</option>
            <option value="flour">Flour</option>
            <option value="dal">Dal</option>
            <option value="grains">Grains</option>
            <option value="other">Other</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="select select-bordered w-44"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Products Grid – Daraz-style responsive layout */}
      {filteredProducts.length === 0 ? (
        <div className="alert alert-info shadow-lg max-w-2xl mx-auto mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No products found. Try different search terms or category.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}