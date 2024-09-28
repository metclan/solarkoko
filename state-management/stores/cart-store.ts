import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getEndPoint } from '@/utils/getEndPoint';

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
    pendingRequests: Set<string>;
}

export type CartActions = {
    addToCart: (newItem: CartItem, requestedQuantity: number) => Promise<void>;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => Promise<void>;
    decreaseQuantity: (id: string) => Promise<void>;
    setIsAuthenticated: (isAuth: boolean) => void;
    syncWithDatabase: () => Promise<void>;
    clearCart: () => void;
}

export type CartStore = CartActions & CartState;

const defaultInitState: CartState = {
    cartItems: [],
    isAuthenticated: false,
    pendingRequests: new Set(),
}

const saveToDatabase = async (cartItems: CartItem[]): Promise<void> => {
    // Implement your database saving logic here
    // const fetchProduct = await fetch(getEndPoint(), { method : "GET"})
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 300));
}

const checkServerStock = async (itemId: string): Promise<ServerResponse> => {
    // Implement your server request logic here
    // console.log(`Checking server stock for item ${itemId}`);
    const fetchProduct = await fetch(`${getEndPoint()}/api/cart?productId=${itemId}`, { method : "GET"})
    // Mock response
    return {
        currentPrice: 10.99,
        availableQuantity: Math.floor(Math.random() * 10) + 1, // Random number between 1 and 10
    };
}

export const createCart = (initState: CartState = defaultInitState) => {
    return createStore<CartStore>()(
        persist(
            (set, get) => ({
                ...initState,
                addToCart: async (newItem: CartItem, requestedQuantity: number) => {
                    set((state) => ({ pendingRequests: new Set(state.pendingRequests).add(newItem._id) }));
                    
                    try {
                        const serverResponse = await checkServerStock(newItem._id);
                        
                        set((state) => {
                            const existingItem = state.cartItems.find(item => item._id === newItem._id);
                            let updatedCartItems = [...state.cartItems];
                            
                            if (serverResponse.availableQuantity >= requestedQuantity) {
                                if (existingItem) {
                                    updatedCartItems = state.cartItems.map((item) => 
                                        item._id === newItem._id 
                                            ? { ...item, quantity: item.quantity + requestedQuantity, price: serverResponse.currentPrice } 
                                            : item
                                    );
                                } else {
                                    updatedCartItems.push({ ...newItem, quantity: requestedQuantity, price: serverResponse.currentPrice });
                                }
                                
                                if (state.isAuthenticated) {
                                    saveToDatabase(updatedCartItems);
                                }
                                
                                console.log(`Added ${requestedQuantity} of item ${newItem._id} to cart`);
                            } else {
                                console.log(`This vendor has only ${serverResponse.availableQuantity} of this product. Please check other sellers for the same product.`);
                            }
                            
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(newItem._id);
                            
                            return { 
                                cartItems: updatedCartItems,
                                pendingRequests: newPendingRequests
                            };
                        });
                    } catch (error) {
                        console.error('Error while adding to cart:', error);
                        set((state) => {
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(newItem._id);
                            return { pendingRequests: newPendingRequests };
                        });
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
                    set((state) => ({ pendingRequests: new Set(state.pendingRequests).add(id) }));
                    
                    try {
                        const serverResponse = await checkServerStock(id);
                        
                        set((state) => {
                            const item = state.cartItems.find(item => item._id === id);
                            if (!item) {
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
                                
                                console.log(`Increased quantity of item ${id} to ${item.quantity + 1}`);
                            } else {
                                console.log(`Cannot increase quantity. This vendor has only ${serverResponse.availableQuantity} of this product available.`);
                                updatedCartItems = state.cartItems;
                            }
                            
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(id);
                            
                            return { 
                                cartItems: updatedCartItems,
                                pendingRequests: newPendingRequests
                            };
                        });
                    } catch (error) {
                        console.error('Error while increasing quantity:', error);
                        set((state) => {
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(id);
                            return { pendingRequests: newPendingRequests };
                        });
                    }
                },
                
                decreaseQuantity: async (id: string) => {
                    set((state) => ({ pendingRequests: new Set(state.pendingRequests).add(id) }));
                    
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
                            
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(id);
                            
                            return { 
                                cartItems: updatedCartItems,
                                pendingRequests: newPendingRequests
                            };
                        });
                    } catch (error) {
                        console.error('Error while decreasing quantity:', error);
                        set((state) => {
                            const newPendingRequests = new Set(state.pendingRequests);
                            newPendingRequests.delete(id);
                            return { pendingRequests: newPendingRequests };
                        });
                    }
                },
                
                setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth }),
                syncWithDatabase: async () => {
                    const state = get();
                    if (state.isAuthenticated) {
                        await saveToDatabase(state.cartItems);
                    }
                },
                clearCart: () => set({ cartItems: [] })
            }),
            {
                name: 'cart-storage',
                storage: createJSONStorage(() => localStorage)
            }
        )
    );
}