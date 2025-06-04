import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserRound } from "lucide-react";
import { LoginForm } from "../login-form";
import { RegisterForm } from "../register-form";
import { useState } from "react";

export function OpenLogin() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <UserRound />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {showLogin ? (
                    <LoginForm toggleForm={() => setShowLogin(false)} />
                ) : (
                    <RegisterForm toggleForm={() => setShowLogin(true)} />
                )}
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}