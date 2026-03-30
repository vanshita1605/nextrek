import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import { Trip, CreateTripPayload, UpdateTripPayload } from "../types/Trip";

/**
 * Fetch all trips for the current user
 * @returns Array of trips
 */
export const getTrips = async (): Promise<Trip[]> => {
  const res = await apiClient.get(API_ROUTES.TRIPS.GET_ALL);
  return res.data as Trip[];
};

/**
 * Fetch a single trip by ID
 * @param tripId - Trip ID
 * @returns Trip details
 */
export const getTripById = async (tripId: string): Promise<Trip> => {
  const res = await apiClient.get(API_ROUTES.TRIPS.GET_BY_ID(tripId));
  return res.data as Trip;
};

/**
 * Create a new trip
 * Maps frontend form fields to backend field names:
 * - name → tripName
 * - destination → city
 * - travelers → numberOfPeople
 * - budget → totalBudget
 *
 * @param trip - Trip data
 * @returns Created trip
 */
export const createTrip = async (trip: CreateTripPayload): Promise<Trip> => {
  const payload = {
    tripName: trip.tripName,
    city: trip.city,
    description: trip.description || "",
    startDate: trip.startDate,
    endDate: trip.endDate,
    numberOfPeople: trip.numberOfPeople,
    totalBudget: trip.totalBudget,
    currency: trip.currency || "USD",
    tripType: trip.tripType,
    tags: trip.tags || [],
    image: trip.image,
    visibility: trip.visibility || "private",
  };

  const res = await apiClient.post(API_ROUTES.TRIPS.CREATE, payload);
  return res.data as Trip;
};

/**
 * Update an existing trip
 * @param tripId - Trip ID
 * @param updates - Fields to update
 * @returns Updated trip
 */
export const updateTrip = async (
  tripId: string,
  updates: UpdateTripPayload
): Promise<Trip> => {
  const res = await apiClient.put(API_ROUTES.TRIPS.UPDATE(tripId), updates);
  return res.data as Trip;
};

/**
 * Delete a trip
 * @param tripId - Trip ID
 */
export const deleteTrip = async (tripId: string): Promise<void> => {
  await apiClient.delete(API_ROUTES.TRIPS.DELETE(tripId));
};

/**
 * Add a participant to a trip
 * @param tripId - Trip ID
 * @param userId - User ID to add
 */
export const addParticipant = async (tripId: string, userId: string): Promise<Trip> => {
  const res = await apiClient.post(`${API_ROUTES.TRIPS.GET_BY_ID(tripId)}/participants`, {
    userId,
  });
  return res.data as Trip;
};

/**
 * Remove a participant from a trip
 * @param tripId - Trip ID
 * @param userId - User ID to remove
 */
export const removeParticipant = async (tripId: string, userId: string): Promise<Trip> => {
  const res = await apiClient.delete(
    `${API_ROUTES.TRIPS.GET_BY_ID(tripId)}/participants/${userId}`
  );
  return res.data as Trip;
};

/**
 * Create a trip from form data with field mapping
 * @param formData - Form data with frontend field names
 * @returns Created trip
 */
export const createTripFromForm = async (formData: any): Promise<Trip> => {
  const payload: CreateTripPayload = {
    tripName: formData.name,
    city: formData.destination,
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate,
    numberOfPeople: formData.travelers,
    totalBudget: formData.budget,
    currency: formData.currency || "USD",
    tripType: formData.tripType || "group",
    tags: formData.tags,
    image: formData.image,
    visibility: formData.visibility || "private",
  };

  return createTrip(payload);
};