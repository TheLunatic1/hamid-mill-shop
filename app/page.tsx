import { FcShop } from "react-icons/fc";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Hamid Oil Flour and Dal Mill
        </h1>
        <p className="text-xl text-secondary">Premium Quality Products</p>
        <button className="btn btn-primary mt-8">
          <FcShop size={24} />
          Explore Shop
        </button>
      </div>
    </main>
  );
}