import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  // Fetch latest products from the database via product.actions
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="New Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
