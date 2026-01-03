export default function Home() {
  return (
    <main className="min-h-screen pt-20"> {/* pt-20 to avoid overlap with fixed navbar */}
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">
              Welcome to Hamid Oil Flour and Dal Mill
            </h1>
            <p className="py-6 text-xl text-secondary">
              Pure, fresh, and premium quality cooking oil, flour, and dal delivered to your door.
            </p>
            <button className="btn btn-primary btn-lg">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}