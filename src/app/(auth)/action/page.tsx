// 'use client'

// import { Spinner } from '@/components/ui/spinner'
// import { useSearchParams } from 'next/navigation'
// import { Suspense } from 'react'
// // import ActionRouter from './action-router'

// export default function FirebaseActionPage() {
//   const searchParams = useSearchParams()
//   const mode = searchParams.get('mode')
//   const oobCode = searchParams.get('oobCode')

//   if (!mode || !oobCode) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-center">
//         <p>Invalid or missing action link.</p>
//       </div>
//     )
//   }

//   return (
//     <Suspense
//       fallback={
//         <div className="flex items-center justify-center min-h-screen">
//           <Spinner /> Processing...
//         </div>
//       }
//     >
//       {/* <ActionRouter mode={mode} oobCode={oobCode} /> */}
//     </Suspense>
//   )
// }

export default function Page() {
  return <>Test</>
}
