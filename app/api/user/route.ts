import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/session";
import { User } from "@/models/user";

type Address = {
    _id: string
    name: string
    street: string
    city: string
    state: string
    phone: string
    isDefault?: string
  }

export async function GET (req:NextRequest) {
    try{
        const searchParams = req.nextUrl.searchParams
        const requestType = req.headers.get('action'); 
        const authSesstion = req.cookies.get('session'); 
        if(!authSesstion){
            return NextResponse.json({}, {status : 403})
        }
        // Decrypt auth cookie 
        const decryptedCookie = await decrypt(authSesstion.value)
        const userId = decryptedCookie?.userId
        const userData = await User.findById(userId)
        if(!userData){
            return NextResponse.json({}, { status : 404})
        }
        if(requestType === "GET_ADDRESSES"){
            return NextResponse.json({addresses : userData.addresses}, { status : 200})
        }
        else if(requestType === "GET_ADDRESS"){
            const addressId = searchParams.get('addressId'); 
            const userAddress = userData.addresses.find((address : Address) => address._id.toString() === addressId)
            if(!addressId) return NextResponse.json({ message : "Address ID not specified" }, { status : 404})
            await userData.save()
            return NextResponse.json({address : userAddress}, { status : 200})
        }else{
            return NextResponse.json({}, {status : 401})
        }
    }catch(err){
        console.log(err)
        return NextResponse.json({}, { status : 500})
    }
}
export async function DELETE (req:NextRequest) {
    try{
        const authSesstion = req.cookies.get('session'); 
        const {addressId} =  await req.json()
        if(!addressId){
            return NextResponse.json({}, { status : 404})
        }
        if(!authSesstion){
            return NextResponse.json({}, {status : 403})
        }
        // Decrypt auth cookie 
        const decryptedCookie = await decrypt(authSesstion.value)
        const userId = decryptedCookie?.userId
        const userData = await User.findById(userId)
        if(!userData){
            return NextResponse.json({}, { status : 404})
        }
        // Find Id 
        const allAddress = userData.addresses as Address[]
        const newAddresses = allAddress.filter(address => address._id.toString() !== addressId)
        userData.addresses = newAddresses
        await userData.save(); 
        return NextResponse.json({}, { status : 200})
    }catch(err){
        return NextResponse.json({ message : "Address deleted succesfully"}, { status : 500})

    }

}