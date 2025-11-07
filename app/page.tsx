import Link from "next/link";


// Example 1: Login Card (from your image)
export function LoginCard() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='card-center max-w-md w-full'>
        <h2 className='text-2xl font-semibold mb-2'>Find Your Account</h2>
        <p className='text-muted-foreground mb-6'>
          Please enter your email address or mobile number to search for your
          account.
        </p>

        <input
          type='email'
          placeholder='silvergym@gmail.com'
          className='input-primary mb-4'
        />


      </div>
    </div>
  );
}

// Example 2: Simple Card with just gradient border
export function SimpleCard() {
  return (
    <div className='card-gradient p-6 max-w-sm'>
      <h3 className='text-xl font-semibold mb-2'>Card Title</h3>
      <p className='text-muted-foreground'>
        This card has only the gradient border effect.
      </p>
    </div>
  );
}

// Example 3: Card with only glow effect
export function GlowCard() {
  return (
    <div className='card-glow p-6 max-w-sm rounded-lg bg-card border border-border'>
      <h3 className='text-xl font-semibold mb-2'>Glow Card</h3>
      <p className='text-muted-foreground'>
        This card has only the bottom-left glow effect.
      </p>
    </div>
  );
}

// Example 4: Form with all components
export function ContactForm() {
  return (
    <div className='container-custom section-padding'>
      <div className='card-center max-w-2xl mx-auto'>
        <h2 className='text-3xl font-bold mb-2'>Contact Us</h2>
        <p className='text-muted-foreground mb-8'>
          Fill out the form below and we will get back to you soon.
        </p>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Name</label>
            <input
              type='text'
              placeholder='John Doe'
              className='input-primary'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Email</label>
            <input
              type='email'
              placeholder='john@example.com'
              className='input-primary'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Message</label>
            <textarea
              rows={4}
              placeholder='Your message...'
              className='input-primary resize-none'
            />
          </div>

          <div className='flex gap-4'>
            <button className='btn-primary flex-1'>Send Message</button>
            <button className='btn-secondary flex-1'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example 5: Hero Section
export function HeroSection() {
  return (
    <section className="section-padding bg-gradient-primary text-white min-h-screen flex items-center justify-center">
      <div className="container-custom text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Welcome to Our Platform
        </h1>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Build amazing applications with our modern design system
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/sign-up" className="btn-primary">
            Next
          </Link>
          <Link href="/sign-in" className="btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

// Example 6: Feature Cards Grid
export function FeatureGrid() {
  const features = [
    { title: "Fast Performance", description: "Lightning-fast load times" },
    { title: "Responsive Design", description: "Works on all devices" },
    { title: "Dark Mode", description: "Automatic theme switching" },
    { title: "Accessible", description: "Built with accessibility in mind" },
  ];

  return (
    <section className='section-padding'>
      <div className='container-custom'>
        <h2 className='text-4xl font-bold text-center mb-12'>Features</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='card-glow p-6 rounded-lg bg-card border border-border hover:shadow-primary transition-all'
            >
              <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
              <p className='text-muted-foreground'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Example 7: Complete Page
export default function ExamplePage() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <FeatureGrid />
      <ContactForm />
    </main>
  );
}