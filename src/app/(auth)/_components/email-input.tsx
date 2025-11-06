import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@radix-ui/react-label'
import { MailIcon } from 'lucide-react'

export default function EmailInput(props: React.ComponentProps<'input'>) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">Email:</Label>
      <InputGroup>
        <InputGroupInput placeholder="arenago@gmail.com" id="email" name="email" {...props} />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
