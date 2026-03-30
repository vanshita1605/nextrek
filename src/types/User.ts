/**
 * User-related TypeScript interfaces for Smart Travel Planning App
 */

/**
 * User preferences and settings
 */
export interface UserPreferences {
  currency: string;
  language: string;
  theme: "light" | "dark" | "auto";
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowMessages: boolean;
  };
}

/**
 * User profile information
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  city?: string;
  joinedAt: string;
  preferences: UserPreferences;
  isVerified: boolean;
  lastLogin?: string;
  updatedAt: string;
}

/**
 * Authentication response containing user and token
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Login request payload
 */
export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register request payload
 */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  country?: string;
  city?: string;
  agreeToTerms: boolean;
}

/**
 * Change password request payload
 */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Update profile request payload
 */
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  city?: string;
  preferences?: Partial<UserPreferences>;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
  token: string;
  expiresIn?: number;
}
