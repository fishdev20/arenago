// 'use client'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { auth } from '@/lib/firebase'
// import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// export default function ResetPasswordHandler({ oobCode }: { oobCode: string }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [status, setStatus] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     verifyPasswordResetCode(auth, oobCode)
//       .then((email) => setEmail(email))
//       .catch(() => setStatus('Invalid or expired password reset link'))
//   }, [oobCode])

//   const handleReset = async () => {
//     try {
//       await confirmPasswordReset(auth, oobCode, password)
//       setStatus('✅ Password reset successfully!')
//       setTimeout(() => router.replace('/signin'), 2000)
//     } catch {
//       setStatus('❌ Failed to reset password.')
//     }
//   }

//   if (!email) return <p>{status || 'Validating link...'}</p>

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
//       <p>
//         Reset password for <strong>{email}</strong>
//       </p>
//       <Input
//         type="password"
//         placeholder="Enter new password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button onClick={handleReset}>Set New Password</Button>
//       <p>{status}</p>
//     </div>
//   )
// }
