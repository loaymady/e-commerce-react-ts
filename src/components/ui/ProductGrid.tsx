import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { Children, isValidElement, useMemo } from "react";

export const ProductGrid = (props: SimpleGridProps) => {
  const columns = useMemo(() => {
    const count = Children.toArray(props.children).filter(
      isValidElement
    ).length;
    if (count === 1) {
      return {
        base: 1,
        md: 3,
        lg: 4,
      };
    }
    return {
      base: 2,
      md: 3,
      lg: 4,
    };
  }, [props.children]);

  return (
    <SimpleGrid
      columns={columns}
      columnGap={{ base: "4", md: "6" }}
      rowGap={{ base: "8", md: "10" }}
      {...props}
    />
  );
};
