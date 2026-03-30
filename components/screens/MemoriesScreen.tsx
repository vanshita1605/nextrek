'use client'

import { useState } from 'react'
import { Plus, Trash2, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Memory {
  id: string
  title: string
  description: string
  location: string
  date: string
  imageUrl: string
  trip?: string
}

export function MemoriesScreen() {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Eiffel Tower Sunset',
      description: 'Beautiful golden hour at the iconic landmark',
      location: 'Paris, France',
      date: '2024-06-05',
      imageUrl: 'https://images.unsplash.com/photo-1512453329089-430a63602996?w=300&h=300&fit=crop',
      trip: 'European Summer',
    },
    {
      id: '2',
      title: 'Local Market',
      description: 'Exploring the vibrant street markets',
      location: 'Paris, France',
      date: '2024-06-06',
      imageUrl: 'https://images.unsplash.com/photo-1474880905113-39cada8fc8fa?w=300&h=300&fit=crop',
      trip: 'European Summer',
    },
    {
      id: '3',
      title: 'Beach Day',
      description: 'First day at the beach in Bali',
      location: 'Bali, Indonesia',
      date: '2024-07-10',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop',
      trip: 'Beach Getaway',
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    trip: '',
  })

  const handleAddMemory = () => {
    if (formData.title && formData.location) {
      const newMemory: Memory = {
        id: Date.now().toString(),
        ...formData,
      }
      setMemories([...memories, newMemory])
      setFormData({
        title: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        imageUrl: '',
        trip: '',
      })
      setShowForm(false)
    }
  }

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id))
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="pb-24 px-4 pt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Travel Memories</h1>
          <p className="text-muted-foreground">Capture your moments</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="icon"
          className="rounded-full"
        >
          <Plus size={24} />
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Eiffel Tower Sunset"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="What happened here?"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Paris, France"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMemory} className="flex-1">Add Memory</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Memory Gallery */}
      <div className="grid grid-cols-2 gap-4">
        {memories.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No memories yet. Start capturing your adventures!</p>
            </CardContent>
          </Card>
        ) : (
          memories.map(memory => (
            <div key={memory.id} className="group relative overflow-hidden rounded-lg">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <button
                  onClick={() => handleDeleteMemory(memory.id)}
                  className="self-end text-destructive hover:text-destructive/80"
                >
                  <Trash2 size={20} />
                </button>
                <div>
                  <h3 className="font-semibold text-white text-sm text-balance">{memory.title}</h3>
                  <div className="flex items-center gap-1 text-white text-xs mt-1">
                    <MapPin size={12} />
                    {memory.location}
                  </div>
                  <div className="flex items-center gap-1 text-white text-xs mt-0.5">
                    <Calendar size={12} />
                    {new Date(memory.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-card border-b border-border">
                <h3 className="font-semibold text-sm truncate">{memory.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{memory.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
