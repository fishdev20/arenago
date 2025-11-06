'use client'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from '@/components/ui/resizable-navbar'
import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/store/user-store'
import { BellRing, CalendarClock, LogOut, Radar, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Spinner } from '../ui/spinner'

export function Nav() {
  const navItems = [
    {
      name: 'Explore',
      link: '/explore',
      icon: <Radar />,
    },
    {
      name: 'Groups',
      link: '/groups',
      icon: <Users />,
    },
    {
      name: 'Event',
      link: '/event',
      icon: <CalendarClock />,
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { user, loading } = useUserStore()
  const { signOut } = useAuth()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (loading) {
    return (
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <Button
              disabled
              variant="outline"
              size={'icon'}
              className="cursor-default rounded-full"
            >
              <Spinner />
            </Button>
          </div>
        </NavBody>
      </Navbar>
    )
  }

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            {user && (
              <div className="relative">
                <Button
                  size={'icon'}
                  variant="outline"
                  className="relative flex items-center rounded-full cursor-pointer text-xl"
                >
                  <BellRing />
                  <span className="absolute -top-1 -right-1 min-w-4 flex items-center justify-center rounded-full text-xs bg-destructive text-white">
                    2
                  </span>
                </Button>
              </div>
            )}
            <AnimatedThemeToggler />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={'icon'}
                    variant={'outline'}
                    className=" rounded-full focus:outline-none"
                  >
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src={user.photoUrl || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>
                        {user.displayName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/settings">
                      <Settings />
                      Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      setShowLogoutDialog(true)
                    }}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant={'default'} className="relative">
                <Link href={'/signin'}>Login</Link>
              </Button>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              {user && (
                <div className="relative">
                  <Button
                    size={'icon'}
                    variant="outline"
                    className="relative flex items-center rounded-full cursor-pointer text-xl"
                  >
                    <BellRing />
                    <span className="absolute -top-1 -right-1 min-w-4 flex items-center justify-center rounded-full text-xs bg-destructive text-white">
                      2
                    </span>
                  </Button>
                </div>
              )}
              <AnimatedThemeToggler />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {user && (
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoUrl || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-md font-medium truncate">{user.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            )}
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative border-b py-2 w-full flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {user && (
              <Link
                href="/settings"
                className="relative border-b py-2 flex items-center gap-2 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings />
                Settings
              </Link>
            )}
            <div className="flex w-full flex-col gap-4">
              {user ? (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setShowLogoutDialog(true)
                  }}
                  className="w-full"
                  variant={'secondary'}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant={'default'}
                  className="relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={'/signin'} className="w-full">
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <AlertDialog open={showLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out from the application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLogoutDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await signOut.mutateAsync()
                  setShowLogoutDialog(false) // only if success
                } catch (error) {
                  console.error('Sign-out failed:', error)
                }
              }}
              disabled={signOut.isPending}
            >
              {signOut.isPending && <Spinner />}Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
