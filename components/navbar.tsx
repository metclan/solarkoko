import AuthenticatedNav from "./authnav"
import UnAutheticatedNav from "./unauthnav"
import { verifySession } from "@/lib/dal"
export default async function NavigationBar () {
  const session = await verifySession(); 
  return (
    session.isAuth ? <AuthenticatedNav /> : <UnAutheticatedNav />
  )
}