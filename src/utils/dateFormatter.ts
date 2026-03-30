/**
 * Date formatting utilities for Smart Travel Planning App
 */

/**
 * Format date to readable string (e.g., "Jun 5, 2024")
 * @param date - Date object or string
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, locale: string = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  try {
    return dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
};

/**
 * Format date and time (e.g., "Jun 5, 2024, 2:30 PM")
 * @param date - Date object or string
 * @param locale - Locale for formatting
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string, locale: string = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  try {
    return dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Date time formatting error:", error);
    return "Invalid date";
  }
};

/**
 * Format time only (e.g., "2:30 PM")
 * @param date - Date object or string
 * @param locale - Locale for formatting
 * @returns Formatted time string
 */
export const formatTime = (date: Date | string, locale: string = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  try {
    return dateObj.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Time formatting error:", error);
    return "Invalid time";
  }
};

/**
 * Format date to ISO string (for API calls)
 * @param date - Date object or string
 * @returns ISO formatted string
 */
export const formatToISO = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString();
};

/**
 * Calculate days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days
 */
export const getDaysBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Check if date is in the past
 * @param date - Date to check
 * @returns true if date is in the past
 */
export const isPastDate = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj < new Date();
};

/**
 * Check if date is today
 * @param date - Date to check
 * @returns true if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is tomorrow
 * @param date - Date to check
 * @returns true if date is tomorrow
 */
export const isTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Get relative time string (e.g., "2 days ago")
 * @param date - Date to compare
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  return formatDate(dateObj);
};

/**
 * Format date range (e.g., "Jun 5 - 15, 2024")
 * @param startDate - Start date
 * @param endDate - End date
 * @param locale - Locale for formatting
 * @returns Formatted date range
 */
export const formatDateRange = (
  startDate: Date | string,
  endDate: Date | string,
  locale: string = "en-US"
): string => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const startFormatted = start.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });

  const endFormatted = end.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Get month name
 * @param date - Date object
 * @param locale - Locale for formatting
 * @returns Month name
 */
export const getMonthName = (date: Date | string, locale: string = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, { month: "long" });
};

/**
 * Get day name (e.g., "Monday")
 * @param date - Date object
 * @param locale - Locale for formatting
 * @returns Day name
 */
export const getDayName = (date: Date | string, locale: string = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, { weekday: "long" });
};

/**
 * Add days to date
 * @param date - Starting date
 * @param days - Number of days to add
 * @returns New date
 */
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Subtract days from date
 * @param date - Starting date
 * @param days - Number of days to subtract
 * @returns New date
 */
export const subtractDays = (date: Date | string, days: number): Date => {
  return addDays(date, -days);
};
