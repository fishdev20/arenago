'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGroupDialog({ open, onOpenChange }: Props) {
  const [form, setForm] = useState({
    name: '',
    sport: '',
    location: '',
    schedule: '',
    isPrivate: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Creating group:', form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
          <DialogDescription>
            Set up a private or public group for your favorite sport.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="sport">Sport Type</Label>
            <Input id="sport" name="sport" value={form.sport} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Input id="schedule" name="schedule" value={form.schedule} onChange={handleChange} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isPrivate">Private Group</Label>
            <Switch
              id="isPrivate"
              checked={form.isPrivate}
              onCheckedChange={(v) => setForm((p) => ({ ...p, isPrivate: v }))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
