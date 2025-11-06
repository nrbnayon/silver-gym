"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

export default function AuthHero() {
  const gymNames = ["Silver Gym", "Silver Gym", "Silver Gym", "Silver Gym"];

  return (
    <div className='hidden lg:flex lg:w-1/2 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden'>
      {/* Top Content */}
      <div className='relative z-10'>
        <h3 className='text-3xl font-bold mb-4 leading-tight'>
          All-in-One Gym Management Platform
        </h3>
        <p className='text-lg leading-relaxed'>
          <span className='font-semibold'>
            Simplify your daily operations and grow your business
          </span>{" "}
          <span className='text-white/80'>
            — Easily manage memberships, billing, expenses, packages, and
            analytics — everything you need to run your gym smoothly in one
            smart system.
          </span>
        </p>
        <div className='w-3xs h-1 bg-white/80 mt-6 rounded-full'></div>
      </div>

      {/* Dashboard Preview Image */}
      <div className='relative z-10 mt-8'>
        <Image
          src='/images/auth.png'
          alt='Gym Management Dashboard'
          width={656}
          height={578}
          className='w-full h-auto drop-shadow-2xl rounded-lg'
          priority
        />
      </div>

      {/* Marquee at Bottom */}
      <div className='relative z-10 mt-8'>
        <Marquee className='[--duration:30s]' pauseOnHover>
          {gymNames.map((name, i) => (
            <span
              key={i}
              className='text-3xl font-bold text-white/30 whitespace-nowrap mx-6'
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
