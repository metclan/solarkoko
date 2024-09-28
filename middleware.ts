import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { decrypt } from './utils/session'
 
export default async function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname
        const vendorRoute = "/vendor"
        const customerRoute = "/customer"
        const authenticationRoutes = ['/login', '/signup']
        const protectedRoutes = ['/become-vendor', '/welcome-vendor']
        const cookie =  request.cookies
        const hasSessionCookie = cookie.get('session')
        //Trying to access authenticated routes 
        if(authenticationRoutes.includes(pathname) && hasSessionCookie){
            return NextResponse.redirect(new URL("http://localhost:3000/"))
        }
        // Trying to access protected routes 
        if(pathname.startsWith(vendorRoute) || pathname.startsWith(customerRoute) || protectedRoutes.includes(pathname)){
            //check if user has session 
            if(hasSessionCookie){
                const userData = await decrypt(hasSessionCookie.value)
                const role = userData?.role;
                if(pathname.startsWith('/vendor')){
                    if(role === "vendor"){
                        return NextResponse.next(); 
                    }
                    return NextResponse.redirect(new URL('http://localhost:3000/welcome-vendor'))
                    
                }
                if(protectedRoutes.includes(pathname)){
                    return NextResponse.next(); 
                }
                if(pathname.startsWith('/customer')){
                    if(role === "customer" || role === "vendor"){
                        return NextResponse.next(); 
                    }
                    return NextResponse.redirect('http://localhost:3000/login')

                }
            }
            return NextResponse.redirect('http://localhost:3000/login')
            
        }
        return NextResponse.next();
    }catch(err){
        // return NextResponse.error();
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }