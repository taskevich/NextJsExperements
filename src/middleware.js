"use server"

import { NextResponse } from 'next/server'

export const config = {
    matcher: ["/protected/:path*", "/auth/:path*"],
}

export async function middleware(request) {
    const token = request.cookies.get("token") !== undefined ? true : false

    if (request.nextUrl.pathname.startsWith("/auth")) {
        if (token)
            return NextResponse.redirect("http://localhost:3000/protected", { status: 301 })
    }

    if (request.nextUrl.pathname.startsWith("/protected")) {
        if (!token)
            return NextResponse.redirect("http://localhost:3000/auth", { status: 301 })
    }
    
    const response = NextResponse.next()
    return response
}
