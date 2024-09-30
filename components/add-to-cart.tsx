"use client";
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/state-management/providers/cart-provider"
import { Loader2 } from "lucide-react"
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
export function AddToCartButton ({item : { _id, name, image , price, quantity }, quantityRequested } : ButtonProps) {
    const {addToCart, pendingRequests} = useCartStore(state => state)
    const isLoading = pendingRequests.includes(_id);
    function handleAddToCart() {
        addToCart({
            _id,
            name, 
            image, 
            price, 
            quantity
        }, quantityRequested)
      }
    return(
        <>
            {isLoading ?  
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={handleAddToCart}>
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
