'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

type AlertType = 'success' | 'error' | 'info' | 'warning'

interface AlertMessageProps {
  title: string
  message: string
  type?: AlertType
  actionLabel?: string
  onAction?: () => void
  onClose?: () => void
}

const typeConfig: Record<AlertType, { icon: React.ElementType; color: string }> = {
  success: { icon: CheckCircle2, color: 'text-green-500' },
  error: { icon: XCircle, color: 'text-red-500' },
  info: { icon: Info, color: 'text-blue-500' },
  warning: { icon: AlertTriangle, color: 'text-yellow-500' },
}

export default function AlertMessage({
  title,
  message,
  type = 'info',
  actionLabel,
  onAction,
}: AlertMessageProps) {
  const { icon: Icon, color } = typeConfig[type]

  return (
    <Alert
      className={cn(
        'relative flex items-start gap-3 border-l-4 p-2.5 rounded-md mt-4',
        type === 'success' && 'border-green-500 text-green-500',
        type === 'error' && 'border-red-500/80 text-red-500/80',
        type === 'info' && 'border-blue-500/80 text-blue-500/80',
        type === 'warning' && 'border-yellow-500/80 text-yellow-500/80'
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', color)} />

      <div className="flex-1 w-full">
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription className="text-sm text-inherit">{message}</AlertDescription>

        {actionLabel && onAction && (
          <div className="flex w-full justify-end">
            <Button variant="outline" size="sm" className="mt-2 text-sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </Alert>
  )
}
