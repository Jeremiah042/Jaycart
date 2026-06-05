import { Product } from "./shared/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./button";
import { ShoppingCartIcon } from "lucide-react";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.images[0].startsWith("http") ? product.images[0] : 
    `https://i.imgur.com/${product.images[0]}`;
  return (
       <Card key={product.id} className="p-0 flexflex-col justify-between">     
  <CardHeader>
    <Image src={imageUrl} alt={product.title} width={300} height={300}
     className="w-full h-full object-cover rounded-t-lg" />
<div>
    <CardTitle className="p-6">{product.title}</CardTitle>
</div>
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
    <CardDescription>{product.description.slice(0, 80)}</CardDescription>
  </CardContent>
  <CardFooter>
    <Button> 
        <ShoppingCartIcon className="size-4" />
        Add to Cart</Button>
  </CardFooter>
  </Card>
  )
}

