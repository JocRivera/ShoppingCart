import OpenCart from "@/components/landing/OpenCart";
import { Gem } from "lucide-react";
import { useAuth } from "../../context/auth.jsx";
import { OpenLogin } from "@/components/dialog/OpenLogin";
import ProfileButton from "@/components/profile/ProfileButton";
export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const renderAuth = () => {
        if (isAuthenticated && user) {
            switch (user.role) {
                case 'admin':
                    return <ProfileButton />;
                case 'user':
                    return (
                        <>
                            <ProfileButton />
                            <OpenCart />
                        </>
                    )
                default:
                    return null;
            }
        }
        else {
            return <OpenLogin />;
        }
    }

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
                            <a className="text-gray-700 hover:text-gray-900" href="all">Todos los productos</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className="text-gray-700 hover:text-gray-900" href="collections">Colecciónes</a>
                        </li>
                    </ul>
                </div>
                <ul className="flex space-x-4">
                    {renderAuth()}
                </ul>
            </div>
        </nav>
    );
}