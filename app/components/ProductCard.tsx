"use client";

import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  imageUrl?: string;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const openModal = () => {
    const modal = document.getElementById(`modal-${product._id}`) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={openModal}
    >
      <figure className="px-6 pt-6">
        <Image
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-xl object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="card-body pt-4">
        <h2 className="card-title text-primary line-clamp-2">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-2xl font-bold text-secondary">৳{product.price}</p>
          <span className="text-sm text-base-content/60">{product.unit}</span>
        </div>
      </div>
    </div>
  );
}