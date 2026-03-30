'use client'

import { useState } from 'react'
import { User, Mail, MapPin, Calendar, Settings, LogOut, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Profile {
  name: string
  email: string
  bio: string
  country: string
  joinDate: string
  avatar: string
}

export function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Adventure seeker, photography enthusiast, and travel blogger',
    country: 'United States',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1535713566543-0c63b249b90b?w=150&h=150&fit=crop',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profile)

  const handleSaveProfile = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  const handleChange = (field: keyof Profile, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const stats = [
    { label: 'Total Trips', value: '12' },
    { label: 'Countries Visited', value: '8' },
    { label: 'Memories', value: '247' },
    { label: 'Friends', value: '34' },
  ]

  return (
    <div className="pb-24 px-4 pt-4">
      {/* Profile Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">Profile</h1>
            <p className="text-muted-foreground">Your travel profile</p>
          </div>
          <Button
            variant={isEditing ? 'outline' : 'default'}
            size="sm"
            onClick={() => {
              if (isEditing) {
                handleSaveProfile()
              } else {
                setIsEditing(true)
              }
            }}
          >
            {isEditing ? 'Save' : (
              <>
                <Edit2 size={16} className="mr-1" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={editData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setEditData(profile)
                }}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin size={14} />
                    {profile.country}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-foreground italic">{profile.bio}</p>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Mail size={16} />
                  {profile.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  Joined {new Date(profile.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Travel Statistics</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(stat => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Settings & Actions</h2>
        <Button variant="outline" className="w-full justify-start">
          <Settings size={20} className="mr-3" />
          App Settings
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <User size={20} className="mr-3" />
          Privacy & Security
        </Button>
        <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut size={20} className="mr-3" />
          Logout
        </Button>
      </div>

      {/* About */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">About Smart Travel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Smart Travel Companion helps you organize, track, and enjoy your trips with intelligent planning tools.
          </p>
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 • © 2024 Smart Travel
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
