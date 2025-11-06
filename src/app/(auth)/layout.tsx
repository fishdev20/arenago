import SectionWrapper from '@/components/ui/section-wrapper'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <SectionWrapper className="flex justify-center items-center">
        <Image
          src="/page-header.png"
          alt="sports"
          fill
          loading="lazy"
          className="absolute inset-0 object-cover -z-10"
        />

        <div className="absolute inset-0 bg-background/50 -z-5" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="w-full max-w-xl z-10 flex flex-col justify-center rounded-xl shadow-lg">
          {children}
        </div>
      </SectionWrapper>
    </div>
  )
}
