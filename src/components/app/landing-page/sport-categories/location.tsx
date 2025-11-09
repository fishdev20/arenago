'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cities } from '@/constant'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import FadeUp from '../../shared/fade-up'

export default function Location() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full mx-auto"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 md:mb-10">
        <FadeUp className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Where to <span className="text-primary">Play Sports</span> in Finland?
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base w-full">
            Explore top cities to book football fields, courts, and sports centers — all through
            ArenaGo.
          </p>
        </FadeUp>

        <div className="flex gap-2 justify-between md:justify-end items-center w-full md:w-auto flex-shrink-0">
          <div className="space-x-2">
            <CarouselPrevious className="relative left-0 -translate-y-0 bg-card border border-border rounded-full shadow hover:bg-accent transition" />
            <CarouselNext className="relative right-0 -translate-y-0 bg-card border border-border rounded-full shadow hover:bg-accent transition" />
          </div>

          <Button className="rounded-full">
            <Link href={'/explore'}>See all</Link>
          </Button>
        </div>
      </div>
      <CarouselContent className="my-4">
        {cities.map((city, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={`/explore?city=${city.code}`} passHref>
                <Card className="relative overflow-hidden rounded-xl shadow-lg hover:scale-[1.03] transition-transform py-0">
                  <CardContent className="relative p-0 aspect-[4/5]">
                    <Image
                      src={`/images/cities/${city.name.toLowerCase()}.jpg`}
                      alt={city.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
                    />

                    <div className="absolute bottom-2 left-2 bg-background/50 px-3 py-1 rounded-full text-sm font-medium shadow capitalize">
                      {city.name}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
