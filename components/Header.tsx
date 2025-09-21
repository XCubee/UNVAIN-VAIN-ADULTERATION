'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, History, User, LogOut } from "lucide-react"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useTranslation } from "@/lib/utils/translate"
import { useAuth } from "@/lib/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/home">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('app.name')}</h1>
              <p className="text-sm text-muted-foreground">{t('app.welcome')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/history">
              <Button variant="ghost" size="icon" aria-label={t('nav.history')}>
                <History className="w-5 h-5" />
              </Button>
            </Link>
            <LanguageSelector />
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User menu">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.user_metadata?.full_name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      {t('nav.profile', 'Profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('auth.sign_out', 'Sign Out')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}