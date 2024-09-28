import { Product } from "@/models/products";
import { NextRequest, NextResponse } from "next/server";
export async  function GET () {
    const products = await Product.find({});
    return NextResponse.json({ ...products}, { status : 200})
}