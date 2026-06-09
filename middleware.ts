import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/lib/auth" 



export async function middleware(request: NextRequest) {
    
    const session = await auth.api.getSession({
        headers: request.headers // reading the session from cookies
    }) 

    if(!session){
        return NextResponse.redirect(new URL('/login', request.url))
    }

  return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}