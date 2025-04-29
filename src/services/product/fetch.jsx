import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products/';

class ProductService {
    async getProducts() {
        try {
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const response = await axios.get(`${API_URL}${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }
}

export default ProductService
