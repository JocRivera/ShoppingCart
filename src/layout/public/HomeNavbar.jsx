import { Button } from "@/components/ui/button"
import OpenCart from "@/components/landing/OpenCart";
import {  UserRound } from "lucide-react";
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">Logo</div>
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