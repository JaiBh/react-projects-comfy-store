import Filters from "../components/Filters";
import PaginationContainer from "../components/PaginationContainer";
import ProductsContainer from "../components/ProductsContainer";
import { customFetch } from "../utils";

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? "false",
      page ?? 1,
    ],
    queryFn: () => customFetch("/products", { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data: resp } = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const { data: products, meta } = resp;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters></Filters>
      <ProductsContainer></ProductsContainer>
      <PaginationContainer></PaginationContainer>
    </>
  );
};
export default Products;
