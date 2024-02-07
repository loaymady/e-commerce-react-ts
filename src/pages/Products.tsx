import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useGetProductListQuery } from "../app/services/productsSlice";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { IProduct } from "../interfaces";

const ProductsPage = () => {
  const { isLoading, data } = useGetProductListQuery({});
  if (isLoading)
    return (
      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );
  return (
    <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {data.data.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
