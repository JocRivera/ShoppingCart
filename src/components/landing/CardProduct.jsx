import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"

export default function CardProduct({ products }) {
    const { addToCart } = useCart()
    const handleAddToCart = (product) => {
        addToCart(product)
    }
    return (
        <div >
            <ul className="flex gap-4 flex-wrap justify-center">
                {products.map((product) => (
                    <li key={product.id}>
                        <Card className="w-80 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{product.title}</CardTitle>
                                <CardDescription
                                    className="h-12"
                                >{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={product.thumbnail} alt={product.title} />
                            </CardContent>
                            <CardFooter>
                                <p className="text-lg font-semibold">${product.price}</p>
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    variant="outline" className="ml-25">
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    )
}
