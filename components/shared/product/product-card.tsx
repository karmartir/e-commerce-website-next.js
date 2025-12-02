import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm h-full flex flex-col">
      <CardHeader className="p-0 flex justify-center items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            width={300}
            height={400}
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-cover"
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4 flex-1">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
         <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice
              value={Number(product.price)}
              className="text-muted-foreground"
            />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
