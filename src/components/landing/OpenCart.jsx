import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ShoppingCart } from "lucide-react";
export default function OpenCart() {
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
                    <p className="text-sm text-gray-500">Your cart is empty.</p>
                </div>
            </PopoverContent>
        </Popover>

    );
}   