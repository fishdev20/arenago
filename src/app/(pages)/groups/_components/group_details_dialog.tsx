'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { Globe, Lock, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

type GroupDetailProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: {
    id: string
    name: string
    sport: string
    location: string
    memberCount: number
    schedule: string
    isPrivate: boolean
    members?: { name: string; avatar?: string }[]
    image?: string
  }
}

export function GroupDetailsDialog({ open, onOpenChange, group }: GroupDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-6xl p-0 h-[80vh] overflow-auto">
        {/* Banner */}
        <div className="relative w-full h-52">
          <Image
            src={group.image || '/tennis.png'}
            alt={group.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-bold text-white">{group.name}</h2>
            <p className="flex items-center gap-2 text-sm text-white/80">
              {group.isPrivate ? (
                <>
                  <Lock className="w-4 h-4" /> Private Group
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" /> Public Group
                </>
              )}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Info */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" /> {group.location}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" /> {group.memberCount} Members
              </p>
              <p className="text-muted-foreground">Schedule: {group.schedule}</p>
            </div>

            <Button className="rounded-full px-6 py-2 self-start md:self-center">
              {group.isPrivate ? 'Request to Join' : 'Join Group'}
            </Button>
          </div>

          <Separator />

          {/* Members List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Members</h3>
            <div className="flex -space-x-3">
              {(group.members || []).slice(0, 6).map((member, i) => (
                <Avatar key={i} className="ring-2 ring-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {group.memberCount > 6 && (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-sm">
                  +{group.memberCount - 6}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Calendar Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Upcoming Sessions</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-border p-4 bg-card"
            >
              <Calendar mode="single" selected={new Date()} />
            </motion.div>
          </div>

          {/* Future Expansion: Highlights */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">Recent Highlights</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-40 h-28 rounded-lg overflow-hidden border border-border hover:scale-105 transition-transform"
                >
                  <Image
                    src={`/images/highlight-${i}.jpg`}
                    alt="Group highlight"
                    width={160}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
