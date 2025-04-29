import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../context/auth.jsx"
import { useCart } from "@/context/cart.jsx"
export default function ProfileButton() {
    const { clearCart } = useCart()
    const { logout } = useAuth()
    const handleLogout = () => {
        logout()
        clearCart()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="ring-2 ring-green-500 ring-offset-[2px] ring-offset-background">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/149016549?s=400&u=dec0096a1f6918203580f4292f3d7bd910bde7e9&v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Pedidos</DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer hover:text-destructive hover:bg-destructive/10 "
                    onClick={handleLogout}
                >Salir</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}