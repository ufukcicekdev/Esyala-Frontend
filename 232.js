// import { NextResponse } from 'next/server';

// export function middleware(req) {
//   const token = req.cookies.get('access_token'); 
//   const url = req.nextUrl.clone(); // Clone the URL to modify the pathname

//   if (!token && url.pathname.startsWith('/profile')) {
//     url.pathname = '/';  
//     return NextResponse.redirect(url);  // Perform the redirect
//   }

//   return NextResponse.next(); // Continue processing the request
// }

// // Define which paths this middleware should apply to
// export const config = {
//   matcher: ['/profile/:path*'], // Protect /profile and its sub-paths
// };
