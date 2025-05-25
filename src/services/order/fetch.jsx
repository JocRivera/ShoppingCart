import axios from 'axios';

const API_URL = 'http://localhost:3000/api/orders/'; // Replace with your API URL

class OrderService {
    async createOrder(orderData) {
        try {
            const response = await axios.post(`${API_URL}`, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    async getOrder(orderId) {
        try {
            const response = await axios.get(`${API_URL}${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }
}

export default OrderService;