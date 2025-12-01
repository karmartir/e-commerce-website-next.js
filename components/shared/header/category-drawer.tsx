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
          <DrawerDescription className="ms-4 mb-4 text-sm text-muted-foreground">
            Browse and select a category to filter products.
          </DrawerDescription>
          <hr className="border-t border-gray-300 dark:border-gray-700 my-2" />
          {categories.map((category) => (
            <DrawerClose key={category.category} asChild>
              <div className="mt-2 ms-4">
              <Link
                href={`/search?category=${category.category}`}
                className="block w-full px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-accent-foreground/20 dark:hover:text-accent-foreground transition-colors duration-200"
              >
                {category.category} ({category._count})
              </Link>
                </div>
            </DrawerClose>
          ))}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>

  );
}

export default CategoryDrawer;