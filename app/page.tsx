'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { TripsScreen } from '@/components/screens/TripsScreen'
import { WalletScreen } from '@/components/screens/WalletScreen'
import { ChecklistScreen } from '@/components/screens/ChecklistScreen'
import { ChatScreen } from '@/components/screens/ChatScreen'
import { MemoriesScreen } from '@/components/screens/MemoriesScreen'
import { ProfileScreen } from '@/components/screens/ProfileScreen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/src/context/AuthContext'
import { MapPin, Users, Wallet, CheckSquare, MessageCircle, Camera } from 'lucide-react'

type Screen = 'trips' | 'wallet' | 'checklist' | 'chat' | 'memories' | 'profile'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('trips')
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-1 container mx-auto px-4 py-10">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Plan Your Perfect Trip
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover destinations, manage expenses, create itineraries, and travel with friends seamlessly.
            </p>
          </div>

          {/* Login Card */}
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg border border-border">
              <CardHeader className="text-center">
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Log in to access your trips and wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/login">
                    <Button className="w-full">Go to Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full">Create Account</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-base">Trip Planning</CardTitle>
                <CardDescription>Manage your itinerary with ease</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Wallet className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-base">Expense Tracking</CardTitle>
                <CardDescription>Track and split costs quickly</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-base">Group Travel</CardTitle>
                <CardDescription>Invite friends and coordinate plans</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="border-t border-border">
          <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'trips' && <TripsScreen />}
        {currentScreen === 'wallet' && <WalletScreen />}
        {currentScreen === 'checklist' && <ChecklistScreen />}
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'memories' && <MemoriesScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </div>

      {/* Navigation Footer */}
      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </div>
  )
}
