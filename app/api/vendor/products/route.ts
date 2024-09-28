import { Product } from "@/models/products";
import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@/utils/session";
export async function GET (req:NextRequest) {
    const cookie = req.cookies.get('session');
    if(cookie){
        const decryptedCookie = await decrypt(cookie.value)
        const getProducts = await Product.find({ vendor : decryptedCookie?.userId})
        return NextResponse.json({ ...getProducts}, { status : 200})
    }
    return NextResponse.json({}, {status : 403})
}