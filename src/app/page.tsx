import About from '@/components/app/landing-page/about'
import Features from '@/components/app/landing-page/features'
import Hero from '@/components/app/landing-page/hero'
import MobileAppSection from '@/components/app/landing-page/mobile-intro'
import SportCategories from '@/components/app/landing-page/sport-categories'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <SportCategories />
      <MobileAppSection />
    </div>
  )
}
