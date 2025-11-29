import Search from "./search";
import { getAllCategories } from "@/lib/actions/product.actions";

const SearchWrapper = async () => {
  const categories = await getAllCategories();

  // Serialize to plain objects to avoid symbol properties
  const plainCategories = JSON.parse(JSON.stringify(categories));

  return <Search categories={plainCategories} />;
};

export default SearchWrapper;