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
import { sports } from '@/constant'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import FadeUp from '../../shared/fade-up'

export default function SportList() {
  return (
    <Carousel opts={{ align: 'start' }} className="flex w-full gap-6">
      <div className="flex w-full gap-6">
        <Card className="overflow-hidden rounded-xl shadow-lg py-0 hidden md:flex flex-1">
          <CardContent className="relative p-0 w-full h-full">
            <Image
              src={`https://raw.githubusercontent.com/fishdev20/sports/main/images/${sports[0].name}.jpg`}
              alt={sports[0].name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
            />
            <div className="absolute bottom-3 left-3 bg-background/60 px-4 py-1 rounded-full text-sm font-medium text-foreground">
              {sports[0].name}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col justify-between flex-[2] h-full">
          <FadeUp className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Discover <span className="text-primary">Sports Near You.</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base w-full">
              Find clubs and complexes near you in one click, based on your favorite sport.
            </p>
          </FadeUp>

          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <CarouselPrevious className="relative -translate-y-0 left-0 bg-card border border-border rounded-full shadow hover:bg-accent transition" />
              <CarouselNext className="relative -translate-y-0 right-0 bg-card border border-border rounded-full shadow hover:bg-accent transition" />
            </div>
            <Button className="rounded-full">
              <Link href={'/explore'}>See all</Link>
            </Button>
          </div>

          <CarouselContent className="mt-4">
            {sports.slice(1).map((sport, index) => (
              <CarouselItem
                key={index}
                className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative overflow-hidden rounded-xl shadow-lg py-0">
                    <CardContent
                      className={`
            relative p-0
            aspect-[3/4] sm:aspect-[3/4] md:aspect-[4/5]
            max-h-[180px] sm:max-h-[220px] md:max-h-none hover:scale-[1.03] transition-transform
          `}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/fishdev20/sports/main/images/${sport.name}.jpg`}
                        alt={sport.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
                      />
                      <div className="absolute bottom-3 left-3 bg-background/60 px-3 py-1 rounded-full text-sm font-medium shadow capitalize">
                        {sport.name}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </div>
    </Carousel>
  )
}
