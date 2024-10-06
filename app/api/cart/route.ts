import { NextRequest, NextResponse } from "next/server";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { decrypt } from "@/utils/session";
import { Cart } from "@/models/cart";
import { v4 as uuid } from 'uuid'
import { cookies } from "next/headers";

type CartItem = {
    productId : string; 
    quantity : number; 
    price : number; 
    image : string;
    name : string;
}

export async function GET (req : NextRequest) {
    try{ 
        const cookieSession  = req.cookies.get('_ci');
        const authSesstion = req.cookies.get('session'); 
        if(authSesstion){
        }else{
            if(cookieSession){
                const cookieSessionValue = cookieSession.value; 
                const cartItems = await Cart.find({ sessionId : cookieSessionValue }, { items : 1, totalAmount : 1, _id : 0})
                return NextResponse.json({ cartItems}, { status : 200})
            }
            return NextResponse.json({cartItems : []}, { status : 200})
        }
    }catch(err){
        if(isDynamicServerError(err)){
            throw err;
        }
        console.log(err)
        return NextResponse.json({}, { status : 404})
    }
}
export async function POST (req : NextRequest) {
    try {
        const { quantity, price, image, name, productId } = await req.json();
        const cartAction = req.headers.get('action')
        let cart; 
        const cookie = req.cookies.get('session');
        
        // If user is authenticated
        if(cookie){
            const decryptedCookie = await decrypt(cookie.value)
            const userId = decryptedCookie?.userId
            cart = await Cart.find({ user : userId})
            // If there's no existing cart for this user 
            if(!cart){
                cart = new Cart({ user : userId})
            }
        }else {
            // User isn't authenticated 
            const cartSession = req.cookies.get('_ci')
            let cartId =  cartSession?.value
            if(!cartId){
                cartId = uuid();
                const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 30 minutes
                cookies().set('_ci', cartId, { 
                    httpOnly : true, 
                    secure : false, 
                    expires : expiresAt, 
                    sameSite : 'lax', 
                    path : '/'
                })
            }
            cart = await Cart.findOne({ sessionId : cartId})
            if(!cart){
                cart = new Cart({ sessionId: cartId });
            }
            // Check for product
            const existingProductIndex = cart.items.findIndex((item : CartItem) => item.productId.toString() === productId)
            if(cartAction === "ADD_TO_CART"){
                if(existingProductIndex > -1){
                    cart.items[existingProductIndex].quantity += quantity;
                }else{
                    cart.items.push({ productId , quantity, price, image, name });
                }
                await cart.save(); 
                return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
            }
            // Remove from cart
            if(cartAction === "REMOVE_ITEM"){
                if(existingProductIndex > -1){
                    cart.items = cart.items.filter((item : CartItem) => item.productId.toString() !== productId)
                    await cart.save(); 
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }else{
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }
            }
            // Decrement item in cart 
            if(cartAction === "DECREMENT_ITEM"){
                if(existingProductIndex > -1){
                    cart.items[existingProductIndex].quantity -= 1;
                    await cart.save(); 
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }else{
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }
            }
            // Decrement item in cart 
            if(cartAction === "INCREMENT_ITEM"){
                if(existingProductIndex > -1){
                    cart.items[existingProductIndex].quantity += 1;
                    await cart.save(); 
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }else{
                    return NextResponse.json({ success : true, cartItems : cart.items, totalAmount : cart.totalAmount }, { status : 200})
                }
            }

        }
    }catch(err){
        console.log(err); 
        return NextResponse.json({ message : "Cannot add item to cart"}, { status : 500})
    }
}