'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, Split } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpenseForm } from '@/components/forms/ExpenseForm'
import { useToast } from '@/hooks/use-toast'
import { useWallet } from '@/src/context/WalletContext'
import { useTrip } from '@/src/context/TripContext'
import { Expense } from '@/src/types/Wallet'

export function WalletScreen() {
  const [showForm, setShowForm] = useState(false)
  const [expenseFilter, setExpenseFilter] = useState<'All' | 'accommodation' | 'food' | 'transport' | 'activities' | 'shopping' | 'other'>('All')
  const [splitMembers, setSplitMembers] = useState(2)
  const { toast } = useToast()
  const { currentTrip } = useTrip()

  const {
    wallet,
    expenses,
    isLoading,
    error,
    fetchWallet,
    addExpense: addExpenseToWallet,
    deleteExpense: deleteExpenseItem,
    splitExpense: splitExpenseApi,
    fetchExpenses,
  } = useWallet()

  useEffect(() => {
    if (currentTrip?.id) {
      fetchWallet(currentTrip.id)
      fetchExpenses(currentTrip.id)
    }
  }, [currentTrip, fetchWallet, fetchExpenses])

  const filteredExpenses =
    expenseFilter === 'All'
      ? expenses
      : expenses.filter((e) => e.category === expenseFilter)

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const totalIncome = 0 // Assuming no income in expenses for now

  const balance = totalIncome - totalExpenses

  const categories = ['accommodation', 'food', 'transport', 'activities', 'shopping', 'other']

  const categorySpending = categories.map((cat) => ({
    category: cat,
    amount: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }))

  const handleAddExpense = async (expenseData: { title: string; description?: string; amount: number; category: string; date: string }) => {
    if (!currentTrip?.id) {
      toast({ title: 'Error', description: 'Please select a trip first', variant: 'destructive' })
      return
    }

    // Assume equal split among participants
    const participants = currentTrip.participants?.map(p => ({ userId: p.userId })) || []

    const payload = {
      title: expenseData.title,
      description: expenseData.description,
      amount: expenseData.amount,
      category: expenseData.category as any,
      splittingMethod: 'equal' as const,
      participants,
      date: expenseData.date,
    }

    try {
      await addExpenseToWallet(currentTrip.id, payload)
      setShowForm(false)
      toast({ title: 'Added', description: 'Expense added successfully' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Error', description: 'Failed to add expense', variant: 'destructive' })
    }
  }

  const handleDeleteExpense = async (id: string) => {
    if (!currentTrip?.id) return

    try {
      await deleteExpenseItem(currentTrip.id, id)
      toast({ title: 'Deleted', description: 'Expense removed successfully' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Error', description: 'Failed to delete expense', variant: 'destructive' })
    }
  }

  const handleSplitExpense = async (id: string) => {
    if (!currentTrip?.id) {
      toast({ title: 'Error', description: 'Please select a trip first', variant: 'destructive' })
      return
    }

    const expense = expenses.find((e) => e.id === id)
    if (!expense) return

    try {
      await splitExpenseApi(currentTrip.id, {
        expenseId: id,
        memberCount: splitMembers,
      })
      const splitAmount = Number((expense.amount / splitMembers).toFixed(2))
      toast({
        title: 'Split completed',
        description: `${expense.description} split into ${splitMembers} shares of $${splitAmount}`,
      })
    } catch (err) {
      console.error(err)
      toast({ title: 'Error', description: 'Failed to split expense', variant: 'destructive' })
    }
  }

  return (
    <div className="pb-24 px-4 pt-4">
      {error && (
        <div className="mb-4 p-3 bg-destructive/20 text-destructive rounded-lg">{error}</div>
      )}

      {isLoading && (
        <div className="mb-4 p-3 bg-muted rounded-lg text-center">Loading wallet data...</div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Wallet</h1>
          <p className="text-muted-foreground">Track your spending</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="icon" className="rounded-full">
          <Plus size={24} />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={16} className="text-destructive" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
            <p className="text-lg font-bold">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <p className="text-lg font-bold">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-primary">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-primary-foreground">Balance</span>
            </div>
            <p className={`text-lg font-bold ${balance >= 0 ? 'text-primary-foreground' : 'text-destructive'}`}>
              ${balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Spending by Category</h2>
        <div className="space-y-2">
          {categorySpending.map(({ category, amount }) =>
            amount > 0 ? (
              <div key={category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">{category}</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-3 items-center">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-muted-foreground">Category:</label>
          <select
            value={expenseFilter}
            onChange={(e) => setExpenseFilter(e.target.value as any)}
            className="px-3 py-1 border border-border rounded-lg"
          >
            <option value="All">All</option>
            <option value="accommodation">Accommodation</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="activities">Activities</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filteredExpenses.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No transactions yet</p>
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium">{expense.title}</div>
                <div className="text-xs text-muted-foreground">
                  {expense.category} • {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  -${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleSplitExpense(expense.id)}
                  className="text-primary hover:text-primary/80"
                  title="Split expense"
                >
                  <Split size={16} />
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
