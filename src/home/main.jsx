import CardProduct from "@/components/landing/CardProduct";
import { products as initialProducts } from "../mocks/products.json"
import { useState } from "react";
import Header from "./Header"
import { useFilters } from "@/hooks/useFilters";
export default function Home() {
    const [products, setProducts] = useState(initialProducts);
    const { filters, setFilters, filterProducts } = useFilters();
    const filteredProducts = filterProducts(products);
    return (
        <>
            <Header />
            <div >
                <CardProduct products={filteredProducts} />
            </div>
        </>
    );
}