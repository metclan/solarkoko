import 'server-only'
import { SessionPayload } from "@/utils/definitions"
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey); 

export async function encrypt(payload: SessionPayload ){
    return new SignJWT(payload).setProtectedHeader({ alg : "HS256"}).setIssuedAt().setExpirationTime("30m").sign(encodedKey)
}
export async function decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
        console.log(error)
      console.log('Failed to verify session')
    }
  }
export async function createSession (userId : string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 30 minutes 
    const session = await encrypt({ userId, expiresAt})
    cookies().set('session', session, { 
        httpOnly : true, 
        secure : false, 
        expires : expiresAt, 
        sameSite : 'lax', 
        path : '/'
    })
}
export async function updateSession () {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session); 
    if(!payload || !session){
        return null; 
    }
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
}

export function deleteSession() {
    cookies().delete('session')
}