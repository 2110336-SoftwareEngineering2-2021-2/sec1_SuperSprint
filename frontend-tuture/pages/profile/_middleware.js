import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const url = req.nextUrl.clone();
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('session in middleware: ', session);

  if(url.pathname !== '/profile') return NextResponse.next();

  if(!session) url.pathname = '/login'
  
  switch (session.user.role) {
    case 'student' : {
      url.pathname = '/profile/student';
      break;
    }
    case 'tutor' : {
      url.pathname = '/profile/tutor';
      break;
    }
  }
  return NextResponse.redirect(url);
}