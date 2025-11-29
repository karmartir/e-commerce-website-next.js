import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerClose, DrawerDescription } from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();
  return (

    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="inline-flex items-center justify-center p-2 border rounded-md hover:bg-accent">
          <MenuIcon />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className='ms-4 mt-4'>
            SELECT A CATEGORY
          </DrawerTitle>
          <DrawerDescription className="ms-4 text-sm text-muted-foreground">
            Browse and select a category to filter products.
          </DrawerDescription>
          <ul className="list-disc ms-8 my-4 space-y-2">
            {categories.map((category) => (
              <li key={category.category} className="py-1">
                <DrawerClose asChild>
                  <Link href={`/search?category=${category.category}`}>
                    {category.category} ({category._count})
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>

  );

}

export default CategoryDrawer;