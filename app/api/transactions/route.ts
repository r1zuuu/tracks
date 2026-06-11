import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { wallets } from "@/db/schema"

export async function GET(request: Request){
        const session = await auth.api.getSession({
            headers: request.headers // reading the session from cookies
        })
        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const userTransactions = await db.query.wallets.findMany({
            where: eq(wallets.userId, session.user.id),
            with: {transactions: true}
        })
        return NextResponse.json(userTransactions, {status: 200})
}