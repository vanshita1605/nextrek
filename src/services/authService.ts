import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import {
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
  RefreshTokenResponse,
  UpdateProfilePayload,
} from "../types/User";

/**
 * Register a new user account
 * @param data - Registration details
 * @returns AuthResponse with user and token
 */
export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  const res = await apiClient.post(API_ROUTES.AUTH.REGISTER, data);
  const authData = res.data as AuthResponse;

  // Store token in localStorage
  if (authData.token) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  }

  return authData;
};

/**
 * Login user with email and password
 * @param data - Login credentials
 * @returns AuthResponse with user and token
 */
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await apiClient.post(API_ROUTES.AUTH.LOGIN, data);
  const authData = res.data as AuthResponse;

  // Store token and user in localStorage
  if (authData.token) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  }

  return authData;
};

/**
 * Logout user and clear stored credentials
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT, {});
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear stored credentials regardless of API call success
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

/**
 * Get current authenticated user
 * @returns Current user information
 */
export const getCurrentUser = async (): Promise<User> => {
  const res = await apiClient.get(API_ROUTES.AUTH.GET_CURRENT_USER);
  return res.data as User;
};

/**
 * Change user password
 * @param data - Current and new password
 */
export const changePassword = async (data: ChangePasswordPayload): Promise<void> => {
  await apiClient.post(API_ROUTES.AUTH.CHANGE_PASSWORD, data);
};

/**
 * Refresh authentication token
 * @returns New token
 */
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, {});
  const refreshData = res.data as RefreshTokenResponse;

  // Update stored token
  if (refreshData.token) {
    localStorage.setItem("token", refreshData.token);
  }

  return refreshData;
};

/**
 * Update user profile information
 * @param data - Profile fields to update
 * @returns Updated user
 */
export const updateProfile = async (data: UpdateProfilePayload): Promise<User> => {
  const res = await apiClient.put(API_ROUTES.AUTH.GET_CURRENT_USER, data);
  const updatedUser = res.data as User;

  // Update stored user
  localStorage.setItem("user", JSON.stringify(updatedUser));

  return updatedUser;
};

/**
 * Get stored user from localStorage without API call
 * @returns Stored user or null
 */
export const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
};

/**
 * Get stored token from localStorage
 * @returns Stored token or null
 */
export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing token:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns true if token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};