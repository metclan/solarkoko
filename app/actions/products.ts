"use server"
import { uploadMultipleImages } from "@/utils/uploadImages";
import { Product } from "@/models/products";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
type FormState = {
    success : boolean
    message : string | null, 
}
export async function createProduct ( formState : FormState, formData : FormData,) : Promise<FormState>{
    let isSuccessful: boolean = false; 

    try {
    
        const name = formData.get('name'); 
        const description = formData.get('description'); 
        const category = formData.get('category')
        const price = formData.get('price'); 
        const quantity = formData.get('quantity'); 
        const capacity = formData.get('capacity'); 
        const unit = formData.get('unit'); 
        const warranty = formData.get('warranty'); 
        const brand = formData.get('brand')
        const images = formData.getAll('images') as File[];

        const isVerifiedSession = await verifySession()
        if(!isVerifiedSession.isAuth){
            return { success : false, message : "Login to create vendor account"}
        }
        
        // Upload images to cloudinary 
        const imagesUrl = await uploadMultipleImages(images)
        
        const newProduct = new Product({
            vendor : isVerifiedSession.userId,
            name, 
            description, 
            category, 
            price, 
            stock : quantity, 
            capacity : {
                unit : unit,
                value : capacity, 
            }, 
            warranty, 
            brand, 
            images : imagesUrl
            
        })
        await newProduct.save(); 
        isSuccessful = true;
        return { success : true, message : "New product added"}
    }catch(err){
        console.log(err)
        return { success : false, message : "Error adding product"}
    }finally {
        if(isSuccessful){
            redirect("/vendor/products")
        }
    }
}