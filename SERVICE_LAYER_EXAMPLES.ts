/**
 * Service Layer Usage Examples - Smart Travel Planning App
 * This file demonstrates common patterns and usage of all service layer modules
 */

// Import all service functions
import * as authService from "./src/services/authService";
import * as tripService from "./src/services/tripService";
import * as walletService from "./src/services/walletService";
import * as reviewService from "./src/services/reviewService";
import * as aiService from "./src/services/aiService";
import * as placeService from "./src/services/placeService";
import * as quickCommerceService from "./src/services/quickCommerceService";

// ============================================================
// 1. AUTHENTICATION SERVICE EXAMPLES
// ============================================================

// Register a new user
async function registerNewUser() {
  try {
    const response = await authService.registerUser({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "SecurePass123!",
      confirmPassword: "SecurePass123!",
      phone: "+1234567890",
      country: "USA",
      city: "New York",
      agreeToTerms: true,
    });

    console.log("User registered:", response.user);
    console.log("Token:", response.token);
  } catch (error: any) {
    console.error("Registration failed:", error.message);
  }
}

// Login user
async function userLogin() {
  try {
    const response = await authService.loginUser({
      email: "john@example.com",
      password: "SecurePass123!",
      rememberMe: true,
    });

    console.log("Logged in user:", response.user);
  } catch (error: any) {
    console.error("Login failed:", error.response?.data?.message);
  }
}

// Change password
async function changeUserPassword() {
  try {
    await authService.changePassword({
      currentPassword: "SecurePass123!",
      newPassword: "NewSecurePass456!",
      confirmPassword: "NewSecurePass456!",
    });

    console.log("Password changed successfully");
  } catch (error: any) {
    console.error("Password change failed:", error.message);
  }
}

// ============================================================
// 2. TRIP SERVICE EXAMPLES
// ============================================================

// Create a new trip
async function createNewTrip() {
  try {
    const trip = await tripService.createTrip({
      tripName: "European Summer Adventure",
      city: "Paris",
      description: "Two weeks exploring Europe",
      startDate: "2024-06-01",
      endDate: "2024-06-15",
      numberOfPeople: 4,
      totalBudget: 10000,
      currency: "USD",
      tripType: "group",
      tags: ["europe", "summer", "adventure"],
      visibility: "private",
    });

    console.log("Trip created:", trip.id);
    return trip;
  } catch (error) {
    console.error("Failed to create trip:", error);
  }
}

// Get all trips
async function getUserTrips() {
  try {
    const trips = await tripService.getTrips();
    console.log(`Found ${trips.length} trips`);

    trips.forEach((trip) => {
      console.log(`- ${trip.tripName}: ${trip.city}`);
    });

    return trips;
  } catch (error) {
    console.error("Failed to fetch trips:", error);
  }
}

// Get single trip details
async function getTripDetails(tripId: string) {
  try {
    const trip = await tripService.getTripById(tripId);
    console.log("Trip details:", {
      name: trip.tripName,
      destination: trip.city,
      budget: trip.totalBudget,
      participants: trip.participants.length,
      status: trip.status,
    });

    return trip;
  } catch (error) {
    console.error("Failed to fetch trip:", error);
  }
}

// Update trip
async function updateTripInfo(tripId: string) {
  try {
    const updatedTrip = await tripService.updateTrip(tripId, {
      totalBudget: 12000, // Increased budget
      status: "ongoing",
      description: "Updated description",
    });

    console.log("Trip updated successfully");
    return updatedTrip;
  } catch (error) {
    console.error("Failed to update trip:", error);
  }
}

// Create trip from form (with field mapping)
async function createTripFromForm(formData: any): Promise<any> {
  try {
    const trip = await tripService.createTripFromForm({
      name: formData.tripName, // Maps to tripName
      destination: formData.city, // Maps to city
      travelers: formData.numberOfPeople, // Maps to numberOfPeople
      budget: formData.totalBudget, // Maps to totalBudget
      startDate: formData.startDate,
      endDate: formData.endDate,
      tripType: "group",
    });

    return trip;
  } catch (error) {
    console.error("Failed to create trip from form:", error);
  }
}

// ============================================================
// 3. WALLET SERVICE EXAMPLES
// ============================================================

// Get wallet status
async function checkWalletStatus(tripId: string) {
  try {
    const wallet = await walletService.getTripWallet(tripId);
    console.log("Wallet Status:", {
      totalBudget: wallet.totalBudget,
      spent: wallet.spent,
      remaining: wallet.remaining,
      percentageUsed: (wallet.spent / wallet.totalBudget) * 100,
      breakdown: wallet.budgetBreakdown,
    });

    return wallet;
  } catch (error) {
    console.error("Failed to fetch wallet:", error);
  }
}

// Add funds to trip
async function addTripFunds(tripId: string) {
  try {
    const updatedWallet = await walletService.addFunds(tripId, {
      amount: 500,
      currency: "USD",
      description: "Additional funds from John",
    });

    console.log("Funds added. New total:", updatedWallet.totalBudget);
  } catch (error) {
    console.error("Failed to add funds:", error);
  }
}

// Add and split an expense
async function addSharedExpense(tripId: string, participants: string[]) {
  try {
    const wallet = await walletService.addExpense(tripId, {
      title: "Restaurant Dinner",
      description: "Group dinner at La Fontaine",
      amount: 240,
      category: "food",
      splittingMethod: "equal",
      participants: participants.map((userId) => ({ userId })),
      date: "2024-06-05",
    });

    console.log("Expense added and split equally");
    return wallet;
  } catch (error) {
    console.error("Failed to add expense:", error);
  }
}

// Settle debt
async function settleUserDebt(tripId: string, fromUserId: string, toUserId: string) {
  try {
    const settlement = await walletService.settleDebt(tripId, {
      fromUserId,
      toUserId,
      amount: 120,
      currency: "USD",
    });

    console.log("Debt settled:", settlement.id);
    return settlement;
  } catch (error) {
    console.error("Failed to settle debt:", error);
  }
}

// Get budget summary
async function getBudgetBreakdown(tripId: string) {
  try {
    const summary = await walletService.getBudgetSummary(tripId);
    console.log("Budget Summary:", {
      total: summary.totalBudget,
      spent: summary.spent,
      remaining: summary.remaining,
      percentageUsed: summary.percentageUsed,
      breakdown: summary.breakdown,
    });

    return summary;
  } catch (error) {
    console.error("Failed to get budget summary:", error);
  }
}

// ============================================================
// 4. REVIEW SERVICE EXAMPLES
// ============================================================

// Create a review
async function postPlaceReview() {
  try {
    const review = await reviewService.createReview({
      entityType: "place",
      entityId: "eiffel-tower",
      entityName: "Eiffel Tower",
      location: "Paris, France",
      rating: 5,
      title: "Amazing Experience!",
      content: "Incredible views and well-maintained. Worth every penny!",
      tags: ["historic", "views", "must-visit"],
      media: [
        {
          url: "/images/photo1.jpg",
          type: "image",
          caption: "View from the top",
        },
      ],
    });

    console.log("Review posted:", review.id);
    return review;
  } catch (error) {
    console.error("Failed to post review:", error);
  }
}

// Get reviews for a place
async function getPlaceReviews(placeId: string) {
  try {
    const reviews = await reviewService.getEntityReviews("place", placeId);
    console.log(`Found ${reviews.length} reviews for this place`);

    reviews.forEach((review) => {
      console.log(`- ${review.title} (${review.rating}/5)`);
    });

    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
}

// Get average rating
async function getPlaceRating(placeId: string) {
  try {
    const avgRating = await reviewService.getEntityAverageRating("place", placeId);
    console.log(`Average rating: ${avgRating.toFixed(1)}/5`);
    return avgRating;
  } catch (error) {
    console.error("Failed to get rating:", error);
  }
}

// Update review
async function updatePlaceReview(reviewId: string) {
  try {
    const updated = await reviewService.updateReview(reviewId, {
      rating: 4,
      content: "Updated content - still great!",
      title: "Great Experience!",
    });

    console.log("Review updated");
    return updated;
  } catch (error) {
    console.error("Failed to update review:", error);
  }
}

// ============================================================
// 5. AI SERVICE EXAMPLES
// ============================================================

// Get destination recommendations
async function getDestinationRecommendations() {
  try {
    const recommendations = await aiService.getRecommendations({
      destination: "Tokyo",
      budget: 5000,
      duration: 10,
      interests: ["temples", "cuisine", "modern-tech"],
      travelStyle: "mixed", // balanced
    });

    console.log("Recommendations:", recommendations);
    return recommendations;
  } catch (error) {
    console.error("Failed to get recommendations:", error);
  }
}

// Get budget advice
async function getBudgetPlan() {
  try {
    const advice = await aiService.getBudgetAdvice({
      totalBudget: 8000,
      duration: 14,
      numberOfPeople: 4,
      destination: "Barcelona",
      travelStyle: "moderate",
      currency: "EUR",
    });

    console.log("Budget Breakdown:", advice);
    return advice;
  } catch (error) {
    console.error("Failed to get budget advice:", error);
  }
}

// Get packing suggestions
async function getPackingList() {
  try {
    const suggestions = await aiService.getPackingSuggestions({
      destination: "Paris",
      month: 6,
      year: 2024,
      duration: 7,
      climate: "temperate",
      activities: ["sightseeing", "dining", "museums"],
    });

    console.log("Packing Suggestions:", suggestions);
    return suggestions;
  } catch (error) {
    console.error("Failed to get packing suggestions:", error);
  }
}

// Get itinerary
async function getItinerary() {
  try {
    const itinerary = await aiService.getItinerarySuggestions({
      destination: "Rome",
      duration: 5,
      interests: ["history", "food", "art"],
      budget: 3000,
      pace: "moderate",
    });

    console.log("Itinerary:", itinerary);
    return itinerary;
  } catch (error) {
    console.error("Failed to get itinerary:", error);
  }
}

// Get complete travel plan (all-in-one)
async function getCompletePlan() {
  try {
    const plan = await aiService.getCompleteTravelPlan(
      "Bangkok",
      10,
      4000,
      ["temples", "street-food", "culture"]
    );

    console.log("Complete Travel Plan:", {
      recommendations: plan.recommendations,
      budget: plan.budgetAdvice,
      itinerary: plan.itinerary,
    });

    return plan;
  } catch (error) {
    console.error("Failed to get travel plan:", error);
  }
}

// ============================================================
// 6. PLACES SERVICE EXAMPLES
// ============================================================

// Get tourist places
async function exploreDestination(city: string) {
  try {
    const places = await placeService.getTouristPlaces(city, 20, 0);
    console.log(`Found ${places.length} tourist places in ${city}`);

    places.forEach((place) => {
      console.log(`- ${place.name}: ${place.description}`);
    });

    return places;
  } catch (error) {
    console.error("Failed to fetch tourist places:", error);
  }
}

// Get hotels
async function findHotels(city: string) {
  try {
    const hotels = await placeService.getHotels(city, 10);
    console.log(`Found ${hotels.length} hotels in ${city}`);

    hotels.forEach((hotel) => {
      console.log(`- ${hotel.name}: ${hotel.rating.average}/5`);
    });

    return hotels;
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
  }
}

// Get restaurants
async function findRestaurants(city: string, cuisine?: string) {
  try {
    const restaurants = await placeService.getFoodSpots(city, cuisine);
    console.log(`Found ${restaurants.length} restaurants`);

    restaurants.forEach((spot) => {
      console.log(`- ${spot.name} (${spot.cuisine.join(", ")})`);
    });

    return restaurants;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
  }
}

// Search places with filters
async function searchPlacesAdvanced() {
  try {
    const results = await placeService.searchPlaces({
      city: "Bangkok",
      category: "temples",
      minRating: 4.5,
      sortBy: "rating",
      limit: 20,
    });

    console.log("Search results:", results);
    return results;
  } catch (error) {
    console.error("Failed to search places:", error);
  }
}

// Get budget-friendly options
async function findBudgetPlaces(city: string) {
  try {
    const places = await placeService.getBudgetFriendlyPlaces(city, 50);
    console.log(`Found ${places.length} budget-friendly places`);
    return places;
  } catch (error) {
    console.error("Failed to find budget places:", error);
  }
}

// ============================================================
// 7. QUICK COMMERCE SERVICE EXAMPLES
// ============================================================

// Search products
async function searchItems(query: string) {
  try {
    const products = await quickCommerceService.searchProducts(query, "groceries");
    console.log(`Found ${products.length} products`);

    products.forEach((product) => {
      console.log(`- ${product.name}: ${product.price} ${product.currency}`);
    });

    return products;
  } catch (error) {
    console.error("Failed to search products:", error);
  }
}

// Create order
async function placeOrder(items: any[]) {
  try {
    const order = await quickCommerceService.createOrder(items, {
      street: "123 Main St",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75001",
      country: "France",
    });

    console.log("Order placed:", order.id);
    console.log("Estimated delivery:", order.estimatedDelivery);
    return order;
  } catch (error) {
    console.error("Failed to place order:", error);
  }
}

// Track order
async function trackMyOrder(orderId: string) {
  try {
    const order = await quickCommerceService.trackOrder(orderId);
    console.log("Order Status:", {
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      trackingNumber: order.trackingNumber,
    });

    return order;
  } catch (error) {
    console.error("Failed to track order:", error);
  }
}

// Get order history
async function viewOrderHistory() {
  try {
    const orders = await quickCommerceService.getOrderHistory(10, 0);
    console.log(`You have ${orders.length} orders`);

    orders.forEach((order) => {
      console.log(`- Order ${order.id}: ${order.status}`);
    });

    return orders;
  } catch (error) {
    console.error("Failed to fetch order history:", error);
  }
}

// ============================================================
// 8. REACT COMPONENT EXAMPLE WITH AUTH CONTEXT
// ============================================================
// NOTE: See components/screens/ for actual React component examples
// Example usage with useAuth hook:
/*
"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function TravelPlanner() {
  const { user, isAuthenticated, isLoading, login, logout, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div>
        <input type="email" placeholder="Email" 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => login(email, password)}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
*/

// ============================================================
// 9. ERROR HANDLING PATTERN
// ============================================================

async function robustServiceCall<T>(
  serviceFunction: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const data = await serviceFunction();
    return { success: true, data };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Unknown error";
    console.error("Service error:", message);

    return { success: false, error: message };
  }
}

// Usage
async function exampleUsage() {
  const result = await robustServiceCall(() => tripService.getTrips());

  if (result.success) {
    console.log("Trips:", result.data);
  } else {
    console.error("Error:", result.error);
  }
}

// ============================================================
// 10. BATCH OPERATIONS
// ============================================================

async function fetchCompleteTrip(tripId: string) {
  try {
    // Fetch everything in parallel
    const [trip, wallet, expenses, settlements] = await Promise.all([
      tripService.getTripById(tripId),
      walletService.getTripWallet(tripId),
      walletService.getTripExpenses(tripId),
      walletService.getTripSettlements(tripId),
    ]);

    return {
      trip,
      wallet,
      expenses,
      settlements,
    };
  } catch (error) {
    console.error("Failed to fetch complete trip:", error);
  }
}

export {
  registerNewUser,
  userLogin,
  changeUserPassword,
  createNewTrip,
  getUserTrips,
  getTripDetails,
  updateTripInfo,
  createTripFromForm,
  checkWalletStatus,
  addTripFunds,
  addSharedExpense,
  settleUserDebt,
  getBudgetBreakdown,
  postPlaceReview,
  getPlaceReviews,
  getPlaceRating,
  updatePlaceReview,
  getDestinationRecommendations,
  getBudgetPlan,
  getPackingList,
  getItinerary,
  getCompletePlan,
  exploreDestination,
  findHotels,
  findRestaurants,
  searchPlacesAdvanced,
  findBudgetPlaces,
  searchItems,
  placeOrder,
  trackMyOrder,
  viewOrderHistory,
  fetchCompleteTrip,
};
