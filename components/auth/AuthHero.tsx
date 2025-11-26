/* eslint-disable @next/next/no-img-element */
"use client";

export default function AuthHero() {
  const gymNames = ["Silver Gym", "Silver Gym", "Silver Gym", "Silver Gym"];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mb-4">
      <div className='relative flex-1 bg-primary flex flex-col px-8 py-12 overflow-x-hidden'>
        <div className='absolute -top-20 -right-20 w-[420px] h-[420px] bg-[#F89238] rounded-full blur-[210px]  pointer-events-none' />

        <div className='relative z-10 flex flex-col h-full justify-between gap-5'>
          <section className='flex flex-col items-start gap-4 w-full'>
            <div className='flex flex-col items-start gap-1 w-full'>
              <h1 className='w-full  font-bold text-white text-4xl tracking-[0] leading-14'>
                All-in-One Gym Management Platform
              </h1>

              <p className='w-full  font-normal text-transparent text-xl tracking-[0] leading-7'>
                <span className='font-bold text-white'>
                  Simplify your daily operations and grow your business
                </span>

                <span className='text-white'> —</span>

                <span className='text-[#ffded7]'>
                  Easily manage memberships, billing, expenses, packages, and
                  analytics — everything you need to run your gym smoothly in
                  one smart system.
                </span>
              </p>
            </div>

            <div className='w-64 h-px bg-white'></div>
          </section>

          <div className='w-full mx-auto flex justify-center items-center'>
            <img
              src='/images/auth.png'
              alt='Gym Management Dashboard'
              className='w-[656] h-auto drop-shadow-2xl object-contain'
            />
          </div>
        </div>
      </div>
      <section className='relative w-full mb-4'>
        {/* Track - Duplicate content for seamless loop */}
        <div className='flex animate-marquee gap-8 w-max'>
          {/* First set */}
          {gymNames.map((name, index) => (
            <span
              key={`gym-1-${index}`}
              className='inline-flex font-semibold text-white text-3xl tracking-0 leading-10 whitespace-nowrap'
            >
              {name}
            </span>
          ))}
          {/* Second set (duplicate) */}
          {gymNames.map((name, index) => (
            <span
              key={`gym-2-${index}`}
              className='inline-flex font-semibold text-white text-3xl tracking-0 leading-10 whitespace-nowrap'
            >
              {name}
            </span>
          ))}
        </div>

        {/* Fade edges */}
        <div className='absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(225,99,73,1)_10%,rgba(225,100,74,0)_30%,rgba(225,100,74,0)_70%,rgba(225,99,73,1)_90%)]' />
      </section>
    </div>
  );
}
