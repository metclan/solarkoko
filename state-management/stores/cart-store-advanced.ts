import {createStore} from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from '@/hooks/use-toast'
import { getEndPoint } from '@/utils/getEndPoint'

type CartItem = {
    productId : string; 
    name : string; 
    quantity : number; 
    price : number; 
    image : string;
}

type CartState = {
    cartItems : CartItem[]
    totalAmount : number; 
    addToCartLoadingButtons : string[]
    qtyAdjustmentLoadingButtons : string[],
}
type CartActions = {
    // getCart : () => Promise<void>
    addToCart : (cartItem : CartItem) => Promise<void>; 
    removeFromCart : (id : string) => Promise<void>;
    increaseQuantity : (id : string) => Promise<void>;
    decreaseQuantity : (id : string) => Promise<void>;
}

export type CartStore = CartState & CartActions;

const defaultInitState : CartState = {
    cartItems : [],
    totalAmount : 0, 
    addToCartLoadingButtons : [],
    qtyAdjustmentLoadingButtons : [],
    
}

export function createCart (initState:CartState = defaultInitState) {
    return createStore<CartStore>()((set) => ({
        ...initState,
        addToCart : async (cartItem : CartItem) => {
            set(state => ({...state, addToCartLoadingButtons : [...state.addToCartLoadingButtons, cartItem.productId]}))
            //Make a post request 
            const addToCartResponse = await fetch(`${getEndPoint()}/api/cart`, { method : "POST", body : JSON.stringify(cartItem), headers : { 'action' : 'ADD_TO_CART'}})
            if(addToCartResponse.ok){
                // Await the result of post request
                const addToCartDataJson = await addToCartResponse.json()
                const addToCartData = addToCartDataJson.cartItems
                const totalAmount = addToCartDataJson.totalAmount
                // Update the state
                set(state => ({...state, cartItems : addToCartData, totalAmount}))
                // Post to it
                toast({
                    title: `Added to cart`, 
                    description: cartItem.name,
                    variant: 'default',
                    className: 'text-black bg-white'
                });
            }else{
                toast({
                    title: `Cannot add item`, 
                    description: cartItem.name,
                    variant: 'destructive',
                    className: 'text-white bg-red'
                });
            }
            set(state => ({...state, addToCartLoadingButtons : state.addToCartLoadingButtons.filter(buttonIds => buttonIds !== cartItem.productId )}))
        }, 
        removeFromCart : async (productId : string) => {
            set(state => ({...state, qtyAdjustmentLoadingButtons : [...state.qtyAdjustmentLoadingButtons, productId]}))
            //Make a post request 
            const removeFromCartResponse = await fetch(`${getEndPoint()}/api/cart`, { method : "POST", body : JSON.stringify({productId}), headers : { 'action' : 'REMOVE_ITEM'}})
            if(removeFromCartResponse.ok){
                // Await the result of post request
                const removeFromCartJson = await removeFromCartResponse.json()
                const removeFromCartData = removeFromCartJson.cartItems
                const totalAmount = removeFromCartJson.totalAmount
                // Update the state
                set(state => ({...state, cartItems : removeFromCartData, totalAmount}))
            }
            set(state => ({...state, qtyAdjustmentLoadingButtons : state.qtyAdjustmentLoadingButtons.filter(buttonIds => buttonIds !== productId )}))
        }, 
        increaseQuantity : async (productId : string) => {
               set(state => ({...state, qtyAdjustmentLoadingButtons : [...state.qtyAdjustmentLoadingButtons, productId]}))
               //Make a post request 
               const increaseQuantityResponse = await fetch(`${getEndPoint()}/api/cart`, { method : "POST", body : JSON.stringify({productId}), headers : { 'action' : 'INCREMENT_ITEM'}})
               if(increaseQuantityResponse.ok){
                   // Await the result of post request
                   const increaseQuantityCartJson = await increaseQuantityResponse.json()
                   const increaseQuantityCartData = increaseQuantityCartJson.cartItems
                   const totalAmount = increaseQuantityCartJson.totalAmount
                   // Update the state
                   set(state => ({...state, cartItems : increaseQuantityCartData, totalAmount}))
               }
               set(state => ({...state, qtyAdjustmentLoadingButtons : state.qtyAdjustmentLoadingButtons.filter(buttonIds => buttonIds !== productId )}))
        },
        decreaseQuantity : async (productId : string) => {
             set(state => ({...state, qtyAdjustmentLoadingButtons : [...state.qtyAdjustmentLoadingButtons, productId]}))
             //Make a post request 
             const decreaseQuantityResponse = await fetch(`${getEndPoint()}/api/cart`, { method : "POST", body : JSON.stringify({productId}), headers : { 'action' : 'DECREMENT_ITEM'}})
             if(decreaseQuantityResponse.ok){
                 // Await the result of post request
                 const decreaseQuantityCartJson = await decreaseQuantityResponse.json()
                 const increaseQuantityCartData = decreaseQuantityCartJson.cartItems
                 const totalAmount = decreaseQuantityCartJson.totalAmount
                 // Update the state
                 set(state => ({...state, cartItems : increaseQuantityCartData, totalAmount}))
             }
             set(state => ({...state, qtyAdjustmentLoadingButtons : state.qtyAdjustmentLoadingButtons.filter(buttonIds => buttonIds !== productId )}))
        },
    }))
}
