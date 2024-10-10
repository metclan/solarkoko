"use server";
import { redirect } from "next/navigation";
import { uploadOneImage } from "@/utils/uploadImages";
import { verifySession } from "@/lib/dal";
import { createSession } from "@/utils/session";
import { User } from "@/models/user";
import { sendVendorWelcomeEmail } from "@/utils/nodemailer.utils";

type FormState = {
    success : boolean
    message : string | null, 
}
export async function createVendor (formState : FormState, formData : FormData):Promise<FormState> {
    let isSuccessful = false; 
    let imageUrl = ''
    try{
        const isVerifiedSession = await verifySession()
        if(!isVerifiedSession.isAuth){
            return { success : false, message : "Login to create vendor account"}
        }
        // Obtain all the fields of the formdata 
        const storeName = formData.get("storeName"); 
        const companyName = formData.get("companyName"); 
        const businessDescription = formData.get("businessDescription"); 
        const businessLogo = formData.get("businessLogo") as File;
        const businessEmail = formData.get("businessEmail");
        const businessPhone = formData.get("businessPhone");
        const businessAddress = formData.get("businessAddress"); 
        const city = formData.get("city"); 
        const postalCode = formData.get("postalCode"); 
        const bankName = formData.get("bankName"); 
        const accountNumber = formData.get("accountNumber"); 
        const accountName = formData.get("accountName"); 
        const taxIdentificationNumber = formData.get("taxIdentificationNumber");
        const state = formData.get("state"); 
        const terms = formData.get("terms"); 
        const returnPolicy = formData.get("returnPolicy"); 
        const privavyPolicy = formData.get("privavyPolicy"); 

        // Ensure all policies are accepted
        if(returnPolicy !== 'on' || terms !== 'on' && privavyPolicy !== 'on'){
            return { message : 'Please accept all terms', success : false}
        }

        // Ensure the businessLogo isn't empty
        if(businessLogo){
            const uploadImage = await uploadOneImage(businessLogo);
            if(!uploadImage.success){
                return { message : uploadImage.message, success : uploadImage.success}
            }
            imageUrl = uploadImage.url as string;
        }

        // Fetch user data 
        const user = await User.findById(isVerifiedSession.userId);
        if(!user){
            return { message : "Invalid user data", success : false}
        }

        // Update user profile and upgrade role to vendor 
        await User.updateOne({ _id : isVerifiedSession.userId}, { 
            role : 'vendor',
            vendorDetails : {
                storeName, 
                businessName : companyName, 
                storeDescription : businessDescription,
                storeLogo : imageUrl,
                businessPhone,
                businessEmail,
                bankingInfo : {
                    bankName, 
                    accountNumber, 
                    accountName, 
                }, 
                taxInfo : {
                    tin : taxIdentificationNumber,
                }, 
                policies : {
                    terms: terms === 'on' && true,
                    returnPolicy: returnPolicy === 'on' && true,
                    privacyPolicy: privavyPolicy === 'on' && true,
                },
            },
            addresses : [{
                city, 
                postalCode,
                street : businessAddress, 
                state, 
                country : 'Nigeria'
            }],
        })

        isSuccessful = true; 

        // Create a new session for this vendor 
        const userId = isVerifiedSession.userId as string;
        await createSession(userId, 'vendor')

        // Send the email 
        const userEmail = user?.email; 
        const userFullname = `${user?.firstName} ${user?.lastName}`
        sendVendorWelcomeEmail(userEmail, userFullname)
        
        return { message : 'Successful', success : true}

    }catch(err){
        console.log(err); 
        return { success : false, message : "Error adding product"}
    }finally{
        if(isSuccessful){
            redirect("/onboard-vendor-success")
        }
    }
}
