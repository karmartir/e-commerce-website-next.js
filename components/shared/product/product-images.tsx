"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[currentImage]}
        alt={`Product Image ${currentImage + 1}`}
        width={1000}
        height={1000}
        priority
        className="min-h-[300px] object-cover object-center"
        //onClick={() => setCurrentImage((currentImage + 1) % images.length)}
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrentImage(index)}
            className={cn(
              "border mr-2 cursor-pointer",
              currentImage === index && "border-orange-500"
            )}
          >
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
