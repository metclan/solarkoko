"use server"; 
import { verifySession } from "@/lib/dal";
import { User } from "@/models/user";

type Address = {
    _id? : string;
    name : string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
} 

type FormState = {
    success : boolean
    message : string | null, 
}
export async function createCheckoutAddressAction ( formState : FormState, formData : FormData,) : Promise<FormState>{
    try {
        const name = formData.get('name');
        const street = formData.get('street'); 
        const city = formData.get('city');
        const state = formData.get('state'); 
        const postalCode = formData.get('postalCode');
        // Verify user's auth status 
        const isVerifiedSession = await verifySession()
        if(!isVerifiedSession.isAuth){
            return { success : false, message : "Login to create vendor account"}
        }
        // Update user details 
        await User.findByIdAndUpdate(
            isVerifiedSession.userId, 
            { $push: { addresses: { name, street, city, state, postalCode } } }, 
            { new: true }  // Return the updated document
          );
        return { message : "", success : true}
    }
    catch(err){
        console.log("Error adding checkout address ", err)
        return { message : "", success : true}
    }
}
export async function editCheckoutAddressAction (ids: { addressId : string }, formState : FormState, formData : FormData): Promise<FormState> {
    try {
        const addressId = ids.addressId[0];
        const name = formData.get('name');
        const street = formData.get('street'); 
        const city = formData.get('city');
        const state = formData.get('state'); 
        const postalCode = formData.get('postalCode');
        // Verify user's auth status 
        const isVerifiedSession = await verifySession()
        if(!isVerifiedSession.isAuth){
            return { success : false, message : "Login to create vendor account"}
        }
        if(!addressId) {
            console.log(addressId); 
            throw Error("Error updating this address")
        }
        const findUser = await User.findById(isVerifiedSession.userId, { addresses : 1})
        const updateUserAddress = findUser.addresses.map((address : Address) => {
            if(address._id?.toString() === addressId) {
                return {
                    name : name || address.name, 
                    street : street || address.city, 
                    state : state || address.state, 
                    city : city || address.city, 
                    postalCode : postalCode || address.postalCode,
                    
                }
            }
            return address;
        })
        findUser.addresses = updateUserAddress;
        await findUser.save(); 
        return { message : "Address updated successfully", success : true}

    }catch(err){
        return { message : "", success : false}
    }
}