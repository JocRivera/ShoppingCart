import CardProduct from "@/components/landing/CardProduct";
import { products as initialProducts } from "../mocks/products.json"
import { useState } from "react";
import Header from "./Header"
import { useFilters } from "@/hooks/useFilters";
export default function Home() {
    const [products, setProducts] = useState(initialProducts);
    const { filters, setFilters, filterProducts } = useFilters();
    const filteredProducts = filterProducts(products).slice(0, 4);
    return (
        <>
            <div className="w-full h-[300px] overflow-hidden bg-black relative">
                <h1 className=" cursor-pointer text-white text-5xl font-extrabold text-center pt-20 shadow-2xl uppercase tracking-wide transform transition duration-500 hover:scale-110 hover:text-yellow-400">
                    Compra ahora
                </h1>
            </div>
            <div className="mt-4 px-4 flex flex-col ">
                <Header />Algunos productos
                <CardProduct products={filteredProducts} />
            </div>
            <div className="w-full h-[300px] overflow-hidden relative">
                <h1 className=" cursor-pointer text-black text-5xl font-extrabold text-center pt-20  uppercase tracking-wide transform transition duration-500 hover:scale-110 hover:text-rose-300">
                    Nuevas colecciones
                </h1>
            </div>
        </>
    );
}