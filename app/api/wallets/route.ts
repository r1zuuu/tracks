import { db } from "@/db"
import { auth } from "@/lib/auth"
import { NextResponse } from 'next/server'
import { eq } from "drizzle-orm"
import { wallets } from "@/db/schema"


export async function GET(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const userWallets = await db.query.wallets.findMany({
        where: eq(wallets.userId, session.user.id),
    })
    return NextResponse.json(userWallets, {status: 200})
}

export async function POST( request: Request ){
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    })
    if(!session){
        return NextResponse.json( {error: "Unauthorized"} ,{status: 401})
    }

    const {name, currency} = await request.json()

    if (name.length <= 0){
        return NextResponse.json('Invalid request', {status: 400})
    }

    const wallet = await db.insert(wallets).values({ name, currency, userId: session.user.id }).returning()

    return NextResponse.json(wallet)
}
