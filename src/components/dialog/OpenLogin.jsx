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
export function OpenLogin() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <UserRound />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <LoginForm />
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
