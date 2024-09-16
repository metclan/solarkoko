import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_NAME } = process.env

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}
if (!MONGODB_NAME) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local',
    )
}
export default async function  connectToDb () {
    console.log('the db name is ', MONGODB_NAME)
    try { 
        await mongoose.connect(MONGODB_URI  as string, { dbName : MONGODB_NAME})
        console.log("DB CONNECTED")
    }catch(err){
        console.log(err); 
    }
}