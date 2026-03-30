/**
 * Currency formatting utilities for Smart Travel Planning App
 */

/**
 * Supported currency codes
 */
export const CURRENCY_CODES = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  INR: "INR",
  JPY: "JPY",
  AUD: "AUD",
  CAD: "CAD",
  CHF: "CHF",
  CNY: "CNY",
  SEK: "SEK",
  NZD: "NZD",
  MXN: "MXN",
  SGD: "SGD",
  HKD: "HKD",
  NOK: "NOK",
  KRW: "KRW",
  TRY: "TRY",
  RUB: "RUB",
  BRL: "BRL",
  ZAR: "ZAR",
} as const;

/**
 * Common currency symbols
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  SEK: "kr",
  NZD: "NZ$",
  MXN: "$",
  SGD: "S$",
  HKD: "HK$",
  NOK: "kr",
  KRW: "₩",
  TRY: "₺",
  RUB: "₽",
  BRL: "R$",
  ZAR: "R",
};

/**
 * Decimal places for each currency
 */
export const CURRENCY_DECIMALS: Record<string, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  INR: 2,
  JPY: 0,
  AUD: 2,
  CAD: 2,
  CHF: 2,
  CNY: 2,
  SEK: 2,
  NZD: 2,
  MXN: 2,
  SGD: 2,
  HKD: 2,
  NOK: 2,
  KRW: 0,
  TRY: 2,
  RUB: 2,
  BRL: 2,
  ZAR: 2,
};

/**
 * Format amount as currency string
 * @param amount - Numeric amount
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: CURRENCY_DECIMALS[currency] || 2,
      maximumFractionDigits: CURRENCY_DECIMALS[currency] || 2,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    return `${symbol}${amount.toFixed(CURRENCY_DECIMALS[currency] || 2)}`;
  }
};

/**
 * Format currency with symbol only (e.g., "$100")
 * @param amount - Numeric amount
 * @param currency - Currency code
 * @returns Formatted string with symbol
 */
export const formatCurrencySymbol = (amount: number, currency: string = "USD"): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const decimals = CURRENCY_DECIMALS[currency] || 2;
  return `${symbol}${amount.toFixed(decimals)}`;
};

/**
 * Format currency as compact (e.g., "1.5K", "2.3M")
 * @param amount - Numeric amount
 * @param currency - Currency code
 * @returns Compact formatted string
 */
export const formatCurrencyCompact = (amount: number, currency: string = "USD"): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(1)}K`;
  }

  return formatCurrencySymbol(amount, currency);
};

/**
 * Format percentage value
 * @param percentage - Percentage value (0-100)
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (percentage: number, decimals: number = 2): string => {
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Parse currency string to number
 * @param currencyString - Currency string (e.g., "$100.50")
 * @returns Parsed numeric value
 */
export const parseCurrency = (currencyString: string): number => {
  try {
    // Remove all non-numeric characters except decimal point
    const numericString = currencyString.replace(/[^\d.-]/g, "");
    return parseFloat(numericString) || 0;
  } catch (error) {
    console.error("Currency parsing error:", error);
    return 0;
  }
};

/**
 * Convert between currencies (requires exchange rate)
 * @param amount - Amount to convert
 * @param fromCurrency - Source currency
 * @param toCurrency - Target currency
 * @param exchangeRate - Exchange rate (toCurrency per fromCurrency unit)
 * @returns Converted amount
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number => {
  return amount * exchangeRate;
};

/**
 * Calculate percentage of amount
 * @param amount - Base amount
 * @param percentage - Percentage value
 * @returns Calculated amount
 */
export const calculatePercentage = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100;
};

/**
 * Calculate tip amount
 * @param amount - Bill amount
 * @param tipPercentage - Tip percentage (default: 15)
 * @returns Tip amount
 */
export const calculateTip = (amount: number, tipPercentage: number = 15): number => {
  return calculatePercentage(amount, tipPercentage);
};

/**
 * Calculate total with tip
 * @param amount - Original amount
 * @param tipPercentage - Tip percentage
 * @returns Total with tip
 */
export const calculateTotalWithTip = (amount: number, tipPercentage: number = 15): number => {
  const tip = calculateTip(amount, tipPercentage);
  return amount + tip;
};

/**
 * Split amount equally among people
 * @param amount - Total amount
 * @param people - Number of people
 * @returns Amount per person
 */
export const splitAmount = (amount: number, people: number): number => {
  if (people <= 0) return 0;
  return amount / people;
};

/**
 * Format budget status
 * @param spent - Amount spent
 * @param budget - Total budget
 * @param currency - Currency code
 * @returns Formatted status object
 */
export const getBudgetStatus = (
  spent: number,
  budget: number,
  currency: string = "USD"
) => {
  const remaining = budget - spent;
  const percentageUsed = (spent / budget) * 100;
  const isOverBudget = spent > budget;

  return {
    spent: formatCurrency(spent, currency),
    budget: formatCurrency(budget, currency),
    remaining: formatCurrency(remaining, currency),
    percentageUsed: percentageUsed.toFixed(1),
    isOverBudget,
    status: isOverBudget ? "over-budget" : percentageUsed > 80 ? "warning" : "ok",
  };
};

/**
 * Format money display with truncation for UI
 * @param amount - Numeric amount
 * @param currency - Currency code
 * @param maxLength - Maximum display length
 * @returns Formatted currency string
 */
export const formatMoneyDisplay = (
  amount: number,
  currency: string = "USD",
  maxLength: number = 15
): string => {
  const formatted = formatCurrency(amount, currency);
  return formatted.length > maxLength ? formatCurrencyCompact(amount, currency) : formatted;
};

/**
 * Add currencies (for totaling expenses)
 * @param amounts - Array of amounts
 * @returns Sum of all amounts
 */
export const sumAmounts = (amounts: number[]): number => {
  return amounts.reduce((sum, amount) => sum + amount, 0);
};

/**
 * Calculate average of amounts
 * @param amounts - Array of amounts
 * @returns Average amount
 */
export const averageAmount = (amounts: number[]): number => {
  if (amounts.length === 0) return 0;
  return sumAmounts(amounts) / amounts.length;
};

/**
 * Format currency for display with locale
 * @param amount - Numeric amount
 * @param locale - Locale code
 * @param currency - Currency code
 * @returns Formatted string
 */
export const formatCurrencyByLocale = (
  amount: number,
  locale: string = "en-US",
  currency: string = "USD"
): string => {
  return formatCurrency(amount, currency, locale);
};
