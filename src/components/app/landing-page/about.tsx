'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SectionWrapper from '@/components/ui/section-wrapper'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import FadeUp from '../shared/fade-up'

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

function AnimatedNumber({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = target / (duration * 60)
    const interval = setInterval(() => {
      start += increment
      if (start >= target) {
        start = target
        clearInterval(interval)
      }
      setCount(start)
    }, 16)
    return () => clearInterval(interval)
  }, [inView, target, duration])

  // format large numbers like 50000 → "50K"
  const format = (n: number) => {
    if (n >= 1000 && n < 1000000) return `${(n / 1000).toFixed(1)}K`
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    return n.toFixed(1).replace(/\.0$/, '')
  }

  return (
    <span ref={ref} className="text-3xl font-bold">
      {format(count)}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <SectionWrapper className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Title and Description */}
        <div>
          <FadeUp>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary via-primary/70 to-transparent rounded-full" />
              <div className="ml-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Story</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  ArenaGo started with a vision — to make sports{' '}
                  <strong>more accessible, organized,</strong> and <strong>fun</strong> for
                  everyone. Whether you’re booking a football field, joining a badminton match, or
                  managing your sports center, ArenaGo brings it all together in one platform.
                </p>
                <p className="text-xs md:text-base text-muted-foreground">
                  Our mission is simple: help players connect, teams grow, and sports centers
                  thrive. We’re transforming how people play, schedule, and manage their games — one
                  match at a time.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Right Column - Image and Stats */}
        <FadeUp custom={1} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FadeUp custom={1.2} className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/basketball-player.png"
                alt="Football Group"
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </FadeUp>
            <FadeUp custom={1.3} className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/tennis-player.png"
                alt="Badminton Court"
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </FadeUp>
          </div>

          {/* Stats and CTA */}
          <FadeUp
            custom={1.4}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div>
              <AnimatedNumber target={50000} suffix="+" />
              <p className="text-muted-foreground text-sm">Active Players</p>
            </div>

            <div>
              <AnimatedNumber target={1200} suffix="+" />
              <p className="text-muted-foreground text-sm">Sports Centers</p>
            </div>

            <div>
              <AnimatedNumber target={4.8} suffix="★" />
              <p className="text-muted-foreground text-sm">Player Satisfaction</p>
            </div>
          </FadeUp>

          {/* Avatars + Watch Intro */}
          <FadeUp custom={1.6} className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <Avatar key={index} className="ring-foreground/20 ring-2">
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition"
            >
              <Play size={16} /> WATCH INTRO
            </motion.button>
          </FadeUp>
        </FadeUp>
      </div>
    </SectionWrapper>
  )
}
