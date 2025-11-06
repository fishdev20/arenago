// 'use client'

// import AlertMessage from '@/components/app/alert/alert-message'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useAuthStore } from '@/store/auth-store'
// import { useState } from 'react'

// export default function ChangePasswordForm() {
//   const { fbUser, loading } = useAuthStore()
//   const [email, setEmail] = useState(fbUser?.email || '')
//   const [message, setMessage] = useState<string | null>(null)

//   // const handleReset = async () => {
//   //   if (!email) return setMessage('Please enter your email')
//   //   const res = await sendPasswordReset(email)
//   //   if (res.success) {
//   //     setMessage('A password reset email has been sent. Please check your inbox.')
//   //   } else {
//   //     setMessage(res.error || 'Failed to send password reset email.')
//   //   }
//   // }

//   return (
//     <div className="flex flex-col gap-3 p-6 border rounded-lg shadow-md max-w-md w-full">
//       <h3 className="text-lg font-semibold">Change Password</h3>
//       <p className="text-sm text-muted-foreground">
//         To change your password, we’ll send a confirmation link to your email address.
//       </p>

//       <Input
//         type="email"
//         value={email}
//         placeholder="Enter your email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="mt-2"
//       />

//       <Button disabled={loading} className="mt-3 self-end">
//         {loading ? 'Sending...' : 'Send Reset Email'}
//       </Button>

//       {message && (
//         <AlertMessage
//           title={res?.success ? 'Email Sent' : 'Error'}
//           message={message}
//           type={res?.success ? 'success' : 'error'}
//         />
//       )}
//     </div>
//   )
// }
