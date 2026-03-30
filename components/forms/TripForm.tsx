'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TripData {
  name: string
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
  spent: number
}

interface TripFormProps {
  onSubmit: (data: TripData) => void
  onCancel: () => void
}

export function TripForm({ onSubmit, onCancel }: TripFormProps) {
  const [formData, setFormData] = useState<TripData>({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 0,
    spent: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.destination && formData.startDate && formData.endDate) {
      onSubmit(formData)
      setFormData({
        name: '',
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 1,
        budget: 0,
        spent: 0,
      })
    }
  }

  const handleChange = (field: keyof TripData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Trip Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., European Summer"
          required
        />
      </div>

      <div>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          value={formData.destination}
          onChange={(e) => handleChange('destination', e.target.value)}
          placeholder="e.g., Paris, France"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="travelers">Travelers</Label>
          <Input
            id="travelers"
            type="number"
            min="1"
            value={formData.travelers}
            onChange={(e) => handleChange('travelers', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            min="0"
            value={formData.budget}
            onChange={(e) => handleChange('budget', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">Add Trip</Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}
