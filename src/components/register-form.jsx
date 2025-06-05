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

export function RegisterForm({ className, toggleForm = () => { }, onSuccess = () => { }, ...props }) {
  const { signup, errors } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match")
      return
    }

    setPasswordError("")
    const response = await signup({ name, email, password })

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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-600 underline underline-offset-4">
                Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}