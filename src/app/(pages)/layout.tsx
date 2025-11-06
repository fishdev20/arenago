import SectionWrapper from '@/components/ui/section-wrapper'
import Image from 'next/image'
import HeaderSection from './_components/PageHeader'

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-full px-4 py-8 h-[25vh] flex justify-center items-center text-center">
        <HeaderSection />
        <Image
          src="/page-header.png"
          alt="sports"
          fill
          loading="lazy"
          className="absolute inset-0 object-cover -z-10"
        />

        <div className="absolute top-0 left-0 right-0 h-full w-full bg-background opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" />
      </div>
      <SectionWrapper>{children}</SectionWrapper>
    </div>
  )
}
