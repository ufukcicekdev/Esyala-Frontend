import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('access_token'); 
  const url = req.nextUrl.clone();
  if (!token && url.pathname.startsWith('/profile')) {
    url.pathname = '/';  
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/profile/:path*'], 
};
