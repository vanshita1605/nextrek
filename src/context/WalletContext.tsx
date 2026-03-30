"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { TripWallet, Settlement, Expense, AddFundsPayload, AddExpensePayload } from "../types/Wallet";
import * as walletService from "../services/walletService";

/**
 * Wallet context interface
 */
interface WalletContextType {
  wallet: TripWallet | null;
  settlements: Settlement[];
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchWallet: (tripId: string) => Promise<void>;
  addFunds: (tripId: string, data: AddFundsPayload) => Promise<void>;
  addExpense: (tripId: string, data: AddExpensePayload) => Promise<void>;
  splitExpense: (tripId: string, data: any) => Promise<void>;
  settleDebt: (tripId: string, data: any) => Promise<void>;
  deleteExpense: (tripId: string, expenseId: string) => Promise<void>;
  fetchSettlements: (tripId: string) => Promise<void>;
  fetchExpenses: (tripId: string) => Promise<void>;
  getBudgetSummary: (tripId: string) => Promise<any>;
  clearWallet: () => void;
  clearError: () => void;
}

/**
 * Create wallet context
 */
const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Wallet context provider component
 */
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<TripWallet | null>(null);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch wallet details
   */
  const fetchWallet = useCallback(async (tripId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await walletService.getTripWallet(tripId);
      setWallet(data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch wallet";
      setError(message);
      console.error("Fetch wallet error:", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Add funds to wallet
   */
  const addFundsToWallet = useCallback(
    async (tripId: string, data: AddFundsPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await walletService.addFunds(tripId, data);
        setWallet(updated);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to add funds";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Add expense to wallet
   */
  const addExpenseToWallet = useCallback(
    async (tripId: string, data: AddExpensePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await walletService.addExpense(tripId, data);
        setWallet(updated);
        setExpenses(updated.expenses || []);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to add expense";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Split expense among participants
   */
  const splitExpenseAmount = useCallback(
    async (tripId: string, data: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await walletService.splitExpense(tripId, data);
        setWallet(updated);
        setExpenses(updated.expenses || []);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to split expense";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Settle debt between users
   */
  const settleDebtBetweenUsers = useCallback(
    async (tripId: string, data: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const settlement = await walletService.settleDebt(tripId, data);
        
        // Update wallet
        if (wallet) {
          setWallet({
            ...wallet,
            settlements: [...wallet.settlements, settlement],
          });
        }

        setSettlements((prev) => [...prev, settlement]);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to settle debt";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [wallet]
  );

  /**
   * Delete expense
   */
  const deleteExpenseItem = useCallback(
    async (tripId: string, expenseId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const updated = await walletService.deleteExpense(tripId, expenseId);
        setWallet(updated);
        setExpenses(updated.expenses || []);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to delete expense";
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Fetch all settlements
   */
  const fetchSettlements = useCallback(async (tripId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await walletService.getTripSettlements(tripId);
      setSettlements(data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch settlements";
      setError(message);
      console.error("Fetch settlements error:", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch all expenses
   */
  const fetchExpenses = useCallback(async (tripId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await walletService.getTripExpenses(tripId);
      setExpenses(data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch expenses";
      setError(message);
      console.error("Fetch expenses error:", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get budget summary
   */
  const getBudgetSummary = useCallback(async (tripId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const summary = await walletService.getBudgetSummary(tripId);
      return summary;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to get budget summary";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear wallet data
   */
  const clearWallet = useCallback(() => {
    setWallet(null);
    setSettlements([]);
    setExpenses([]);
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: WalletContextType = {
    wallet,
    settlements,
    expenses,
    isLoading,
    error,
    fetchWallet,
    addFunds: addFundsToWallet,
    addExpense: addExpenseToWallet,
    splitExpense: splitExpenseAmount,
    settleDebt: settleDebtBetweenUsers,
    deleteExpense: deleteExpenseItem,
    fetchSettlements,
    fetchExpenses,
    getBudgetSummary,
    clearWallet,
    clearError,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

/**
 * Custom hook to use wallet context
 * @throws Error if used outside WalletProvider
 * @returns Wallet context
 */
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};

export default WalletContext;
