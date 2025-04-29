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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CardProduct({ products }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const { addToCart } = useCart()
    const handleAddToCart = (product) => {
        addToCart(product)
    }
    return (
        <div className="container mx-auto px-4 py-4">
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {products.map((product) => (
                    <Card
                        key={product._id}
                        className="w-full bg-black shadow-md hover:shadow-lg transition-shadow duration-300 mx-0"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white">
                                {product.tittle}
                            </CardTitle>
                            <CardDescription className="h-12">
                                {product.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                className="w-full h-65 object-contain rounded-md"
                                src={product.thumbnail || product.image}
                                alt={product.tittle}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <p className="text-lg font-semibold text-white">${product.price}</p>
                            <Button onClick={() => handleAddToCart(product)} variant="outline">
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </Carousel>
        </div>
    )
}
