import { Box, Grid, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useGetProductListQuery } from "../app/services/productsSlice";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { IProduct } from "../interfaces";
import { ProductGrid } from "../components/ui/ProductGrid";

const ProductsPage = () => {
  const { isLoading, data } = useGetProductListQuery(1);
  if (isLoading)
    return (
      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );

  return (
    <Box>
      {data.data && data.data.length === 0 ? (
        <Heading w="fit-content" mx="auto" textAlign="center">
          No Products Found
        </Heading>
      ) : (
        <ProductGrid p="0">
          {data.data.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </Box>
  );
};

export default ProductsPage;
