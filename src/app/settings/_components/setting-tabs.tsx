'use client'
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs'
import { useUserStore } from '@/store/user-store'
import Profile from './profile'

export interface Tab {
  label: string
  icon?: React.ReactNode
  value: string
  subRoutes?: string[]
  content?: React.ReactNode
}

export default function SettingTabs() {
  const { user } = useUserStore()

  if (!user) return null

  const tabs: Tab[] = [
    {
      label: 'Profile',
      value: 'profile',
      content: <Profile />,
    },
    {
      label: 'Notifications',
      value: 'notifications',
    },
    {
      label: 'Security',
      value: 'security',
      content: <div></div>,
    },
    {
      label: 'Danger Zone',
      value: 'danger-zone',
      content: (
        <div className="text-red-500">
          <h2 className="text-xl font-bold mb-2">Danger Zone</h2>
          <p>This will delete your account permanently.</p>
        </div>
      ),
    },
  ]
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          {tabs.map((tab) => {
            return (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContents className="py-6 ">
          {tabs.map((tab, idx) => {
            return (
              <TabsContent key={idx} value={tab.value} className="bg-transparent border-none">
                {tab.content}
              </TabsContent>
            )
          })}
        </TabsContents>
      </Tabs>
    </div>
  )
}
