import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <Button variant="outline" >Outline</Button>

        </div>
    );
}