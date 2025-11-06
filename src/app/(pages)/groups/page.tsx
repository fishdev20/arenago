'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useUserStore } from '@/store/user-store'
import { LogIn, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { CreateGroupDialog } from './_components/create-group-dialog'
import { GroupCard } from './_components/group-card'
import { GroupDetailsDialog } from './_components/group_details_dialog'

type Group = {
  id: string
  name: string
  sport: string
  location: string
  memberCount: number
  schedule: string
  isPrivate: boolean
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [publicGroups, setPublicGroups] = useState<Group[]>([])
  const [open, setOpen] = useState(false)
  const { user, loading } = useUserStore()
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  useEffect(() => {
    const myGroups: Group[] = [
      {
        id: '1',
        name: 'Badminton Mates',
        sport: 'Badminton',
        location: 'Helsinki Sports Center',
        memberCount: 8,
        schedule: 'Tue & Thu • 18:00 - 20:00',
        isPrivate: true,
      },
      {
        id: '2',
        name: 'Morning Joggers',
        sport: 'Running',
        location: 'Espoo Tapiola Track',
        memberCount: 5,
        schedule: 'Every morning • 07:30',
        isPrivate: true,
      },
      {
        id: '3',
        name: 'Weekend Swimmers',
        sport: 'Swimming',
        location: 'Leppävaara Indoor Pool, Espoo',
        memberCount: 10,
        schedule: 'Sat • 10:00 - 12:00',
        isPrivate: true,
      },
    ]

    // 🌍 Public groups available to explore
    const discoverGroups: Group[] = [
      {
        id: '4',
        name: 'Weekend Footballers',
        sport: 'Football',
        location: 'Espoo Arena',
        memberCount: 14,
        schedule: 'Sat & Sun • 14:00 - 17:00',
        isPrivate: false,
      },
      {
        id: '5',
        name: 'City Cyclists',
        sport: 'Cycling',
        location: 'Central Park, Helsinki',
        memberCount: 22,
        schedule: 'Wed • 18:30',
        isPrivate: false,
      },
      {
        id: '6',
        name: 'Padel Power',
        sport: 'Padel',
        location: 'Padel Club Kauniainen',
        memberCount: 6,
        schedule: 'Fri • 17:00 - 19:00',
        isPrivate: false,
      },
      {
        id: '7',
        name: 'Weekend Basketball Crew',
        sport: 'Basketball',
        location: 'Otaniemi Sports Hall, Espoo',
        memberCount: 9,
        schedule: 'Sun • 15:00 - 17:00',
        isPrivate: false,
      },
      {
        id: '8',
        name: 'Yoga by the Lake',
        sport: 'Yoga',
        location: 'Töölönlahti Park, Helsinki',
        memberCount: 12,
        schedule: 'Sat • 09:00 - 10:30',
        isPrivate: false,
      },
      {
        id: '9',
        name: 'Ultimate Frisbee Fun',
        sport: 'Ultimate Frisbee',
        location: 'Hietaniemi Beach',
        memberCount: 16,
        schedule: 'Wed • 17:30',
        isPrivate: false,
      },
    ]

    setGroups(myGroups)
    setPublicGroups(discoverGroups)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Groups</h1>
          <p className="text-muted-foreground text-sm">
            Manage your groups or discover new ones to join.
          </p>
        </div>
        {user && !loading && (
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create Group
          </Button>
        )}
      </div>

      {/* My Groups Section */}
      <section>
        <h2 className="text-lg font-semibold mb-3">My Groups</h2>

        {/* 🔄 Show loader while fetching user */}
        {loading ? (
          <div className="w-full flex justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : !user ? (
          // 🧩 Not logged in
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center p-10"
          >
            <LogIn className="h-10 w-10 mb-3 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-1">Sign in to view your groups</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Log in to see the groups you’ve joined or created, and to access your private
              communities.
            </p>
            <Button size="lg" onClick={() => (window.location.href = '/signin')}>
              Sign In
            </Button>
          </motion.div>
        ) : groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">You haven’t joined any groups yet.</p>
        ) : (
          // ✅ Show private groups when logged in
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {groups.map((group, i) => (
              <GroupCard
                key={group.id}
                group={group}
                index={i}
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Discover Public Groups */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Discover Public Groups</h2>
        {publicGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground">No public groups found.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {publicGroups.map((group, i) => (
              <GroupCard
                key={group.id}
                group={group}
                index={i}
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </motion.div>
        )}
      </section>

      <CreateGroupDialog open={open} onOpenChange={setOpen} />

      {selectedGroup && (
        <GroupDetailsDialog
          open={!!selectedGroup}
          onOpenChange={(open) => {
            if (!open) setSelectedGroup(null)
          }}
          group={{
            ...selectedGroup,
            members: [
              {
                name: 'Olivia Sparks',
                avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
              },
              {
                name: 'Howard Lloyd',
                avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
              },
              {
                name: 'Hallie Richards',
                avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
              },
              {
                name: 'Jenny Wilson',
                avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
              },
            ],
          }}
        />
      )}
    </div>
  )
}
