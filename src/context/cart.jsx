import { createContext, useEffect, useState } from "react";
import CartService from "@/services/cart/fetch";
import { useAuth } from "./auth";

export const cartService = new CartService();
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await cartService.getCart();
                    setCart(response.cart || []);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
            else {
                const localCart = localStorage.getItem("cart");
                if (localCart) {
                    setCart(JSON.parse(localCart));
                } else {
                    setCart([]);
                }
            }
        };
        fetchCart();
    }, [user]); // Fetch cart when user changes

    useEffect(() => {
        if (!user) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = (product) => {
        if (user) {
            cartService.addToCart({
                productId: product._id,
                quantity: 1
            }).then((response) => {
                console.log("Product added to cart:", response);
            }).catch((error) => {
                console.error("Error adding product to cart:", error);
            });
        }

        if (!user) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }


        setCart((prevCart) => {
            // Check if product already exists in cart
            const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);

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
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const removeItemFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item._id === productId);

            if (existingProductIndex >= 0) {
                const newCart = [...prevCart];
                const product = newCart[existingProductIndex];

                if (product.quantity > 1) {
                    newCart[existingProductIndex] = {
                        ...product,
                        quantity: product.quantity - 1
                    };
                    return newCart;
                } else {
                    // Remove the product from cart if quantity is 1
                    return newCart.filter((item) => item._id !== productId);
                }
            }
            return prevCart;
        });
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
}