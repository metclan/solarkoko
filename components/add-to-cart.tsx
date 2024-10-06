"use client";
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { Loader2 } from "lucide-react"
import { useCartStore } from "@/state-management/providers/cart-provider";
type ButtonProps = {
    item : {
        _id : string;
        name : string;
        image: string;
        price : number;
        quantity : number;
    }, 
    quantityRequested : number;

}
export function AddToCartButton ({item : { _id, name, image , price, quantity }} : ButtonProps) {
    const { addToCart, addToCartLoadingButtons } = useCartStore(state => state)
    const isLoading = addToCartLoadingButtons.includes(_id)
    function handleAddToCart () {
        addToCart({
            productId : _id, 
            price, 
            image,
            quantity, 
            name
        })
    }
    return(
        <>
            {isLoading ?  
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button> 
            : 
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add
            </Button> 
            }
        </>
    )
}
