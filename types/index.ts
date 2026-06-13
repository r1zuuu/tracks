export type TransactionType = "INCOME" | "EXPENSE"

export interface Wallet {
  id: string
  name: string
  currency: string
  balance: number
  createdAt: string
}

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  category: string
  description?: string
  date: string
  walletId: string
}

export interface BudgetSummary {
  totalIncome: number
  totalExpense: number
  balance: number
  byCategory: Record<string, number>
}

export type ApiResponse<T> =
  | {
      data: T
      error?: never
    }
  | {
      data?: never
      error: string
    }