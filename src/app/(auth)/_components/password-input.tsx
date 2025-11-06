'use client'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@radix-ui/react-label'
import { Eye, EyeClosed, KeyRound } from 'lucide-react'
import { useState } from 'react'

interface PasswordInputProps extends React.ComponentProps<'input'> {
  label?: string
}
export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="password">{props.label ?? 'Password'}:</Label>
      <InputGroup>
        <InputGroupInput
          type={showPassword ? 'text' : 'password'}
          {...props}
          id="password"
          name={props.name ?? 'password'}
          required
        />
        <InputGroupAddon align="inline-end">
          <Button
            size={'icon'}
            variant={'ghost'}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="hover:bg-transparent"
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </InputGroupAddon>
        <InputGroupAddon align="inline-start">
          <KeyRound />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
