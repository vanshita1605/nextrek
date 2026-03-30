"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Trip, CreateTripPayload, UpdateTripPayload } from "../types/Trip";
import * as tripService from "../services/tripService";

/**
 * Trip context interface
 */
interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTrips: () => Promise<void>;
  fetchTripById: (tripId: string) => Promise<void>;
  createTrip: (data: CreateTripPayload) => Promise<Trip>;
  updateTrip: (tripId: string, data: UpdateTripPayload) => Promise<Trip>;
  deleteTrip: (tripId: string) => Promise<void>;
  addParticipant: (tripId: string, userId: string) => Promise<void>;
  removeParticipant: (tripId: string, userId: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;
  clearError: () => void;
}

/**
 * Create trip context
 */
const TripContext = createContext<TripContextType | undefined>(undefined);

/**
 * Trip context provider component
 */
export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all trips
   */
  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch trips";
      setError(message);
      console.error("Fetch trips error:", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch trip by ID
   */
  const fetchTripById = useCallback(async (tripId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const trip = await tripService.getTripById(tripId);
      setCurrentTrip(trip);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch trip";
      setError(message);
      console.error("Fetch trip error:", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create new trip
   */
  const createNewTrip = useCallback(async (data: CreateTripPayload): Promise<Trip> => {
    setIsLoading(true);
    setError(null);

    try {
      const newTrip = await tripService.createTrip(data);
      setTrips([...trips, newTrip]);
      setCurrentTrip(newTrip);
      return newTrip;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create trip";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [trips]);

  /**
   * Update trip
   */
  const updateTripData = useCallback(
    async (tripId: string, data: UpdateTripPayload): Promise<Trip> => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await tripService.updateTrip(tripId, data);
        setTrips(trips.map((t) => (t.id === tripId ? updated : t)));

        if (currentTrip?.id === tripId) {
          setCurrentTrip(updated);
        }

        return updated;
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to update trip";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [trips, currentTrip]
  );

  /**
   * Delete trip
   */
  const deleteTrip = useCallback(
    async (tripId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await tripService.deleteTrip(tripId);
        setTrips(trips.filter((t) => t.id !== tripId));

        if (currentTrip?.id === tripId) {
          setCurrentTrip(null);
        }
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to delete trip";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [trips, currentTrip]
  );

  /**
   * Add participant to trip
   */
  const addParticipant = useCallback(
    async (tripId: string, userId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await tripService.addParticipant(tripId, userId);
        setTrips(trips.map((t) => (t.id === tripId ? updated : t)));

        if (currentTrip?.id === tripId) {
          setCurrentTrip(updated);
        }
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to add participant";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [trips, currentTrip]
  );

  /**
   * Remove participant from trip
   */
  const removeParticipant = useCallback(
    async (tripId: string, userId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await tripService.removeParticipant(tripId, userId);
        setTrips(trips.map((t) => (t.id === tripId ? updated : t)));

        if (currentTrip?.id === tripId) {
          setCurrentTrip(updated);
        }
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to remove participant";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [trips, currentTrip]
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: TripContextType = {
    trips,
    currentTrip,
    isLoading,
    error,
    fetchTrips,
    fetchTripById,
    createTrip: createNewTrip,
    updateTrip: updateTripData,
    deleteTrip,
    addParticipant,
    removeParticipant,
    setCurrentTrip,
    clearError,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

/**
 * Custom hook to use trip context
 * @throws Error if used outside TripProvider
 * @returns Trip context
 */
export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);

  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }

  return context;
};

export default TripContext;
