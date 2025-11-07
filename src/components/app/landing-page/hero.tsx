'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { Button } from '../../ui/button'

// Text for the hero title
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

// Animation variants for each letter
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // triggers until hero leaves viewport
  })

  // Parallax and fade effects for background image
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  return (
    <section
      className="w-full mx-auto px-6 py-10 md:py-20 relative overflow-hidden max-w-screen h-screen flex items-center justify-center"
      ref={ref}
    >
      <div className="flex flex-col justify-between z-10 w-full max-w-6xl h-[90vh]">
        {/* Top Right Text + Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full md:max-w-xs self-end flex flex-col items-end space-y-2 mt-20"
        >
          <p className="text-foreground text-sm md:text-md text-right">
            ARENAGO connects you with local players, communities, and courts — all in one seamless
            platform.
          </p>
          <Button variant="default" className="bg-white text-black rounded-full px-6">
            Explore <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Main Title + Stats */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          {/* Left Side Title */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4 rounded-full text-xs md:text-md border border-border bg-foreground/20 backdrop-blur-lg px-4 py-2"
            >
              One Platform for All Your Games.
            </motion.span>

            {/* Animated Heading */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl"
              initial="hidden"
              animate="visible"
            >
              {['Find Your Match.', 'Book the Game.', 'Play Today.'].map((line, lineIndex) => (
                <motion.div key={lineIndex} className="overflow-hidden">
                  {line.split('').map((char, i) => (
                    <motion.span
                      initial="hidden"
                      whileInView="visible"
                      key={i}
                      variants={letterVariants}
                      custom={i + lineIndex * 10}
                      className={char === ' ' ? 'inline-block w-2' : 'inline-block'}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <br />
                </motion.div>
              ))}
            </motion.h1>
          </div>

          {/* Right Side Player Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col gap-4 items-start md:items-end"
          >
            <div className="flex items-center gap-2 rounded-full text-xs md:text-md bg-foreground/20 backdrop-blur-lg px-4 py-2 border border-border">
              <div className="flex -space-x-2">
                {avatars.map((avatar, index) => (
                  <Avatar key={index} className="ring-foreground/20 ring-2">
                    <AvatarImage src={avatar.src} alt={avatar.name} />
                    <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-muted-foreground px-2 text-xs">
                Loved by <strong className="text-foreground font-medium">10K+</strong> active
                players.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full text-xs md:text-md bg-foreground/20 backdrop-blur-lg px-4 py-2 border border-border">
              <div className="flex -space-x-2">
                {avatars.map((avatar, index) => (
                  <Avatar key={index} className="ring-foreground/20 ring-2">
                    <AvatarImage src={avatar.src} alt={avatar.name} />
                    <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>

              <p className="text-muted-foreground px-2 text-xs">
                <strong className="text-foreground font-medium">2.3K+</strong> Active Experienced
                Coaches.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Image + Overlays */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10 will-change-transform">
        <Image src="/bg-home.jpg" alt="sports" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background" />
      </motion.div>
    </section>
  )
}
