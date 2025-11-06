'use client'

import { Button } from '@/components/ui/button'
import { Check, Copy, MapPin } from 'lucide-react'
import { useState } from 'react'

interface AddressWithCopyProps {
  address: string
  postalCode?: string
  postalOffice?: string
  className?: string
}

export default function Address({
  address,
  postalCode,
  postalOffice,
  className,
}: AddressWithCopyProps) {
  const [copied, setCopied] = useState(false)

  const fullAddress = `${address}${postalCode ? `, ${postalCode}` : ''}, ${
    postalOffice ? ` ${postalOffice}` : ''
  }`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Failed to copy address')
    }
  }

  return (
    <div
      className={`flex items-center text-sm bg-card/40 gap-1 className="flex md:text-md text-muted-foreground mb-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-muted-foreground truncate">
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <span className="truncate">{fullAddress}</span>
      </div>

      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        aria-label="Copy address"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500 transition-all" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
