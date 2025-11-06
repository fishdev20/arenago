import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type SectionWrapperProps = {
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <section className={cn('w-full max-w-6xl mx-auto px-6 py-10 md:py-20 h-full', className)}>
      {children}
    </section>
  )
}
