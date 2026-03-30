# Smart Travel Planning App - Frontend Service Layer Documentation

## Overview

This document provides a comprehensive guide to the frontend service layer for the Smart Travel Planning App built with Next.js and TypeScript. The service layer is organized into modular files following best practices for scalability and maintainability.

## Architecture

### Directory Structure

```
src/
├── api/
│   └── apiClient.ts          # Axios instance with interceptors
├── services/
│   ├── authService.ts         # Authentication services
│   ├── tripService.ts         # Trip management services
│   ├── walletService.ts       # Wallet and expense tracking
│   ├── reviewService.ts       # Reviews and ratings
│   ├── aiService.ts           # AI-powered recommendations
│   ├── placeService.ts        # Places, hotels, restaurants
│   └── quickCommerceService.ts # Quick commerce orders
├── types/
│   ├── User.ts                # User interfaces
│   ├── Trip.ts                # Trip interfaces
│   ├── Wallet.ts              # Wallet interfaces
│   ├── Review.ts              # Review interfaces
│   └── Place.ts               # Place interfaces
├── context/
│   └── AuthContext.tsx        # React authentication context
└── constants/
    └── apiRoutes.ts           # API endpoint constants
```

## Core Components

### 1. API Client (`src/api/apiClient.ts`)

**Purpose**: Centralized axios instance for all API communications.

**Features**:
- Automatic JWT token attachment via request interceptor
- Response error handling and 401 redirect
- Configurable base URL via environment variable
- Request timeout configuration (15s default)

**Usage**:
```typescript
import apiClient from "@/api/apiClient";

const response = await apiClient.get("/endpoint");
const data = await apiClient.post("/endpoint", payload);
```

### 2. API Routes (`src/constants/apiRoutes.ts`)

**Purpose**: Centralized constant definitions for all API endpoints.

**Benefits**:
- Single source of truth for all routes
- Easy to refactor routes across the app
- Type-safe endpoint generation

**Usage**:
```typescript
import { API_ROUTES } from "@/constants/apiRoutes";

// Routes are organized by feature
API_ROUTES.AUTH.LOGIN           // "/auth/login"
API_ROUTES.TRIPS.GET_ALL        // "/trips"
API_ROUTES.WALLET.ADD_FUNDS(id) // "/trips/[id]/wallet/add-funds"
```

### 3. Authentication Service (`src/services/authService.ts`)

**Functions**:
- `registerUser()` - Create new account
- `loginUser()` - Authenticate user
- `logoutUser()` - Clear session
- `getCurrentUser()` - Fetch current user
- `changePassword()` - Update password
- `refreshToken()` - Refresh JWT token
- `updateProfile()` - Update user information
- `getStoredUser()` - Get user from localStorage
- `getStoredToken()` - Get token from localStorage
- `isAuthenticated()` - Check auth status

**Token Management**:
- Automatically stored in localStorage after login
- Automatically attached to requests via interceptor
- Automatically cleared on logout or 401 response

### 4. Trip Service (`src/services/tripService.ts`)

**Functions**:
- `getTrips()` - Fetch all user trips
- `getTripById(id)` - Fetch single trip
- `createTrip(data)` - Create new trip
- `updateTrip(id, data)` - Update trip
- `deleteTrip(id)` - Delete trip
- `addParticipant(tripId, userId)` - Add trip member
- `removeParticipant(tripId, userId)` - Remove trip member
- `createTripFromForm(formData)` - Create with form field mapping

**Field Mapping** (frontend → backend):
```
name           → tripName
destination    → city
travelers      → numberOfPeople
budget         → totalBudget
```

**Example**:
```typescript
const trip = await createTrip({
  tripName: "Paris Adventure",
  city: "Paris",
  startDate: "2024-06-01",
  endDate: "2024-06-15",
  numberOfPeople: 4,
  totalBudget: 5000,
  tripType: "group"
});
```

### 5. Wallet Service (`src/services/walletService.ts`)

**Functions**:
- `getTripWallet(tripId)` - Fetch wallet details
- `addFunds(tripId, data)` - Add money to wallet
- `addExpense(tripId, data)` - Record expense
- `splitExpense(tripId, data)` - Split expense among attendees
- `settleDebt(tripId, data)` - Mark debt as settled
- `getTripSettlements(tripId)` - Get all settlements
- `getTripExpenses(tripId)` - Get all expenses
- `deleteExpense(tripId, expenseId)` - Remove expense
- `getBudgetSummary(tripId)` - Get budget stats

**Expense Splitting Methods**:
- `equal` - Split equally among participants
- `itemwise` - Split by items purchased
- `percentage` - Split by percentage amounts

**Example**:
```typescript
const wallet = await addExpense(tripId, {
  title: "Hotel Night",
  amount: 300,
  category: "accommodation",
  splittingMethod: "equal",
  participants: [
    { userId: "user1" },
    { userId: "user2" }
  ],
  date: "2024-06-05"
});
```

### 6. Review Service (`src/services/reviewService.ts`)

**Functions**:
- `getReviews(filter)` - Get reviews with optional filters
- `getReviewById(id)` - Fetch single review
- `createReview(data)` - Create new review
- `updateReview(id, data)` - Update review
- `deleteReview(id)` - Delete review
- `markHelpful(id)` - Mark as helpful
- `markUnhelpful(id)` - Mark as unhelpful
- `replyToReview(reviewId, data)` - Reply to review
- `getEntityReviews(type, id)` - Get reviews for entity
- `getEntityAverageRating(type, id)` - Get average rating

**Supported Entities**:
- `place` - Tourist attractions
- `hotel` - Accommodations
- `restaurant` - Food spots
- `activity` - Activities
- `trip` - User trips

### 7. AI Service (`src/services/aiService.ts`)

**Functions**:
- `getRecommendations(data)` - Destination recommendations
- `getBudgetAdvice(data)` - Budget breakdown suggestions
- `getPackingSuggestions(data)` - Packing checklist
- `getItinerarySuggestions(data)` - Day-by-day itinerary
- `getCompleteTravelPlan()` - Comprehensive plan (combines all)

**Example**:
```typescript
const plan = await getCompleteTravelPlan(
  "Paris",
  7,           // duration days
  3000,        // budget
  ["museums", "food", "history"]
);
// Returns: { recommendations, budgetAdvice, itinerary }
```

### 8. Places Service (`src/services/placeService.ts`)

**Functions**:
- `getTouristPlaces(city)` - Get tourist attractions
- `getTouristPlaceById(id)` - Get place details
- `getHotels(city)` - Get hotels
- `getHotelById(id)` - Get hotel details
- `getFoodSpots(city, cuisine)` - Get restaurants
- `getFoodSpotById(id)` - Get restaurant details
- `searchPlaces(filter)` - Advanced place search
- `getRecommendedPlaces()` - Get AI recommendations
- `getPlacesByCategory()` - Filter by category
- `getBudgetFriendlyPlaces()` - Filter by price

### 9. Quick Commerce Service (`src/services/quickCommerceService.ts`)

**Functions**:
- `getProducts(category, search, limit)` - Get products
- `getProductDetails(id)` - Get product details
- `createOrder(items, address)` - Create new order
- `trackOrder(id)` - Track order status
- `cancelOrder(id)` - Cancel order
- `getOrderHistory(limit)` - Get user orders
- `searchProducts(query, category)` - Search products

## Type Definitions

### User Types (`src/types/User.ts`)
```typescript
- User                    // User profile
- UserPreferences         // Settings and preferences
- AuthResponse           // Login/register response
- LoginPayload           // Login request
- RegisterPayload        // Registration request
- ChangePasswordPayload  // Password change request
- UpdateProfilePayload   // Profile update request
```

### Trip Types (`src/types/Trip.ts`)
```typescript
- Trip                   // Main trip entity
- Participant           // Trip participant
- TripBudget            // Budget information
- TripExpense           // Expense record
- TripItinerary         // Trip schedule
- CreateTripPayload     // Trip creation request
- UpdateTripPayload     // Trip update request
```

### Wallet Types (`src/types/Wallet.ts`)
```typescript
- TripWallet            // Wallet details
- Settlement            // Debt settlement
- Expense               // Expense record
- Fund                  // Fund addition
- AddFundsPayload       // Add funds request
- AddExpensePayload     // Add expense request
- SplitExpensePayload   // Expense split request
- SettleDebtPayload     // Settlement request
```

### Review Types (`src/types/Review.ts`)
```typescript
- Review                // Review entity
- ReviewAuthor          // Author info
- ReviewEntity          // What's being reviewed
- ReviewMedia           // Attachments
- Reply                 // Review reply
- CreateReviewPayload   // Review creation request
- UpdateReviewPayload   // Review update request
- ReviewFilter          // Search filters
```

### Place Types (`src/types/Place.ts`)
```typescript
- TouristPlace          // Tourist attraction
- Hotel                 // Hotel info
- FoodSpot              // Restaurant info
- Activity              // Activity info
- Location              // Coordinates and address
- PlaceRating          // Rating information
- PlaceSearchFilter     // Search options
```

## Authentication Context (`src/context/AuthContext.tsx`)

**Purpose**: React Context for global authentication state management.

**Context Properties**:
- `user` - Current user object (null if not authenticated)
- `token` - JWT token (null if not authenticated)
- `isLoading` - Loading state
- `isAuthenticated` - Boolean flag
- `error` - Error message (null if no error)

**Context Methods**:
- `login(email, password)` - Login user
- `register(data)` - Register new user
- `logout()` - Logout user
- `updateProfile(data)` - Update user profile
- `clearError()` - Clear error state

**Usage in Components**:
```typescript
"use client";

import { useAuth } from "@/context/AuthContext";

export function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <button onClick={() => login(email, password)}>Login</button>;
  }

  return (
    <div>
      Welcome, {user?.firstName}!
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Setup in Layout**:
```typescript
// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

## Error Handling

All services use consistent error handling:

```typescript
try {
  const result = await someService.someFunction();
} catch (error) {
  // error.response.status - HTTP status
  // error.response.data.message - Server error message
  // error.message - Generic error message
}
```

**API Interceptor Handles**:
- 401 Unauthorized → Clears token, redirects to login
- Network errors → Logged to console
- Timeout → 15-second default timeout

## Best Practices

### 1. Type Safety
- Always use TypeScript types from `src/types/`
- Avoid using `any` type
- Use discriminated unions for related types

### 2. Error Handling
- Wrap service calls in try-catch blocks
- Show user-friendly error messages
- Log errors for debugging

### 3. Loading States
- Use `isLoading` from auth context or component state
- Disable form submissions while loading
- Show loading indicators to users

### 4. Token Management
- Never store token in sessionStorage
- Use localStorage for persistence
- Automatically refresh token when expired

### 5. Request Optimization
- Use `getTripById` for single trips (more efficient)
- Batch related requests with Promise.all()
- Use pagination for large result sets

## Environment Variables

Create `.env.local` with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
```

## Testing Examples

### Login Flow
```typescript
const { login } = useAuth();
await login("user@example.com", "password123");
```

### Create Trip
```typescript
const trip = await createTrip({
  tripName: "Summer Vacation",
  city: "Barcelona",
  startDate: "2024-07-01",
  endDate: "2024-07-15",
  numberOfPeople: 4,
  totalBudget: 8000,
  tripType: "group"
});
```

### Add Expense with Split
```typescript
const wallet = await addExpense(tripId, {
  title: "Dinner",
  amount: 120,
  category: "food",
  splittingMethod: "equal",
  participants: [
    { userId: userIds[0] },
    { userId: userIds[1] },
    { userId: userIds[2] }
  ],
  date: "2024-07-05"
});
```

### Get AI Recommendations
```typescript
const recommendations = await getRecommendations({
  destination: "Tokyo",
  budget: 5000,
  duration: 10,
  interests: ["temples", "food", "culture"]
});
```

## Production Deployment

1. **Ensure environment variables are set**
   ```bash
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```

2. **Test end-to-end before deployment**
   - Test authentication flows
   - Test API error handling
   - Test token refresh

3. **Monitor in production**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor API response times
   - Track user authentication issues

4. **Security**
   - Never expose sensitive data in frontend code
   - Use HTTPS only in production
   - Implement CSRF protection
   - Validate all user inputs

## Troubleshooting

### Token not persisting
- Check if localStorage is available
- Verify browser privacy settings
- Check for 401 responses

### API calls timing out
- Verify backend is running
- Check network connectivity
- Increase timeout in apiClient (if needed)

### Authentication context not working
- Ensure AuthProvider wraps entire app
- Check that child components use "use client"
- Verify routes are using useAuth hook

## Future Enhancements

1. **Caching**: Implement request caching with React Query
2. **Pagination**: Add cursor-based pagination for large datasets
3. **Offline Support**: Add offline-first capabilities with localStorage
4. **Real-time**: Implement WebSocket for real-time updates
5. **Analytics**: Track user interactions and API performance

---

**Version**: 1.0.0
**Last Updated**: March 2024
**Framework**: Next.js 14+ (App Router)
**Language**: TypeScript 5+
