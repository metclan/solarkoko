import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/products";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET (req : NextRequest) {
    try{ 
        const productId  = req.nextUrl.searchParams.get('productId')
        const findProduct = await Product.findById(productId); 
        if(findProduct){
            return NextResponse.json({ currentPrice : findProduct.price, availableQuantity : findProduct.stock})
        }
        throw Error("Not found")
    }catch(err){
        if(isDynamicServerError(err)){
            throw err;
        }
        console.log(err)
        return NextResponse.json({}, { status : 404})
    }
}