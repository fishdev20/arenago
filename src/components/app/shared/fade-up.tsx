'use client'

import { cn } from '@/lib/utils'
import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: 'easeOut',
    },
  }),
}

interface FadeUpProps {
  children: ReactNode
  className?: string
  custom?: number
}

export default function FadeUp({ children, className, custom = 0 }: FadeUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUpVariants}
      custom={custom}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
