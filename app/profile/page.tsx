"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/home">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex-1">
              <CardTitle className="text-2xl">Profile</CardTitle>
            </div>
          </div>
        </div>
      </header>
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input id="name" placeholder="John Doe" />
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
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
