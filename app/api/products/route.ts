import { NextResponse, NextRequest } from "next/server"
import { Product } from "@/models/products"
export async function GET (req : NextRequest) {
    console.log(req.url)
    // const searchParams = req.nextUrl.searchParams
    // const params = new URLSearchParams(searchParams)
    // const category = params.has('category') && params.get('category')
    // console.log(req.nextUrl)
    // console.log('the category is ', params.get('category'))
    
    const fetchProducts = await Product.find({});
    return NextResponse.json({...fetchProducts}, { status : 200})
}