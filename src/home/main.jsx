import CardProduct from "@/components/landing/CardProduct";
import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import ProductService from "@/services/product/fetch";
import { useEffect } from "react";
export default function Home() {
    const [products, setProducts] = useState([]);
    const { filters, filterProducts } = useFilters();
    const productService = new ProductService();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = filterProducts(products);

    return (
        <>
            <div className="w-full h-[300px] overflow-hidden bg-black relative">
                <h1 className=" cursor-pointer text-white text-5xl font-extrabold text-center pt-20 shadow-2xl uppercase tracking-wide transform transition duration-500 hover:scale-110 hover:text-yellow-400">
                    Compra ahora
                </h1>
            </div>
            <div className="mt-4 px-4 flex flex-col ">
                {/* <Header /> */}
                <h1 className="  text-3xl font-light text-start">
                    Productos destacados
                </h1>
                <CardProduct products={filteredProducts} />
            </div>
            {/* <div className="w-full h-[300px] overflow-hidden relative">
                <h1 className=" cursor-pointer text-black text-5xl font-extrabold text-center pt-20  uppercase tracking-wide transform transition duration-500 hover:scale-110 hover:text-rose-300">
                    Nuevas colecciones
                </h1>
            </div> */}
        </>
    );
}