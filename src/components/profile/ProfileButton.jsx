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
export default function ProfileButton() {
    const { logout } = useAuth()
    const handleLogout = () => {
        logout()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/149016549?s=400&u=dec0096a1f6918203580f4292f3d7bd910bde7e9&v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Pedidos</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleLogout}
                >Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}