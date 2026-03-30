import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import {
  TouristPlace,
  Hotel,
  FoodSpot,
  Activity,
  PlaceSearchFilter,
} from "../types/Place";

/**
 * Get all tourist places for a destination
 * @param city - City name
 * @param limit - Number of results
 * @param offset - Pagination offset
 * @returns Array of tourist places
 */
export const getTouristPlaces = async (
  city?: string,
  limit?: number,
  offset?: number
): Promise<TouristPlace[]> => {
  const params = new URLSearchParams();

  if (city) params.append("city", city);
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.PLACES.TOURIST_PLACES}?${queryString}`
    : API_ROUTES.PLACES.TOURIST_PLACES;

  const res = await apiClient.get(url);
  return res.data as TouristPlace[];
};

/**
 * Get details of a specific tourist place
 * @param placeId - Place ID
 * @returns Place details
 */
export const getTouristPlaceById = async (placeId: string): Promise<TouristPlace> => {
  const res = await apiClient.get(`${API_ROUTES.PLACES.TOURIST_PLACES}/${placeId}`);
  return res.data as TouristPlace;
};

/**
 * Get all hotels in a destination
 * @param city - City name
 * @param limit - Number of results
 * @param offset - Pagination offset
 * @returns Array of hotels
 */
export const getHotels = async (
  city?: string,
  limit?: number,
  offset?: number
): Promise<Hotel[]> => {
  const params = new URLSearchParams();

  if (city) params.append("city", city);
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.PLACES.HOTELS}?${queryString}`
    : API_ROUTES.PLACES.HOTELS;

  const res = await apiClient.get(url);
  return res.data as Hotel[];
};

/**
 * Get hotel details
 * @param hotelId - Hotel ID
 * @returns Hotel details
 */
export const getHotelById = async (hotelId: string): Promise<Hotel> => {
  const res = await apiClient.get(`${API_ROUTES.PLACES.HOTELS}/${hotelId}`);
  return res.data as Hotel;
};

/**
 * Get all food spots/restaurants in a destination
 * @param city - City name
 * @param cuisine - Cuisine type filter
 * @param limit - Number of results
 * @param offset - Pagination offset
 * @returns Array of food spots
 */
export const getFoodSpots = async (
  city?: string,
  cuisine?: string,
  limit?: number,
  offset?: number
): Promise<FoodSpot[]> => {
  const params = new URLSearchParams();

  if (city) params.append("city", city);
  if (cuisine) params.append("cuisine", cuisine);
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.PLACES.FOOD_SPOTS}?${queryString}`
    : API_ROUTES.PLACES.FOOD_SPOTS;

  const res = await apiClient.get(url);
  return res.data as FoodSpot[];
};

/**
 * Get food spot details
 * @param spotId - Food spot ID
 * @returns Food spot details
 */
export const getFoodSpotById = async (spotId: string): Promise<FoodSpot> => {
  const res = await apiClient.get(`${API_ROUTES.PLACES.FOOD_SPOTS}/${spotId}`);
  return res.data as FoodSpot;
};

/**
 * Search places with advanced filters
 * @param filter - Search filter options
 * @returns Matching places
 */
export const searchPlaces = async (filter: PlaceSearchFilter): Promise<any[]> => {
  const params = new URLSearchParams();

  params.append("city", filter.city);
  if (filter.category) params.append("category", filter.category);
  if (filter.minRating) params.append("minRating", filter.minRating.toString());
  if (filter.maxPrice) params.append("maxPrice", filter.maxPrice.toString());
  if (filter.sortBy) params.append("sortBy", filter.sortBy);
  if (filter.limit) params.append("limit", filter.limit.toString());
  if (filter.offset) params.append("offset", filter.offset.toString());

  const queryString = params.toString();
  const url = `/places/search?${queryString}`;

  const res = await apiClient.get(url);
  return res.data;
};

/**
 * Get recommended places for a trip
 * @param destination - Trip destination
 * @param interests - User interests
 * @param budget - User budget
 * @returns Recommended places
 */
export const getRecommendedPlaces = async (
  destination: string,
  interests?: string[],
  budget?: number
): Promise<any> => {
  const payload = {
    destination,
    interests,
    budget,
  };

  const res = await apiClient.post("/places/recommendations", payload);
  return res.data;
};

/**
 * Get places by category
 * @param city - City name
 * @param category - Place category
 * @returns Places in category
 */
export const getPlacesByCategory = async (
  city: string,
  category: string
): Promise<any[]> => {
  return searchPlaces({
    city,
    category,
    limit: 50,
  });
};

/**
 * Get budget-friendly places
 * @param city - City name
 * @param maxPrice - Maximum price
 * @returns Budget-friendly places
 */
export const getBudgetFriendlyPlaces = async (
  city: string,
  maxPrice: number
): Promise<any[]> => {
  return searchPlaces({
    city,
    maxPrice,
    sortBy: "price",
    limit: 50,
  });
};