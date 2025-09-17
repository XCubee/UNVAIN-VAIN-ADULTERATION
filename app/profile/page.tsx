"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BackHeader } from "@/components/BackHeader"
import { useTranslation } from "@/lib/utils/translate"

export default function ProfilePage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BackHeader title="profile.title" />
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.title')}</CardTitle>
            <CardDescription>{t('profile.edit_profile')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-sm font-medium">
                  {t('profile.name')}
                </Label>
                <Input id="name" placeholder="John Doe" />
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('profile.email')}
                </Label>
                <Input id="email" placeholder="john.doe@example.com" />
              </div>
              <Separator />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input id="phone" placeholder="+1234567890" />
                <Label htmlFor="birthday" className="text-sm font-medium">
                  Birthday
                </Label>
                <Input id="birthday" placeholder="YYYY-MM-DD" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="••••••••" />
                <Label htmlFor="2fa" className="text-sm font-medium">
                  2FA
                </Label>
                <Badge variant="outline">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>View your achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="achievements" className="text-sm font-medium">
                  Achievements
                </Label>
                <Badge variant="outline">Level 1</Badge>
                <Badge variant="outline">Level 2</Badge>
                <Badge variant="outline">Level 3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
