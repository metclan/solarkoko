import { NextResponse, NextRequest } from "next/server";
// import { decrypt } from "@/utils/session";
// import { cookies } from "next/headers";

// //Specify protected and public routes

// const adminRoutes = ["/admin"]
// const protectedRoutes = ['/vendor']
// const publicRoutes = ['/login', '/signup', '/']
// export async function middleware(req:NextRequest) {
//     //check if current route is protected or public route
//     const pathname = req.nextUrl.pathname
//     console.log('here is the path'); 
//     const isPublicRoute = publicRoutes.includes(pathname)
//     const isPrivateRoute = protectedRoutes.includes(pathname)
//     if(!isPublicRoute){
//         //check if the user has a valid cookie
//         // const currentCookie = cookies().get('session')?.value
//         // const session = await decrypt(currentCookie)
//         //if user not authenticated and visiting private route
//         // if(isPrivateRoute && !session?.userId){
//         //     return NextResponse.redirect(new URL('/login',req.nextUrl))
//         // }
//         //if they're trying to access public page but logged in
//         // if(isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')){
//         //     return NextResponse.redirect(new URL('/dashboard', ))
//         // }
//         return NextResponse.next();
//     }
//     return NextResponse.next()
// }

// // Routes Middleware should not run on
// export async function middleware(req:NextRequest) {
// }
// export const config = {
//     matcher: "/((?!api|static|.*\\..*|_next).*)",
//   };




