import { Button } from "@/components/ui/button"
import OpenCart from "@/components/landing/OpenCart";
import { UserRound } from "lucide-react";
import { Gem } from "lucide-react";
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4 ">
                    <Gem size={48} strokeWidth={0.5} />
                    <div className="text-xl font-bold ">Tienda</div>
                </div>
                <div className="flex space-x-4 ">
                    <ul>
                        <li>
                            <a className="text-gray-700 hover:text-gray-900" href="colecctions">Todos los productos</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className="text-gray-700 hover:text-gray-900" href="colecctions">Colecciónes</a>
                        </li>
                    </ul>
                </div>
                <ul className="flex space-x-4">
                    <Button variant="outline" size="icon">
                        <UserRound />
                    </Button>
                    <OpenCart />
                </ul>
            </div>
        </nav>
    );
}