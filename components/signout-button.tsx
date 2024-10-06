"use client";
import { getEndPoint } from "@/utils/getEndPoint";
export function SignoutButton () {
   async function handleLogout () {
    const response = await fetch(`${getEndPoint()}/api/auth`,{
      method : 'POST',
    })
    if(response.ok){
      window.location.reload(); 
    }
  }
  return <button onClick={handleLogout} className="flex w-full text-red-600">Sign Out</button>
}