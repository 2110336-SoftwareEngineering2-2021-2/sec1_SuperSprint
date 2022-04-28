import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const url = req.nextUrl.clone();
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session && session.user) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
