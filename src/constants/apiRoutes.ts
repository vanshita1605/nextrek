/**
 * API Routes for Smart Travel Planning App
 * Maps frontend endpoints to backend API endpoints
 */
export const API_ROUTES = {
  // Authentication Routes
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    GET_CURRENT_USER: "/auth/me",
    CHANGE_PASSWORD: "/auth/change-password",
    REFRESH_TOKEN: "/auth/refresh",
  },

  // Trip Routes
  TRIPS: {
    GET_ALL: "/trips",
    GET_BY_ID: (id: string) => `/trips/${id}`,
    CREATE: "/trips",
    UPDATE: (id: string) => `/trips/${id}`,
    DELETE: (id: string) => `/trips/${id}`,
  },

  // Wallet Routes
  WALLET: {
    GET_TRIP_WALLET: (tripId: string) => `/trips/${tripId}/wallet`,
    ADD_FUNDS: (tripId: string) => `/trips/${tripId}/wallet/add-funds`,
    ADD_EXPENSE: (tripId: string) => `/trips/${tripId}/wallet/expense`,
    SPLIT_EXPENSE: (tripId: string) => `/trips/${tripId}/wallet/split`,
    SETTLE_DEBT: (tripId: string) => `/trips/${tripId}/wallet/settle`,
  },

  // Review Routes
  REVIEWS: {
    GET_ALL: "/reviews",
    GET_BY_ID: (id: string) => `/reviews/${id}`,
    CREATE: "/reviews",
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },

  // AI Services Routes
  AI: {
    RECOMMENDATIONS: "/ai/recommendations",
    BUDGET_ADVICE: "/ai/budget-advice",
    PACKING_SUGGESTIONS: "/ai/packing-suggestions",
    ITINERARY_SUGGESTIONS: "/ai/itinerary-suggestions",
  },

  // Quick Commerce Routes
  QUICK_COMMERCE: {
    GET_PRODUCTS: "/quick-commerce/products",
    CREATE_ORDER: "/quick-commerce/orders",
    TRACK_ORDER: (id: string) => `/quick-commerce/orders/${id}`,
    CANCEL_ORDER: (id: string) => `/quick-commerce/orders/${id}`,
  },

  // Place Services Routes
  PLACES: {
    TOURIST_PLACES: "/tourist-places",
    HOTELS: "/hotels",
    FOOD_SPOTS: "/food-spots",
  },
};