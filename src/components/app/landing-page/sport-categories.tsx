import SectionWrapper from '@/components/ui/section-wrapper'
import Location from './sport-categories/location'
import SportList from './sport-categories/sports'

export default function SportCategories() {
  return (
    <SectionWrapper>
      <div className="flex gap-8 md:gap-16 flex-col">
        <Location />
        <SportList />
      </div>
    </SectionWrapper>
  )
}
