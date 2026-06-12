import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq, and } from "drizzle-orm"
import { wallets } from "@/db/schema"
import { success } from "better-auth"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isUserWallet = await db.query.wallets.findFirst({
        where: and(
            eq(wallets.id, id),
            eq(wallets.userId, session.user.id)
        )
    })
    if (!isUserWallet) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const walletToDelete = await db.delete(wallets).where(eq(wallets.id, id))
    return NextResponse.json({success: true}, { status: 200 })
}