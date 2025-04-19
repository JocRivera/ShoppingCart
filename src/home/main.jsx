import CardProduct from "@/components/landing/CardProduct";
import { products as initialProducts } from "../mocks/products.json"
import { useState } from "react";
import Header from "./Header";
export default function Home() {
    const [products, setProducts] = useState(initialProducts);
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0,
    });
    const filterProducts = (products) => {
        return products.filter(product => {
            return (
                product.price >= filters.minPrice &&
                (filters.category === 'all' || product.category === filters.category)
            )
        })
    }
    const filteredProducts = filterProducts(products);
    return (
        <div>
            <div className="container mx-auto px-4 py-4 ">
                <Header />
                <div >
                    <CardProduct products={filteredProducts} />
                </div>
            </div>
        </div>
    );
}