import { NextResponse, NextRequest } from "next/server"
import { Product } from "@/models/products"
export async function GET (req : NextRequest) {
    const pathname = req.nextUrl.pathname
    const productId = pathname.split('/')[3]
    const fetchProducts = await Product.findById(productId);
    return NextResponse.json({...fetchProducts}, { status : 200})
}