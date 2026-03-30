/**
 * Place-related TypeScript interfaces for Smart Travel Planning App
 */

/**
 * Rating information for a place
 */
export interface PlaceRating {
  average: number; // 1-5
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

/**
 * Place location details
 */
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

/**
 * Tourist place information
 */
export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  category: string;
  location: Location;
  image: string;
  images?: string[];
  rating: PlaceRating;
  openingHours?: {
    opensAt: string;
    closesAt: string;
    daysOpen: string[];
  };
  visitDuration?: string; // e.g., "2 hours", "half day"
  entryFee?: {
    amount: number;
    currency: string;
    notes?: string;
  };
  bestVisitTime?: string; // e.g., "Morning", "Evening"
  tags?: string[];
  tips?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Hotel accommodation details
 */
export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: PlaceRating;
  location: Location;
  image: string;
  images?: string[];
  amenities: string[];
  roomTypes: {
    type: string;
    price: number;
    currency: string;
    capacity: number;
  }[];
  rating_count?: number;
  phoneNumber?: string;
  website?: string;
  policies?: {
    checkInTime: string;
    checkOutTime: string;
    cancellation: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Food spot/restaurant details
 */
export interface FoodSpot {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: PlaceRating;
  location: Location;
  image: string;
  images?: string[];
  price_level: "$" | "$$" | "$$$" | "$$$$";
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  operatingHours?: {
    opensAt: string;
    closesAt: string;
    daysOpen: string[];
  };
  phoneNumber?: string;
  website?: string;
  specialties?: string[];
  ambiance?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic activity
 */
export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  location: Location;
  image: string;
  images?: string[];
  rating: PlaceRating;
  duration?: string;
  price?: {
    amount: number;
    currency: string;
    perPerson?: boolean;
  };
  bestTime?: string;
  ageRestriction?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Search filters for places
 */
export interface PlaceSearchFilter {
  city: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  sortBy?: "rating" | "price" | "distance" | "popularity";
  limit?: number;
  offset?: number;
}
