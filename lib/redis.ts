import {Redis} from "ioredis"
const {UPSTASH_REDIS_CONNECTION_STRING}  = process.env
if(!UPSTASH_REDIS_CONNECTION_STRING){
    throw new Error("Redis connection string invalid")
}
export const  redisClient = new Redis(UPSTASH_REDIS_CONNECTION_STRING as string);


