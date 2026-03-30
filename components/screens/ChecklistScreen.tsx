'use client'

import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface ChecklistItem {
  id: string
  title: string
  completed: boolean
  category: string
}

export function ChecklistScreen() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', title: 'Pack passport and IDs', completed: true, category: 'Documents' },
    { id: '2', title: 'Book accommodation', completed: true, category: 'Booking' },
    { id: '3', title: 'Pack toiletries', completed: false, category: 'Essentials' },
    { id: '4', title: 'Check flight details', completed: false, category: 'Travel' },
    { id: '5', title: 'Buy travel insurance', completed: false, category: 'Admin' },
    { id: '6', title: 'Pack cameras', completed: false, category: 'Essentials' },
  ])
  const [newItem, setNewItem] = useState('')
  const [category, setCategory] = useState('Essentials')

  const categories = ['Documents', 'Booking', 'Essentials', 'Travel', 'Admin', 'Activities']

  const handleAddItem = () => {
    if (newItem.trim()) {
      const item: ChecklistItem = {
        id: Date.now().toString(),
        title: newItem,
        completed: false,
        category,
      }
      setItems([...items, item])
      setNewItem('')
    }
  }

  const handleToggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat] = items.filter(item => item.category === cat)
    return acc
  }, {} as Record<string, ChecklistItem[]>)

  const totalItems = items.length
  const completedItems = items.filter(item => item.completed).length
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <div className="pb-24 px-4 pt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Packing Checklist</h1>
          <p className="text-muted-foreground">Get ready for your trip</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-primary font-semibold">{completedItems}/{totalItems}</span>
          </div>
          <div className="w-full bg-border rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Item Form */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="Add an item..."
              className="flex-1"
            />
            <Button onClick={handleAddItem} size="icon">
              <Plus size={20} />
            </Button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3 w-full px-3 py-2 border border-border rounded-lg text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Grouped Checklist Items */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([cat, catItems]) => (
          catItems.length > 0 && (
            <div key={cat}>
              <h2 className="text-lg font-semibold mb-3 text-primary">{cat}</h2>
              <div className="space-y-2">
                {catItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <button
                      onClick={() => handleToggleItem(item.id)}
                      className="shrink-0 text-primary hover:text-primary/80"
                    >
                      {item.completed ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        item.completed
                          ? 'line-through text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {item.title}
                    </span>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {totalItems === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Create a checklist to prepare for your trip</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
