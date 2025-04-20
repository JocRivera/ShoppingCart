import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCart } from "@/hooks/useCart"
import { ShoppingCart } from "lucide-react";

function CartItem({ item }) {
    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 mr-4" />
                <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                </div>
            </div>
        </div>
    );
}

export default function OpenCart() {
    const { cart } = useCart()
    return (
        <Popover >
            <PopoverTrigger >
                <Button size="icon">
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <div className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>

    );
}   