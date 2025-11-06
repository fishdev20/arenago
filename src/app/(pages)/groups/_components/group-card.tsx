'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, Lock, MapPin, Users } from 'lucide-react'
import { motion } from 'motion/react'

type Group = {
  id: string
  name: string
  sport: string
  location: string
  memberCount: number
  schedule: string
  isPrivate: boolean
}

export function GroupCard({
  group,
  index,
  onClick,
}: {
  group: Group
  index: number
  onClick?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1, // stagger fade-up
        ease: 'easeOut',
      }}
      onClick={onClick}
    >
      <Card
        className={cn(
          'shadow-sm border border-border/50 transition hover:shadow-md hover:bg-accent cursor-pointer'
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>{group.name}</span>
            {group.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="font-medium text-foreground">{group.sport}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {group.location}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" /> {group.memberCount} members
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {group.schedule}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
