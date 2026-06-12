import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq, and } from "drizzle-orm"
import { transactions, wallets } from "@/db/schema"
import { type InferInsertModel } from "drizzle-orm" // drizzle orm provides a type for insert for each table

export async function GET(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const walletId = searchParams.get("walletId")

    if (walletId == null) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }

    const isUserWallet = await db.query.wallets.findFirst({
        where: and(
            eq(wallets.id, walletId),
            eq(wallets.userId, session.user.id)
        )
    })
    if (!isUserWallet) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const userTransactions = await db.query.transactions.findMany({
        where: eq(transactions.walletId, walletId),
    })
    return NextResponse.json(userTransactions, { status: 200 })
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { amount, type, category, description, walletId } = await request.json()

    const isUserWallet = await db.query.wallets.findFirst({
        where: and(
            eq(wallets.id, walletId),
            eq(wallets.userId, session.user.id)
        )
    })
    
    if (!isUserWallet) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    type NewTransaction = InferInsertModel<typeof transactions>


    const newTransaction = await db.insert(transactions).values({ amount, type, category, description, walletId }).returning()

    return NextResponse.json(newTransaction, { status: 200 })



}