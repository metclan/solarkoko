import "server-only"; 
import { User } from "@/models/user";

import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { cache } from "react";


export const verifySession =  cache(async () => {
        const cookie = cookies().get('session')?.value; 
        const session = await decrypt(cookie);
        if(!session?.userId){
            return { isAuth : false, userId : ''}
        }
        return { isAuth : true, userId : session?.userId};
})
export async function verifyUser () {
    try {
        const session = await verifySession();
        if(!session.userId) return null; 
        const user = await User.findById((session.userId), { firstName : 1, lastName : 1, role : 1});
        if(!user) throw new Error("Invalid user")
        return { firstName : user.firstName, role : user.role}; 
    }catch(err){
        console.log(err)
        return null; 
    }
}