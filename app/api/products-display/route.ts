import { Product } from "@/models/products";
import { NextResponse, NextRequest } from "next/server";
export async  function GET (req : NextRequest) {
    console.log(req.url)
    const products = await Product.find({});
    return NextResponse.json({ ...products}, { status : 200})
}