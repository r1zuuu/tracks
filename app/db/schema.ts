import { pgTable, text, real, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'outcome']);

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique()
})

export const wallets = pgTable("wallets", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  currency: text("currency").default("PLN").notNull(),
  balance: real("balance").default(0).notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  amount: real("amount").notNull(),
  type: transactionTypeEnum("type").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  date: timestamp("date").defaultNow().notNull(),
  walletId: text("wallet_id").notNull().references(() => wallets.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, { fields: [wallets.userId], references: [users.id] }),
  transactions: many(transactions),
}))

export const transactionsRelations = relations(transactions, ({ one }) => ({
  wallet: one(wallets, { fields: [transactions.walletId], references: [wallets.id] }),
}))