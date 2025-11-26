import Link from "next/link";
export function HeroSection() {
  return (
    <section className="section-padding bg-gradient-primary text-white min-h-screen flex items-center justify-center">
      <div className="container-custom text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Welcome to Our Silver Gym Platform
        </h1>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          We are here to help you to build amazing applications with our modern design system
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/sign-up" className="btn-primary">
            Sign Up
          </Link>
          <Link href="/sign-in" className="btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ExamplePage() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
    </main>
  );
}