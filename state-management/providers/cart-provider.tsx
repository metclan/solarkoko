'use client'; 
import { type ReactNode, createContext, useRef, useContext} from 'react';
import {useStore} from 'zustand'; 
import { type CartStore, createCart} from '../stores/cart-store';

export type CartStoreApi = ReturnType<typeof createCart>

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined)
export interface CartStoreProviderProps {
    children : ReactNode
}

export function CartStoreProvider ( {children } : CartStoreProviderProps) {
    const storeRef = useRef<CartStoreApi>()
    if(!storeRef.current){
        storeRef.current = createCart()
    }
    return <CartStoreContext.Provider value={storeRef.current}>
        {children}
    </CartStoreContext.Provider>
}

export const useCartStore = <T,>(selector : (store : CartStore) => T, ):T => {
    const cartStoreContext = useContext(CartStoreContext)
    if(!cartStoreContext){
        throw new Error("Cart store must be within cart privder")
    }
    return useStore(cartStoreContext, selector)
}