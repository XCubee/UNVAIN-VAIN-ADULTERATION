'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "@/lib/utils/translate"

type BackHeaderProps = {
  title: string
  backUrl?: string
}

export function BackHeader({ title, backUrl = "/home" }: BackHeaderProps) {
  const { t } = useTranslation()
  
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <Link href={backUrl}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('nav.back')}
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{t(title)}</h1>
          </div>
        </div>
      </div>
    </header>
  )
}