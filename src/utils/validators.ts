/**
 * Input validation utilities for Smart Travel Planning App
 */

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Phone number regex (accepts various formats)
 */
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Validate email address
 * @param email - Email to validate
 * @returns true if valid email
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation details
 */
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password should contain at least one special character (!@#$%^&*)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate phone number
 * @param phone - Phone number to validate
 * @returns true if valid phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone.trim());
};

/**
 * Validate URL
 * @param url - URL to validate
 * @returns true if valid URL
 */
export const isValidUrl = (url: string): boolean => {
  return URL_REGEX.test(url.trim());
};

/**
 * Validate name (alphabets and spaces only)
 * @param name - Name to validate
 * @returns true if valid name
 */
export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
};

/**
 * Validate numeric value
 * @param value - Value to check
 * @returns true if numeric
 */
export const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Validate budget amount
 * @param amount - Amount to validate
 * @returns Object with validation
 */
export const isValidBudget = (
  amount: any
): {
  isValid: boolean;
  error?: string;
} => {
  const num = parseFloat(amount);

  if (isNaN(num)) {
    return { isValid: false, error: "Budget must be a number" };
  }

  if (num < 0) {
    return { isValid: false, error: "Budget cannot be negative" };
  }

  if (num === 0) {
    return { isValid: false, error: "Budget must be greater than 0" };
  }

  return { isValid: true };
};

/**
 * Validate trip dates
 * @param startDate - Trip start date
 * @param endDate - Trip end date
 * @returns Object with validation
 */
export const validateTripDates = (
  startDate: string | Date,
  endDate: string | Date
): {
  isValid: boolean;
  error?: string;
} => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(start.getTime())) {
    return { isValid: false, error: "Invalid start date" };
  }

  if (isNaN(end.getTime())) {
    return { isValid: false, error: "Invalid end date" };
  }

  if (start < today) {
    return { isValid: false, error: "Start date cannot be in the past" };
  }

  if (end <= start) {
    return { isValid: false, error: "End date must be after start date" };
  }

  return { isValid: true };
};

/**
 * Validate number of people
 * @param numberOfPeople - Number of people
 * @returns Object with validation
 */
export const isValidNumberOfPeople = (
  numberOfPeople: any
): {
  isValid: boolean;
  error?: string;
} => {
  const num = parseInt(numberOfPeople);

  if (isNaN(num)) {
    return { isValid: false, error: "Number of people must be a number" };
  }

  if (num < 1) {
    return { isValid: false, error: "At least 1 person is required" };
  }

  if (num > 100) {
    return { isValid: false, error: "Maximum 100 people allowed" };
  }

  return { isValid: true };
};

/**
 * Validate trip form data
 * @param formData - Trip form data to validate
 * @returns Object with validation results
 */
export const validateTripForm = (formData: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate trip name
  if (!formData.tripName?.trim()) {
    errors.tripName = "Trip name is required";
  } else if (formData.tripName.length < 3) {
    errors.tripName = "Trip name must be at least 3 characters";
  } else if (formData.tripName.length > 100) {
    errors.tripName = "Trip name must not exceed 100 characters";
  }

  // Validate destination
  if (!formData.city?.trim()) {
    errors.city = "Destination is required";
  } else if (formData.city.length < 2) {
    errors.city = "Destination must be at least 2 characters";
  }

  // Validate dates
  const dateValidation = validateTripDates(formData.startDate, formData.endDate);
  if (!dateValidation.isValid) {
    errors.dates = dateValidation.error || "Invalid dates";
  }

  // Validate budget
  const budgetValidation = isValidBudget(formData.totalBudget);
  if (!budgetValidation.isValid) {
    errors.budget = budgetValidation.error || "Invalid budget";
  }

  // Validate number of people
  const peopleValidation = isValidNumberOfPeople(formData.numberOfPeople);
  if (!peopleValidation.isValid) {
    errors.numberOfPeople = peopleValidation.error || "Invalid number of people";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate expense form data
 * @param formData - Expense form data
 * @returns Object with validation results
 */
export const validateExpenseForm = (formData: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate title
  if (!formData.title?.trim()) {
    errors.title = "Expense title is required";
  } else if (formData.title.length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }

  // Validate amount
  const amountValidation = isValidBudget(formData.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error || "Invalid amount";
  }

  // Validate category
  if (!formData.category) {
    errors.category = "Please select a category";
  }

  // Validate date
  if (!formData.date) {
    errors.date = "Date is required";
  }

  // Validate participants
  if (!formData.participants || formData.participants.length === 0) {
    errors.participants = "At least one participant is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate review form data
 * @param formData - Review form data
 * @returns Object with validation results
 */
export const validateReviewForm = (formData: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate rating
  const rating = parseInt(formData.rating);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    errors.rating = "Rating must be between 1 and 5";
  }

  // Validate title
  if (!formData.title?.trim()) {
    errors.title = "Review title is required";
  } else if (formData.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (formData.title.length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }

  // Validate content
  if (!formData.content?.trim()) {
    errors.content = "Review content is required";
  } else if (formData.content.length < 10) {
    errors.content = "Review must be at least 10 characters";
  } else if (formData.content.length > 1000) {
    errors.content = "Review must not exceed 1000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate user registration form
 * @param formData - Registration form data
 * @returns Object with validation results
 */
export const validateRegistrationForm = (formData: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate first name
  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required";
  } else if (!isValidName(formData.firstName)) {
    errors.firstName = "First name contains invalid characters";
  }

  // Validate last name
  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required";
  } else if (!isValidName(formData.lastName)) {
    errors.lastName = "Last name contains invalid characters";
  }

  // Validate email
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate password
  if (!formData.password) {
    errors.password = "Password is required";
  } else {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }
  }

  // Validate password confirmation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Validate terms
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms and conditions";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Sanitize user input
 * @param input - Input to sanitize
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 500); // Limit length
};

/**
 * Validate and sanitize user input
 * @param input - Input to validate and sanitize
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns Object with validation status and sanitized value
 */
export const validateAndSanitizeInput = (
  input: string,
  minLength: number = 1,
  maxLength: number = 500
): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} => {
  const sanitized = sanitizeInput(input);

  if (sanitized.length < minLength) {
    return {
      isValid: false,
      sanitized,
      error: `Input must be at least ${minLength} characters`,
    };
  }

  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      sanitized: sanitized.slice(0, maxLength),
      error: `Input must not exceed ${maxLength} characters`,
    };
  }

  return { isValid: true, sanitized };
};
