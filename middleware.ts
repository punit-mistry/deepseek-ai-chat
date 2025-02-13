import { clerkMiddleware } from '@clerk/nextjs/server';
// or alternatively:
// import { authMiddleware } from "@clerk/nextjs/dist/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)' // Run middleware on API routes
  ],
}; 