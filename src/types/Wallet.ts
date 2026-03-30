/**
 * Wallet and payment-related TypeScript interfaces for Smart Travel Planning App
 */

/**
 * Participant's settlement information
 */
export interface Participant {
  userId: string;
  userName: string;
  email: string;
  amount: number;
  settled: boolean;
}

/**
 * Settlement record for debt resolution
 */
export interface Settlement {
  id: string;
  tripId: string;
  fromUser: string;
  toUser: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "rejected";
  settledAt?: string;
  createdAt: string;
}

/**
 * Fund addition record
 */
export interface Fund {
  id: string;
  tripId: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  description?: string;
  createdAt: string;
}

/**
 * Expense record for transactions
 */
export interface Expense {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  category: "accommodation" | "food" | "transport" | "activities" | "shopping" | "other";
  paidBy: string;
  paidByName: string;
  splittingMethod: "equal" | "itemwise" | "percentage";
  participants: Participant[];
  date: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Budget tracking for trip wallet
 */
export interface TripWallet {
  id: string;
  tripId: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  currency: string;
  funds: Fund[];
  expenses: Expense[];
  settlements: Settlement[];
  budgetBreakdown: {
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
 * Add funds request payload
 */
export interface AddFundsPayload {
  amount: number;
  currency?: string;
  description?: string;
}

/**
 * Add expense request payload
 */
export interface AddExpensePayload {
  title: string;
  description?: string;
  amount: number;
  category: "accommodation" | "food" | "transport" | "activities" | "shopping" | "other";
  splittingMethod: "equal" | "itemwise" | "percentage";
  participants: {
    userId: string;
    amount?: number;
  }[];
  date: string;
  attachments?: string[];
}

/**
 * Split expense request payload
 */
export interface SplitExpensePayload {
  expenseId: string;
  splittingMethod: "equal" | "itemwise" | "percentage";
  participants: {
    userId: string;
    amount?: number;
    percentage?: number;
  }[];
}

/**
 * Settle debt request payload
 */
export interface SettleDebtPayload {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency?: string;
}
