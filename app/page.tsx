// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

import React from "react";

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

        <button className='btn-primary w-full'>Next</button>
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
          Fill out the form below and we'll get back to you soon.
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
    <section className='section-padding bg-gradient-primary text-white'>
      <div className='container-custom text-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-white'>
          Welcome to Our Platform
        </h1>
        <p className='text-xl mb-8 text-white/90 max-w-2xl mx-auto'>
          Build amazing applications with our modern design system
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
          <button className='px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all'>
            Get Started
          </button>
          <button className='px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/30'>
            Learn More
          </button>
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