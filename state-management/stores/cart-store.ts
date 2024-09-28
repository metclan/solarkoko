import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
}

export type CartState = {
    cartItems: CartItem[];
    isAuthenticated: boolean;
}

export type CartActions = {
    addToCart: (newItem: CartItem) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    setIsAuthenticated: (isAuth: boolean) => void;
    syncWithDatabase: () => Promise<void>;
    clearCart: () => void;
}

export type CartStore = CartActions & CartState;

const defaultInitState: CartState = {
    cartItems: [],
    isAuthenticated: false
}

const saveToDatabase = async (cartItems: CartItem[]): Promise<void> => {
    // Implement your database saving logic here
    console.log('Saving to database:', cartItems);
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 300));
}

export const createCart = (initState: CartState = defaultInitState) => {
    return createStore<CartStore>()(
        persist(
            (set, get) => ({
                ...initState,
                addToCart: (newItem: CartItem) => set((state) => {
                    // Getting the existing item if it exists
                    const existingItem = state.cartItems.find(item => item._id === newItem._id);
                    let updatedCartItems;
                
                    if (existingItem) {
                        // Map through the items and update the quantity if the item exists
                        updatedCartItems = state.cartItems.map((item) => 
                            item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
                        );
                    } else {
                        // Add new item to cart if it doesn't exist
                        updatedCartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
                    }
                
                    // Save to database if authenticated
                    if (state.isAuthenticated) {
                        saveToDatabase(updatedCartItems);
                    }
                
                    // Return the updated cart items
                    return { cartItems: updatedCartItems };
                }),
                
                removeFromCart: (id: string) => set((state) => {
                    const updatedCartItems = state.cartItems.filter((item) => item._id !== id);
                    if (state.isAuthenticated) {
                        saveToDatabase(updatedCartItems);
                    }
                    return { cartItems: updatedCartItems };
                }),
                increaseQuantity: (id: string) => set((state) => {
                    const updatedCartItems = state.cartItems.map(item => 
                        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                    if (state.isAuthenticated) {
                        saveToDatabase(updatedCartItems);
                    }
                    return { cartItems: updatedCartItems };
                }),
                decreaseQuantity: (id: string) => set((state) => {
                    const updatedCartItems = state.cartItems.map(item => 
                        item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                    );
                    if (state.isAuthenticated) {
                        saveToDatabase(updatedCartItems);
                    }
                    return { cartItems: updatedCartItems };
                }),
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
                // getStorage: () => localStorage,
                storage : createJSONStorage(() => localStorage)
            }
        )
    );
}

// Helper hook for cart operations
// export const useCartOperations = (useCartStore: ReturnType<typeof createCart>) => {
//     const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore(state => state);
    
//     return {
//         addItem: (item: CartItem) => {
//             addToCart(item);
//         },
//         removeItem: (id: string) => {
//             removeFromCart(id);
//         },
//         incrementQuantity: (id: string) => {
//             increaseQuantity(id);
//         },
//         decrementQuantity: (id: string) => {
//             decreaseQuantity(id);
//         },
//         clearAllItems: () => {
//             clearCart();
//         }
//     };
// };