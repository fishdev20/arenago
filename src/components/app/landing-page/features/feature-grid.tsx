'use client'
import authAnimation from '@/../public/animations/ai.json'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Calendar } from '@/components/ui/calendar'
import Lottie from 'lottie-react'
import { CalendarIcon, Dumbbell, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
  },
]

const features = [
  {
    Icon: Sparkles,
    name: 'AI-Powered Suggestions',
    description:
      'Let our AI suggest the best facilities based on your preferences, location, and group size.',
    href: '#',
    cta: 'Coming soon.',
    className: 'col-span-1 md:col-span-1 lg:col-span-1',
    background: (
      <Lottie
        animationData={authAnimation}
        loop={true}
        className={
          'w-60 h-60 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] [--duration:20s] absolute top-2 right-14 transition-all duration-300 ease-out group-hover:scale-110'
        }
      />
    ),
  },
  {
    Icon: Users,
    name: 'Group Schedulling',
    description:
      'Coordinate with your friends and teammates to find a time that works for everyone, simplifying the planning process.',
    href: '#',
    cta: 'Create group',
    className: 'col-span-1 md:col-span-1 lg:col-span-2',
    background: (
      <div className="absolute bg-background border border-border rounded-lg p-4 flex flex-col items-center justify-center h-72 w-[100%] mx-auto transform-gpu transition-all duration-500 ease-out hover:scale-95 [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)] overflow-hidden">
        <Image
          src="/tennis-court.png"
          alt="Tennis court background"
          fill
          className="object-cover opacity-70 rounded-lg -z-10"
          priority
        />

        <span className="absolute top-2 left-2 px-3 py-1 text-sm rounded-md font-medium shadow-sm bg-foreground/20 backdrop-blur-l text-white">
          Court 1: 4–5 PM
        </span>

        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <Avatar key={index} className="ring-foreground/20 ring-2">
              <AvatarImage src={avatar.src} alt={avatar.name} />
              <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <span className="absolute bottom-2 right-2 px-3 py-1 text-xs bg-muted text-muted-foreground rounded-md backdrop-blur-sm">
          You’re all set!
        </span>
      </div>
    ),
  },
  {
    Icon: Dumbbell,
    name: 'Multi-sport access',
    description: 'Access a wide range of sports facilities all in one platform.',
    href: '#',
    cta: 'Explore',
    className: 'col-span-1 md:col-span-1 lg:col-span-2',
    background: (
      <div className="absolute bg-background border border-border rounded-lg p-4 flex flex-col items-center justify-center h-72 w-[100%] mx-auto transform-gpu transition-all duration-500 ease-out hover:scale-95 [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)] overflow-hidden">
        <Image
          src="/globe.png"
          alt="globe background"
          fill
          className="object-cover opacity-70 rounded-lg -z-10"
          priority
        />
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: 'Smart Booking',
    description:
      'Easily find and book facilities with our intuitive calendar interface ensuring you get the perfect time slot',
    className: 'col-span-1 md:col-span-1 lg:col-span-1',
    href: '#',
    cta: 'Book now',
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute w-[80%] top-2 right-2 origin-top rounded-lg border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
]

export default function FeaturesGrid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
