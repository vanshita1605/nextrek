'use client'


import { useState, useEffect } from 'react'
import { Plus, MapPin, Calendar, Users, UserPlus, UserMinus, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TripForm } from '@/components/forms/TripForm'
import { useTrip } from '@/src/context/TripContext'
import { Trip, TripItineraryDay, Participant } from '@/src/types/Trip'

export function TripsScreen() {
  const {
    trips,
    currentTrip,
    isLoading,
    error,
    fetchTrips,
    createTrip,
    deleteTrip,
    setCurrentTrip,
    addParticipant,
    removeParticipant,
  } = useTrip()

  const [showForm, setShowForm] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [participantEmail, setParticipantEmail] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'accommodation' | 'food' | 'transport' | 'activities' | 'shopping' | 'other'>('all')
  const [itineraryDays, setItineraryDays] = useState<TripItineraryDay[]>([])
  const [newItineraryItem, setNewItineraryItem] = useState({ dayNumber: 1, time: '', title: '', location: '' })

  useEffect(() => {
    fetchTrips()
    const ticker = setInterval(fetchTrips, 20000)
    return () => clearInterval(ticker)
  }, [fetchTrips])

  useEffect(() => {
    if (currentTrip) {
      setSelectedTrip(currentTrip)
      setItineraryDays(currentTrip.itinerary?.days || [])
    }
  }, [currentTrip])

  const handleAddTrip = async (tripData:any) => {
    try {
      const payload = {
        tripName: tripData.name,
        city: tripData.destination,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        numberOfPeople: tripData.travelers,
        totalBudget: tripData.budget,
        description: tripData.description || '',
        currency: tripData.currency || 'USD',
        tripType: tripData.tripType || 'group',
        tags: tripData.tags || [],
        image: tripData.image || '',
        visibility: tripData.visibility || 'private',
      }

      const newTrip = await createTrip(payload)
      setSelectedTrip(newTrip)
      setItineraryDays(newTrip.itinerary?.days || [])
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTrip = async (id: string) => {
    try {
      await deleteTrip(id)
      if (selectedTrip?.id === id) {
        setSelectedTrip(null)
        setItineraryDays([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip)
    setItineraryDays(trip.itinerary?.days || [])
  }

  const handleInviteParticipant = async () => {
    if (!participantEmail.trim() || !selectedTrip) return

    try {
      await addParticipant(selectedTrip.id, participantEmail)
      const updatedTrip = trips.find((t) => t.id === selectedTrip.id)
      if (updatedTrip) setSelectedTrip(updatedTrip)
      setParticipantEmail('')
    } catch (error) {
      console.error('Failed to invite participant', error)
    }
  }

  const handleRemoveParticipant = async (participantId: string) => {
    if (!selectedTrip) return

    try {
      await removeParticipant(selectedTrip.id, participantId)
      const updatedTrip = trips.find((t) => t.id === selectedTrip.id)
      if (updatedTrip) setSelectedTrip(updatedTrip)
    } catch (error) {
      console.error('Failed to remove participant', error)
    }
  }

  const handleAddItineraryActivity = () => {
    if (!newItineraryItem.title || !newItineraryItem.time || !newItineraryItem.location) return

    const existingDay = itineraryDays.find((d) => d.dayNumber === Number(newItineraryItem.dayNumber))
    if (existingDay) {
      const updatedDay = {
        ...existingDay,
        activities: [...(existingDay.activities || []), {
          id: Date.now().toString(),
          time: newItineraryItem.time,
          title: newItineraryItem.title,
          location: newItineraryItem.location,
          description: '',
        }],
      }

      const newDays = itineraryDays.map((d) => (d.dayNumber === existingDay.dayNumber ? updatedDay : d))
      setItineraryDays(newDays)
    } else {
      setItineraryDays((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          dayNumber: Number(newItineraryItem.dayNumber),
          date: new Date().toISOString().split('T')[0],
          activities: [{
            id: Date.now().toString() + '-activity',
            time: newItineraryItem.time,
            title: newItineraryItem.title,
            location: newItineraryItem.location,
          }],
        },
      ])
    }

    setNewItineraryItem({ dayNumber: 1, time: '', title: '', location: '' })
  }

  const handleDeleteItineraryActivity = (dayNumber: number, activityId: string) => {
    const day = itineraryDays.find((d) => d.dayNumber === dayNumber)
    if (!day) return

    const updatedDay = {
      ...day,
      activities: (day.activities || []).filter((act) => act.id !== activityId),
    }

    setItineraryDays((prev) => prev.map((d) => (d.dayNumber === dayNumber ? updatedDay : d)))
  }

  return (
    <div className="pb-24 px-4 pt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">My Trips</h1>
          <p className="text-muted-foreground">Organize your adventures</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="icon"
          className="rounded-full"
        >
          <Plus size={24} />
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/20 text-destructive rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mb-4 p-3 bg-muted rounded-lg text-center">
          Loading trips...
        </div>
      )}

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <TripForm
              onSubmit={handleAddTrip}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-muted-foreground">Filter:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="px-3 py-2 border border-border rounded-lg"
        >
          <option value="all">All categories</option>
          <option value="accommodation">Accommodation</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="activities">Activities</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-4">
        {trips.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin size={48} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No trips yet. Create your first adventure!</p>
            </CardContent>
          </Card>
        ) : (
          trips
            .filter((trip) => categoryFilter === 'all' || trip.wallet?.budgetBreakdown?.[categoryFilter] != null || trip.expenses?.some((e) => e.category === categoryFilter))
            .map((trip) => (
              <Card
                key={trip.id}
                onClick={() => handleSelectTrip(trip)}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedTrip?.id === trip.id ? 'border-primary border-2' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{trip.tripName}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin size={16} />
                        {trip.city}
                      </CardDescription>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteTrip(trip.id)
                      }}
                      className="text-destructive hover:text-destructive/80 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-primary" />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-primary" />
                    <span>{trip.numberOfPeople} travelers</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Budget Status
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      ${trip.wallet?.spent || 0} / ${trip.totalBudget}
                    </span>

                    <span className="text-xs text-primary">
                      {Math.round(((trip.wallet?.spent || 0) / trip.totalBudget) * 100)}%
                    </span>
                  </div>

                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(((trip.wallet?.spent || 0) / trip.totalBudget) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {selectedTrip && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedTrip.tripName} Details</CardTitle>
            <CardDescription>{selectedTrip.city} • {selectedTrip.numberOfPeople} travelers</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-xs uppercase text-muted-foreground">Total Budget</p>
                  <p className="text-xl font-bold">${selectedTrip.totalBudget}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-xs uppercase text-muted-foreground">Spent</p>
                  <p className="text-xl font-bold">${selectedTrip.wallet?.spent ?? 0}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Participants</h3>
                <div className="flex gap-2">
                  <input
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    placeholder="Invite by email"
                    className="flex-1 px-3 py-2 border border-border rounded-lg"
                  />
                  <Button onClick={handleInviteParticipant} size="sm">
                    Invite
                  </Button>
                </div>
                {(selectedTrip.participants || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No participants yet.</p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {(selectedTrip.participants || []).map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{p.userName}</p>
                          <p className="text-xs text-muted-foreground">{p.email} · {p.role === 'admin' ? 'Joined' : 'Invited'}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveParticipant(p.id)}
                          className="text-destructive text-xs hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Itinerary Planner</h3>
                <p className="text-sm text-muted-foreground">Add activities for each day.</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="number"
                  min={1}
                  value={newItineraryItem.dayNumber}
                  onChange={(e) => setNewItineraryItem((prev) => ({ ...prev, dayNumber: Number(e.target.value) }))}
                  className="px-3 py-2 border border-border rounded-lg"
                  placeholder="Day"
                />
                <input
                  value={newItineraryItem.time}
                  onChange={(e) => setNewItineraryItem((prev) => ({ ...prev, time: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg"
                  placeholder="Time"
                />
                <input
                  value={newItineraryItem.title}
                  onChange={(e) => setNewItineraryItem((prev) => ({ ...prev, title: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg"
                  placeholder="Activity"
                />
                <input
                  value={newItineraryItem.location}
                  onChange={(e) => setNewItineraryItem((prev) => ({ ...prev, location: e.target.value }))}
                  className="px-3 py-2 border border-border rounded-lg"
                  placeholder="Location"
                />
              </div>
              <Button onClick={handleAddItineraryActivity} size="sm">Add Activity</Button>
              {itineraryDays.length === 0 && <p className="text-sm text-muted-foreground">No itinerary created. Start adding activities.</p>}
              {itineraryDays.map((day) => (
                <div key={day.id} className="bg-muted p-3 rounded-lg">
                  <h4 className="font-semibold">Day {day.dayNumber}</h4>
                  <div className="space-y-2 mt-2">
                    {(day.activities || []).map((act) => (
                      <div key={act.id} className="flex items-center justify-between p-2 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">{act.time} - {act.title}</p>
                          <p className="text-xs text-muted-foreground">{act.location}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteItineraryActivity(day.dayNumber, act.id)}
                          className="text-destructive text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
