import axios from 'axios';

const API_URL = 'https://r6q0x0dq-3000.use2.devtunnels.ms/api/cart/'; // Replace with your API URL

class CartService {
    async getCart() {
        try {
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }

    async addToCart(product) {
        try {
            const response = await axios.post(`${API_URL}add`, product, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }


    async removeFromCart(productId) {
        try {
            const response = await axios.post(`${API_URL}remove`, { productId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    }
    async clearCart() {
        try {
            const response = await axios.delete(`${API_URL}clear`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
}

export default CartService;