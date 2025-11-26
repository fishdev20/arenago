import SectionWrapper from '@/components/ui/section-wrapper'
import { Settings } from 'lucide-react'
import SettingTabs from './_components/setting-tabs'

export default function SettingsPage() {
  return (
    <SectionWrapper className="min-h-screen mt-28 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Settings />
        Settings
      </h1>
      <SettingTabs />
    </SectionWrapper>
  )
}
