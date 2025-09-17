'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, History, User } from "lucide-react"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useTranslation } from "@/lib/utils/translate"

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
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
            <Link href="/profile">
              <Button variant="ghost" size="icon" aria-label={t('nav.profile')}>
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}