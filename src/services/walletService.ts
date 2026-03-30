import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import {
  TripWallet,
  Settlement,
  Expense,
  AddFundsPayload,
  AddExpensePayload,
  SplitExpensePayload,
  SettleDebtPayload,
} from "../types/Wallet";

/**
 * Get wallet details for a trip
 * @param tripId - Trip ID
 * @returns Wallet information
 */
export const getTripWallet = async (tripId: string): Promise<TripWallet> => {
  const res = await apiClient.get(API_ROUTES.WALLET.GET_TRIP_WALLET(tripId));
  return res.data as TripWallet;
};

/**
 * Add funds to trip wallet
 * @param tripId - Trip ID
 * @param data - Fund details
 * @returns Updated wallet
 */
export const addFunds = async (
  tripId: string,
  data: AddFundsPayload
): Promise<TripWallet> => {
  const res = await apiClient.post(API_ROUTES.WALLET.ADD_FUNDS(tripId), data);
  return res.data as TripWallet;
};

/**
 * Add an expense to trip wallet
 * @param tripId - Trip ID
 * @param data - Expense details
 * @returns Updated wallet
 */
export const addExpense = async (
  tripId: string,
  data: AddExpensePayload
): Promise<TripWallet> => {
  const res = await apiClient.post(API_ROUTES.WALLET.ADD_EXPENSE(tripId), data);
  return res.data as TripWallet;
};

/**
 * Split an expense among participants
 * @param tripId - Trip ID
 * @param data - Expense split details
 * @returns Updated wallet
 */
export const splitExpense = async (
  tripId: string,
  data: SplitExpensePayload
): Promise<TripWallet> => {
  const res = await apiClient.post(API_ROUTES.WALLET.SPLIT_EXPENSE(tripId), data);
  return res.data as TripWallet;
};

/**
 * Settle a debt between two users
 * @param tripId - Trip ID
 * @param data - Settlement details
 * @returns Settlement record
 */
export const settleDebt = async (
  tripId: string,
  data: SettleDebtPayload
): Promise<Settlement> => {
  const res = await apiClient.post(API_ROUTES.WALLET.SETTLE_DEBT(tripId), data);
  return res.data as Settlement;
};

/**
 * Get all settlements for a trip
 * @param tripId - Trip ID
 * @returns Array of settlements
 */
export const getTripSettlements = async (tripId: string): Promise<Settlement[]> => {
  const res = await apiClient.get(`${API_ROUTES.WALLET.GET_TRIP_WALLET(tripId)}/settlements`);
  return res.data as Settlement[];
};

/**
 * Get all expenses for a trip
 * @param tripId - Trip ID
 * @returns Array of expenses
 */
export const getTripExpenses = async (tripId: string): Promise<Expense[]> => {
  const res = await apiClient.get(`${API_ROUTES.WALLET.GET_TRIP_WALLET(tripId)}/expenses`);
  return res.data as Expense[];
};

/**
 * Delete an expense
 * @param tripId - Trip ID
 * @param expenseId - Expense ID
 * @returns Updated wallet
 */
export const deleteExpense = async (tripId: string, expenseId: string): Promise<TripWallet> => {
  const res = await apiClient.delete(
    `${API_ROUTES.WALLET.GET_TRIP_WALLET(tripId)}/expense/${expenseId}`
  );
  return res.data as TripWallet;
};

/**
 * Get budget summary for a trip
 * @param tripId - Trip ID
 * @returns Budget breakdown information
 */
export const getBudgetSummary = async (tripId: string) => {
  const wallet = await getTripWallet(tripId);
  return {
    totalBudget: wallet.totalBudget,
    spent: wallet.spent,
    remaining: wallet.remaining,
    percentageUsed: (wallet.spent / wallet.totalBudget) * 100,
    breakdown: wallet.budgetBreakdown,
  };
};