import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { and, eq } from "drizzle-orm"
import { transactions, wallets } from "@/db/schema"
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const userWallets = await db.query.wallets.findMany({
        where: eq(wallets.userId, session.user.id)
    })
    const transaction = await db.query.transactions.findFirst({
        where: eq(transactions.id, id)
    })
    if (!transaction) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const isOwner = userWallets.some(wallet => wallet.id === transaction.walletId)

    if (!isOwner) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const deleteTransaction = await db.delete(transactions).where(eq(transactions.id, id)).returning()

    return NextResponse.json(deleteTransaction, { status: 200 })
}