"use server"
import { redisClient } from "@/lib/redis";
export async function getRedisCachedValue (key : string) {
    try{
        if(!key) return null 
        const value = await redisClient.get(key)
        return value; 
    }catch(err){
        console.log(err)
        return null
    }
}