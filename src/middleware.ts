import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
        if (
            request.nextUrl.pathname.startsWith('/auth/') &&
            !request.nextUrl.pathname.endsWith('/email-verification')
        ) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (
            request.nextUrl.pathname.startsWith('/user') &&
            !session.email_verified_at
        ) {
            return NextResponse.redirect(
                new URL('/email-verification', request.url)
            );
        }
    } else {
        if (
            request.nextUrl.pathname.startsWith('/user') ||
            request.nextUrl.pathname.startsWith('/email-verification')
        ) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
}
