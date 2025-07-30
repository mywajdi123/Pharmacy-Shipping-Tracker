import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Add any custom middleware logic here if needed
    console.log("Middleware running for:", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl
        
        // Allow access to login page and API auth routes
        if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
          return true
        }
        
        // Require authentication for dashboard routes
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        // Allow access to home page and other public routes
        return true
      },
    },
  }
)

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}