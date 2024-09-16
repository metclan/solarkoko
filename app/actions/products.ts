"use server"
import { cloudinaryApi } from "@/lib/cloudinary";
import { Product } from "@/models/products";
import { redirect } from "next/navigation";
import mongoose, { mongo } from "mongoose";
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
        const images = formData.get('images') as File;

        // // upload resume to cloudinary
        // const arrayBuffer = await images.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // interface CloudinaryResult {
        //     secure_url: string;
        // }
        // const cloudinaryResponse = await new Promise<CloudinaryResult>((resolve, reject) => {
        //     cloudinaryApi.uploader.upload_stream(
        //     { resource_type: 'auto' },
        //     (error : any, result : any) => {
        //         if (error) reject(error);
        //         else resolve(result as CloudinaryResult);
        //     }
        //     ).end(buffer);
        // });
        //Add the product 
        const newProduct = new Product({
            vendor : "66e83848f9fe3534ea8a0e03",
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
            images : []
            
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