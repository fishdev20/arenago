'use client'

import { usePathname } from 'next/navigation'

export default function HeaderSection() {
  const pathname = usePathname()

  const config: Record<string, { title: string; description: string }> = {
    '/explore': {
      title: 'Explore',
      description: 'Find courts, gyms, and arenas near you — and start playing today.',
    },
    '/groups': {
      title: 'Groups',
      description: 'Join sports groups and communities near you.',
    },
    '/event': {
      title: 'Events',
      description: 'Find and participate in upcoming sports events.',
    },
  }

  const section =
    Object.entries(config).find(([key]) => pathname.startsWith(key))?.[1] ?? config['/explore']

  return (
    <header className="mt-6 z-10 max-w-xs">
      <h1 className="text-2xl md:text-4xl font-space-grotesk font-bold">{section.title}</h1>
      <p className="text-sm md:text-base">{section.description}</p>
    </header>
  )
}
