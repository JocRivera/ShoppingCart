import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if product already exists in cart
            const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

            if (existingProductIndex >= 0) {
                // Product exists, create a new array with updated quantity
                const newCart = [...prevCart];
                newCart[existingProductIndex] = {
                    ...newCart[existingProductIndex],
                    quantity: (newCart[existingProductIndex].quantity || 1) + 1
                };
                return newCart;
            } else {
                // Product doesn't exist in cart, add it with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };


    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}