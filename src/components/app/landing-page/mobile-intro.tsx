'use client'

import { Button } from '@/components/ui/button'
import { Iphone } from '@/components/ui/iphone'
import SectionWrapper from '@/components/ui/section-wrapper'
import { Apple, Play } from 'lucide-react'
import FadeUp from '../shared/fade-up'

export default function MobileAppSection() {
  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeUp className="space-y-5">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-background/70 backdrop-blur border border-border hover:bg-background"
          >
            Coming Soon
          </Button>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Stay Connected with <br /> <span className="text-primary">ArenaGo Mobile</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Manage bookings, join matches, and stay updated with your favorite sports centers — all
            from your phone. The <strong>ArenaGo App</strong> makes playing, planning, and
            connecting easier than ever.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <FadeUp custom={0.3} className="flex flex-wrap gap-4 mt-6">
              <Button
                size="lg"
                className="flex items-center gap-2 bg-black text-white hover:bg-black/80 px-6"
                onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}
              >
                <Apple className="w-5 h-5" />
                Download on iOS
              </Button>

              <Button
                size="lg"
                className="flex items-center gap-2 bg-[#3DDC84] text-black hover:bg-[#3DDC84]/90 px-6"
                onClick={() => window.open('https://play.google.com/store', '_blank')}
              >
                <Play className="w-5 h-5" />
                Download on Android
              </Button>
            </FadeUp>
          </div>
        </FadeUp>

        <FadeUp custom={0} className="flex justify-center md:justify-end">
          <div className="relative w-[240px] md:w-[300px] overflow-hidden">
            <Iphone src="/app-preview.png" />
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  )
}
