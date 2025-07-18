import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth"
import { useState } from "react"

export function LoginForm({ className, toggleForm = () => { }, onSuccess = () => { }, ...props }) {
  const { signin, errors } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signin({ email, password })

    // Close the dialog if login was successful
    if (response && response.token) {
      onSuccess(); // Cierra el modal
      setTimeout(() => {
        window.location.reload(); // Recarga la página después de un breve retraso
      }, 100);
    }
  }

  return (
    (<div className={cn("flex flex-col gap-7", className)} {...props}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-600 underline underline-offset-4">
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}