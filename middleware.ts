import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { decrypt } from './utils/session'
import { User } from './models/user'
 
export default async function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname
        const vendorRoute = '/vendor'
        const authenticationRoutes = ['/login', '/signup']
        const cookie =  request.cookies
        const hasSessionCookie = cookie.get('session')
        if(hasSessionCookie){
            const sessionCookieValue = hasSessionCookie.value
            // If user is trying to visit the authentication routes while authenticated
            if(authenticationRoutes.includes(pathname)){
                // Check user role 
                return NextResponse.redirect(new URL('/', request.url))
            }
            // If user is trying to access
            if(pathname.startsWith(vendorRoute)){
                // const userPayload = await decrypt(sessionCookieValue);
                // if(userPayload){
                    // const userId = await userPayload.userId as string;
                    // Check user's role  in redis cache 
                    // const isUserCached = await getRedisCachedValue(userId);
                    // console.log('here is the user id ', isUserCached)
                    // if(!isUserCached){
                    //     const user = await User.findById(userId)
                    //     console.log(user); 
                    //     // await redisClient.set(email, verificationCode, 'EX', 900);
                    // }
                    // If not, query the db with the id and fetch user role 
                    // save the user role in the db 
                    // user the role to know if they have access to this route 

                // }
                // console.log('the value of the cookie value is ', userPayload)
                // return NextResponse.redirect(new URL('/', request.url))
            }
        }
    }catch(err){
        return NextResponse.redirect('/')
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