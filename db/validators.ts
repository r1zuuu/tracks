import { z } from "zod"

export const WalletSchema = z.object({
  name: z.string().trim().min(1).max(100),
  currency: z.string().trim().length(3).default("PLN"),
})

export const TransactionSchema = z.object({
  amount: z.coerce.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().trim().min(1).max(50),
  description: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().max(500).optional(),
  ),
  date: z.coerce.date().optional(),
  walletId: z.string().trim().min(1),
})

export const WalletIdSchema = z.string().trim().min(1)
export const TransactionIdSchema = z.string().trim().min(1)