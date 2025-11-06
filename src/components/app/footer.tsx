import Image from 'next/image'
import { Separator } from '../ui/separator'

export function Footer() {
  return (
    <footer className="relative bg-background overflow-hidden flex flex-col justify-center items-center">
      <Separator className="max-w-6xl px-6" />

      <div className="max-w-6xl px-6">
        <h1 className="flex items-center justify-center text-[5rem] sm:text-[10rem] md:text-[16rem] font-semibold text-foreground/20 select-none leading-none">
          ARENAGO
        </h1>
      </div>

      <div className="relative w-full z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          <p className="text-sm max-w-md leading-relaxed text-foreground/60">
            We connect players, coaches, and communities through local sports centers. Discover new
            games, create groups, and join matches — all in one seamless platform.
          </p>

          <div>
            <h3 className="font-semibold mb-3 text-md uppercase tracking-wide">Social Media</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  {item} <span className="text-gray-500 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col sm:flex-row md:justify-end gap-8 md:gap-16">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-gray-400">
                Perilankuja 6,
                <br />
                Espoo, Finland
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-400">+358 44 982 4682</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">E Mail</h3>
              <a
                href="mailto:minhnguyen.dev20@gmail.com"
                className="text-gray-400 hover:text-white transition"
              >
                minhnguyen.dev20@gmail.com
              </a>
            </div>
          </div>

          <div className="relative w-40 h-40 md:h-auto rounded-xl overflow-hidden">
            <Image
              src="/sports.jpg"
              alt="Tennis net"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 160px, 200px"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="max-w-6xl" />
      <div className="w-full max-w-6xl text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between px-6 py-4">
        <p>© 2025 ArenaGo. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">Designed by Marcus Ng.</p>
      </div>
    </footer>
  )
}
