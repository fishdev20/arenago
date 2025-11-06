export type PasswordValidation = {
  valid: boolean
  errors: string[]
}

export function validatePassword(pw: string): PasswordValidation {
  const errors: string[] = []
  if (pw.length < 8) errors.push('At least 8 characters')
  if (!/[A-Z]/.test(pw)) errors.push('At least one uppercase letter')
  if (!/[a-z]/.test(pw)) errors.push('At least one lowercase letter')
  if (!/[0-9]/.test(pw)) errors.push('At least one number')
  if (!/[!@#$%^&*()[\]{};:,.<>/?\\|_\-+=]/.test(pw)) errors.push('At least one symbol')

  return { valid: errors.length === 0, errors }
}
