import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

/**
 * Interface for recommendation request payload
 */
interface RecommendationPayload {
  destination: string;
  budget?: number;
  duration?: number;
  interests?: string[];
  travelStyle?: string;
  language?: string;
}

/**
 * Interface for budget advice request payload
 */
interface BudgetAdvicePayload {
  totalBudget: number;
  duration: number;
  numberOfPeople: number;
  destination: string;
  travelStyle?: string;
  currency?: string;
}

/**
 * Interface for packing suggestions request payload
 */
interface PackingSuggestionsPayload {
  destination: string;
  month?: number;
  year?: number;
  duration: number;
  climate?: string;
  activities?: string[];
}

/**
 * Interface for itinerary suggestions request payload
 */
interface ItinerarySuggestionsPayload {
  destination: string;
  duration: number;
  interests?: string[];
  budget?: number;
  pace?: "relaxed" | "moderate" | "fast";
  language?: string;
}

/**
 * Get AI recommendations for destinations and activities
 * @param data - Recommendation parameters
 * @returns AI generated recommendations
 */
export const getRecommendations = async (data: RecommendationPayload): Promise<any> => {
  const res = await apiClient.post(API_ROUTES.AI.RECOMMENDATIONS, data);
  return res.data;
};

/**
 * Get AI-powered budget advice and breakdown
 * @param data - Budget parameters
 * @returns Budget advice and suggestions
 */
export const getBudgetAdvice = async (data: BudgetAdvicePayload): Promise<any> => {
  const res = await apiClient.post(API_ROUTES.AI.BUDGET_ADVICE, data);
  return res.data;
};

/**
 * Get AI packing suggestions based on destination and dates
 * @param data - Packing parameters
 * @returns Packing suggestions and checklist
 */
export const getPackingSuggestions = async (
  data: PackingSuggestionsPayload
): Promise<any> => {
  const res = await apiClient.post(API_ROUTES.AI.PACKING_SUGGESTIONS, data);
  return res.data;
};

/**
 * Get AI-generated itinerary suggestions
 * @param data - Itinerary parameters
 * @returns Day-by-day itinerary suggestions
 */
export const getItinerarySuggestions = async (
  data: ItinerarySuggestionsPayload
): Promise<any> => {
  const res = await apiClient.post(API_ROUTES.AI.ITINERARY_SUGGESTIONS, data);
  return res.data;
};

/**
 * Get comprehensive travel plan including recommendations, budget, and itinerary
 * @param destination - Travel destination
 * @param duration - Trip duration in days
 * @param budget - Total budget
 * @param interests - User interests
 * @returns Comprehensive travel plan
 */
export const getCompleteTravelPlan = async (
  destination: string,
  duration: number,
  budget: number,
  interests?: string[]
): Promise<any> => {
  const [recommendations, budgetAdvice, itinerary] = await Promise.all([
    getRecommendations({
      destination,
      budget,
      duration,
      interests,
    }),
    getBudgetAdvice({
      totalBudget: budget,
      duration,
      numberOfPeople: 1,
      destination,
    }),
    getItinerarySuggestions({
      destination,
      duration,
      interests,
      budget,
    }),
  ]);

  return {
    recommendations,
    budgetAdvice,
    itinerary,
  };
};