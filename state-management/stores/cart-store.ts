import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getEndPoint } from '@/utils/getEndPoint';
import { toast } from '@/hooks/use-toast';

type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
}

type ServerResponse = {
    currentPrice: number;
    availableQuantity: number;
}

export type CartState = {
    cartItems: CartItem[];
    isAuthenticated: boolean;
    pendingRequests: string[];
}

export type CartActions = {
    addToCart: (newItem: CartItem, requestedQuantity: number) => Promise<void>;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => Promise<void>;
    decreaseQuantity: (id: string) => Promise<void>;
    setIsAuthenticated: (isAuth: boolean) => void;
    syncWithDatabase: () => Promise<void>;
    clearCart: () => void;
    addPendingRequest: (id: string) => void;
    removePendingRequest: (id: string) => void;
    isPendingRequest: (id: string) => boolean;
}

export type CartStore = CartActions & CartState;

const defaultInitState: CartState = {
    cartItems: [],
    isAuthenticated: false,
    pendingRequests: [],
}

const saveToDatabase = async (cartItems: CartItem[]): Promise<void> => {
    console.log(cartItems);
    // Implement your database saving logic here
    // const fetchProduct = await fetch(getEndPoint(), { method : "GET"})
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 300));
}

const checkServerStock = async (itemId: string): Promise<ServerResponse> => {
    const fetchProduct = await fetch(`${getEndPoint()}/api/cart?productId=${itemId}`, { method: "GET" });
    const data = await fetchProduct.json();
    return {
        currentPrice: data.currentPrice,
        availableQuantity: data.availableQuantity,
    };
}

export const createCart = (initState: CartState = defaultInitState) => {
    return createStore<CartStore>()(
        persist(
            (set, get) => ({
                ...initState,
                addToCart: async (newItem: CartItem, requestedQuantity: number) => {
                    get().addPendingRequest(newItem._id);
                    try {
                        const serverResponse = await checkServerStock(newItem._id);
                        
                        set((state) => {
                            const existingItem = state.cartItems.find(item => item._id === newItem._id);
                            let updatedCartItems = [...state.cartItems];
                            const existingQuantity = existingItem ? existingItem.quantity : 0;
                            const totalQuantity = existingQuantity + requestedQuantity;
                
                            // Check if the total quantity exceeds available quantity
                            if (totalQuantity <= serverResponse.availableQuantity) {
                                if (existingItem) {
                                    updatedCartItems = state.cartItems.map((item) => 
                                        item._id === newItem._id 
                                            ? { ...item, quantity: totalQuantity, price: serverResponse.currentPrice } 
                                            : item
                                    );
                                } else {
                                    updatedCartItems.push({ ...newItem, quantity: requestedQuantity, price: serverResponse.currentPrice });
                                }
                
                                if (state.isAuthenticated) {
                                    saveToDatabase(updatedCartItems);
                                }
                                toast({
                                    title: `Added to cart`, 
                                    description: newItem.name,
                                    variant: 'default',
                                    className: 'text-black bg-white'
                                });
                            } else {
                                toast({
                                    title: `Cannot add item`, 
                                    description: `This vendor has only ${serverResponse.availableQuantity} of this item available. \nCheck other vendors for this item`,
                                    variant: 'destructive',
                                    className: 'text-black bg-white'
                                });
                            }
                            
                            return { cartItems: updatedCartItems };
                        });
                    } catch (error) {
                        console.error('Error while adding to cart:', error);
                    } finally {
                        get().removePendingRequest(newItem._id);
                    }
                },
                removeFromCart: (id: string) => set((state) => {
                    const updatedCartItems = state.cartItems.filter((item) => item._id !== id);
                    if (state.isAuthenticated) {
                        saveToDatabase(updatedCartItems);
                    }
                    return { cartItems: updatedCartItems };
                }),
                
                increaseQuantity: async (id: string) => {
                    get().addPendingRequest(id);
                    try {
                        const serverResponse = await checkServerStock(id);
                        
                        set((state) => {
                            const item = state.cartItems.find(item => item._id === id);
                            if (!item) {
                                toast({
                                    title : `Item not in cart`, 
                                    description : "This item was not found in the cart",
                                    variant : 'destructive',
                                    className : 'text-black bg-white'
                                })
                                throw new Error(`Item with id ${id} not found in cart`);
                            }
                            
                            let updatedCartItems;
                            if (item.quantity + 1 <= serverResponse.availableQuantity) {
                                updatedCartItems = state.cartItems.map(cartItem => 
                                    cartItem._id === id 
                                        ? { ...cartItem, quantity: cartItem.quantity + 1, price: serverResponse.currentPrice }
                                        : cartItem
                                );
                                
                                if (state.isAuthenticated) {
                                    saveToDatabase(updatedCartItems);
                                }
                            } else {
                                toast({
                                    title: `Cannot add item`, 
                                    description: `This vendor has only ${serverResponse.availableQuantity} of this item available. \nCheck other vendors for this item`,
                                    variant: 'destructive',
                                    className: 'text-black bg-white'
                                });
                                updatedCartItems = state.cartItems;
                            }
                            
                            return { cartItems: updatedCartItems };
                        });
                    } catch (error) {
                        console.error('Error while increasing quantity:', error);
                    } finally {
                        get().removePendingRequest(id);
                    }
                },
                
                decreaseQuantity: async (id: string) => {
                    get().addPendingRequest(id);
                    try {
                        const serverResponse = await checkServerStock(id);
                        
                        set((state) => {
                            const item = state.cartItems.find(item => item._id === id);
                            if (!item) {
                                throw new Error(`Item with id ${id} not found in cart`);
                            }
                            
                            let updatedCartItems;
                            if (item.quantity > 1) {
                                if (item.quantity - 1 <= serverResponse.availableQuantity) {
                                    updatedCartItems = state.cartItems.map(cartItem => 
                                        cartItem._id === id 
                                            ? { ...cartItem, quantity: cartItem.quantity - 1, price: serverResponse.currentPrice }
                                            : cartItem
                                    );
                                    
                                    if (state.isAuthenticated) {
                                        saveToDatabase(updatedCartItems);
                                    }
                                    
                                    console.log(`Decreased quantity of item ${id} to ${item.quantity - 1}`);
                                } else {
                                    console.log(`Cannot decrease quantity. This vendor now has only ${serverResponse.availableQuantity} of this product available.`);
                                    updatedCartItems = state.cartItems.map(cartItem => 
                                        cartItem._id === id 
                                            ? { ...cartItem, quantity: serverResponse.availableQuantity, price: serverResponse.currentPrice }
                                            : cartItem
                                    );
                                }
                            } else {
                                console.log(`Cannot decrease quantity below 1. Use removeFromCart to remove the item.`);
                                updatedCartItems = state.cartItems;
                            }
                            
                            return { cartItems: updatedCartItems };
                        });
                    } catch (error) {
                        console.error('Error while decreasing quantity:', error);
                    } finally {
                        get().removePendingRequest(id);
                    }
                },
                
                setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth }),
                syncWithDatabase: async () => {
                    const state = get();
                    if (state.isAuthenticated) {
                        await saveToDatabase(state.cartItems);
                    }
                },
                clearCart: () => set({ cartItems: [] }),
                addPendingRequest: (id: string) => set((state) => {
                    const freshArray:string[] = []
                    freshArray.push(id)
                    freshArray.push(...state.pendingRequests)
                    return ({
                        pendingRequests: freshArray
                    })})
                ,
                removePendingRequest: (id: string) => set((state) => ({
                    pendingRequests: state.pendingRequests.filter(requestId => requestId !== id)
                })),
                isPendingRequest: (id: string) => get().pendingRequests.includes(id)
            }),
            {
                name: 'cart-storage',
                storage: createJSONStorage(() => localStorage)
            }
        )
    );
}
