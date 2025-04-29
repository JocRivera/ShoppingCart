import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCart } from "@/context/cart"
import { ShoppingCart, Plus, Minus } from "lucide-react";
function CartItem({ item }) {
    const { addToCart, removeFromCart, removeItemFromCart } = useCart()
    const handleAddToCart = (product) => {
        addToCart(product)
    }
    return (
        <>
            <div className="flex items-center justify-between p-2 ">
                <div className="flex items-center">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 mr-4" />
                    <div>
                        <h3 className="text-sm font-semibold">{item.tittle}</h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                    <button className="cursor-pointer" onClick={() => removeFromCart(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border-b border-gray-200 p-2 flex items-center justify-between ">
                <div className="flex items-center">
                    <Button size="s" onClick={() => handleAddToCart(item)} ><Plus size={48} strokeWidth={3} /></Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button size="s" className="bg-rose-500 " onClick={() => removeItemFromCart(item._id)}><Minus size={48} strokeWidth={3} /></Button>
                </div>
            </div >
        </>
    );
}

export default function OpenCart() {
    const { cart } = useCart()
    return (
        <Popover >
            <PopoverTrigger >
                <div className="relative">
                    <Button size="icon">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                    {cart.length > 0 && (
                        <div className="absolute -top-1 -right-1">
                            <span className="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Carrito</h2>
                    <div className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}   