import { BackButton } from '@/components/app/back-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getFacilityWithId } from '@/services/facilities/server'
import { Building2, CalendarCheck, Car, Check, Globe, Mail, Phone, Share2, X } from 'lucide-react'
import Link from 'next/link'
import Address from '../_components/address'
import FacilityMap from '../_components/facility-map'

export default async function ExploreDetailPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { data, category } = await getFacilityWithId(id)
  console.log({ data, category })
  const properties = data.properties || {}
  const location = data.location || {}
  const searchMeta = data['search-meta'] || {}
  const coords = searchMeta.location?.['wgs84-point'] || [24.9384, 60.1699]
  const reservationLink =
    data['reservations-link'] ||
    data['reservation-link'] ||
    data['booking-url'] ||
    properties['reservations-link'] ||
    null
  const isFree = properties['free-use?'] === true

  const propMap = (category?.props || []).reduce(
    (acc: any, prop: any) => {
      acc[prop.key] = {
        label: prop.name?.en || prop.name?.fi || prop.key,
        description: prop.description?.en || '',
        dataType: prop['data-type'],
      }
      return acc
    },
    {} as Record<string, { label: string; description: string; dataType: string }>
  )

  return (
    <div className="w-full space-y-6">
      <BackButton />

      {/* Header + Map Section */}
      <Card className="shadow-md border border-border/50 overflow-hidden py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Info */}
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            {/* Header */}
            <div className="pb-2 border-b border-border/40 mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{data.name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {searchMeta.type?.name?.en || category?.name?.en || '—'} •{' '}
                {location.city?.neighborhood}, {location['postal-office']}
              </p>
            </div>
            {data.comment && (
              <blockquote className="relative overflow-hidden tracking-tight lg:py-6 lg:pl-6 pr-12 p-4 border border-border/50 rounded-md">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-7xl absolute -top-7 -right-5 -rotate-12 text-muted-foreground"
                  aria-hidden="true"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
                </svg>
                <p className="text-sm md:text-base">{data.comment}</p>
              </blockquote>
            )}

            <Address
              address={data.location?.address || ''}
              postalCode={data.location?.['postal-code']}
              postalOffice={data.location?.['postal-office']}
            />

            {/* 🎉 Free to Use */}
            {isFree && (
              <Badge className="mb-4 bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1 shadow-sm animate-pulse w-fit">
                🎉 Free to Use
              </Badge>
            )}

            {/* Basic Info */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p>Built: {data['construction-year'] || 'N/A'}</p>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                {data['phone-number'] && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Phone className="h-4 w-4" /> {data['phone-number']}
                  </div>
                )}
                {data.email && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-primary hover:underline break-all"
                    >
                      {data.email}
                    </a>
                  </div>
                )}
                {data.www && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Globe className="h-4 w-4" />
                    <a
                      href={data.www}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {data.www}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Reservation Button */}
            {reservationLink && (
              <Link href={reservationLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto flex items-center">
                  <CalendarCheck className="h-5 w-5" />
                  Go to Reservation Page
                </Button>
              </Link>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center justify-center gap-2"
              >
                <a
                  href={`https://www.google.com/maps?q=${coords[1]},${coords[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Car className="h-4 w-4" />
                  Directions
                </a>
              </Button>

              {data['phone-number'] && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center justify-center gap-2"
                >
                  <a href={`tel:${data['phone-number']}`}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
              )}

              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Right: Map */}
          <div className="relative h-[260px] md:h-full">
            <FacilityMap coordinates={coords} />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </Card>
      {/* Dynamic Properties */}
      {Object.keys(properties).length > 0 && (
        <Card className="bg-background border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-space-grotesk">
              About our facility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            {/* Count Visualization */}
            {Object.entries(properties).some(([key]) => key.endsWith('-count')) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(properties)
                  .filter(([key]) => key.endsWith('-count'))
                  .map(([key, value]) => {
                    const meta = propMap[key]
                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-border/50 bg-accent/10 flex flex-col items-center justify-center p-4 text-center shadow-sm"
                      >
                        <div className="text-3xl font-bold text-primary">
                          {typeof value === 'number' ? value : parseInt(String(value)) || 0}
                        </div>
                        <div className="text-xs capitalize text-muted-foreground">
                          {meta?.label || key.replace(/[-_]/g, ' ').replace(' count', '')}
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            <Separator className="my-4" />

            {/* Generic Properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(properties)
                .filter(([key]) => !key.endsWith('-count'))
                .map(([key, value]) => {
                  const meta = propMap[key]
                  const rawLabel =
                    meta?.label ||
                    key
                      .replace(/[-_?]/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())
                      .trim()

                  // 🧩 Normalize label text
                  const label = rawLabel
                    .replace(/^\d+\.\s*/g, '') // remove "1." or "2."
                    .replace(/\bm\b|\bm2\b|\bsq(\.|uare)?\b/gi, '') // remove unit words
                    .replace(/\s+/g, ' ')
                    .trim()

                  // 🧩 Detect the correct unit
                  let unit = ''
                  const unitMatch = rawLabel.match(
                    /\b(m2|m|km|min|h|cm|mm|kg|ha|c|°c|sq|sq\.|square)\b/i
                  )
                  if (unitMatch) {
                    const u = unitMatch[1].toLowerCase()
                    if (u === 'm2' || u.startsWith('sq')) unit = 'm²'
                    else if (u === 'c' || u === '°c') unit = '°C'
                    else unit = u
                  }

                  const isBoolean = typeof value === 'boolean'
                  const displayValue = Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'number'
                      ? value.toString()
                      : String(value)

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between border border-border/50 rounded-md px-3 py-2 text-sm bg-accent/10 shadow-sm"
                    >
                      <span className="font-medium text-muted-foreground">{label}</span>

                      {isBoolean ? (
                        value ? (
                          <Check className="text-green-500 h-4 w-4 shrink-0" />
                        ) : (
                          <X className="text-red-500 h-4 w-4 shrink-0" />
                        )
                      ) : (
                        <span className="flex items-center gap-1 text-foreground/80 text-sm text-right max-w-[70%] justify-end truncate">
                          {displayValue || '—'}
                          {unit && <span className="text-xs leading-none">{unit}</span>}
                        </span>
                      )}
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
