import SectionWrapper from '@/components/ui/section-wrapper'
import FadeUp from '../shared/fade-up'
import FeaturesGrid from './features/feature-grid'

export default function Features() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk leading-tight tracking-tight">
            Your Game, <span className="text-primary">Your Way</span>
          </h2>
        </FadeUp>

        <FadeUp custom={1}>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            ArenaGo makes it simple to <strong>book courts</strong>, <strong>join matches</strong>,
            and <strong>connect with players</strong> around you. Experience the future of sports
            booking — fast, social, and effortless.
          </p>
        </FadeUp>
      </div>

      {/* Features Grid */}
      <FadeUp custom={2} className="relative z-10 mt-16">
        <FeaturesGrid />
      </FadeUp>
    </SectionWrapper>
  )
}
