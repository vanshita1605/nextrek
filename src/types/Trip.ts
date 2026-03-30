/**
 * Trip-related TypeScript interfaces for Smart Travel Planning App
 */

/**
 * Participant information for a trip
 */
export interface Participant {
  id: string;
  userId: string;
  userName: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  role: "admin" | "member";
}

/**
 * Trip budget tracking information
 */
export interface TripBudget {
  id: string;
  tripId: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  currency: string;
  budgetBreakdown?: {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    shopping: number;
    other: number;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Trip expense details
 */
export interface TripExpense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  currency: string;
  category: "accommodation" | "food" | "transport" | "activities" | "shopping" | "other";
  paidBy: string;
  paidByName: string;
  splittingMethod?: "equal" | "itemwise" | "percentage";
  participants: {
    userId: string;
    userName: string;
    amount: number;
  }[];
  date: string;
  description?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Trip itinerary day information
 */
export interface TripItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  activities: {
    id: string;
    time: string;
    title: string;
    location: string;
    description?: string;
    cost?: number;
    duration?: string;
  }[];
}

/**
 * Trip itinerary with all days scheduled
 */
export interface TripItinerary {
  id: string;
  tripId: string;
  days: TripItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Main Trip interface
 */
export interface Trip {
  id: string;
  tripName: string;
  city: string;
  description?: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  totalBudget: number;
  currency: string;
  tripType: "solo" | "couples" | "family" | "group" | "business";
  status: "planning" | "ongoing" | "completed" | "cancelled";
  admin: Participant;
  participants: Participant[];
  wallet?: TripBudget;
  expenses?: TripExpense[];
  itinerary?: TripItinerary;
  image?: string;
  tags?: string[];
  visibility: "private" | "public";
  createdAt: string;
  updatedAt: string;
}

/**
 * Trip creation/update request payload
 */
export interface CreateTripPayload {
  tripName: string;
  city: string;
  description?: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  totalBudget: number;
  currency?: string;
  tripType: "solo" | "couples" | "family" | "group" | "business";
  tags?: string[];
  image?: string;
  visibility?: "private" | "public";
}

/**
 * Trip update request payload
 */
export interface UpdateTripPayload {
  tripName?: string;
  city?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  numberOfPeople?: number;
  totalBudget?: number;
  tripType?: "solo" | "couples" | "family" | "group" | "business";
  status?: "planning" | "ongoing" | "completed" | "cancelled";
  tags?: string[];
  image?: string;
  visibility?: "private" | "public";
}
