import AuthInit from '@/components/app/auth-init'
import { Footer } from '@/components/app/footer'
import { Nav } from '@/components/app/nav-bar'
import { Toaster } from '@/components/ui/sonner'
import ReactQueryProvider from '@/provider/react-query-provider'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ArenaGo',
  description: 'Find sports centers near you, connect with friends, and schedule your next match',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthInit />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative w-full">
              <Nav />
              {children}
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
