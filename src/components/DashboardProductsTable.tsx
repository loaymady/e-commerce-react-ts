import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  Flex,
  Td,
  Image,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { useGetProductListQuery } from "../app/services/productsSlice";
import TableSkeleton from "./TableSkeleton";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IProduct } from "../interfaces";

const DashboardProductsTable = () => {
  const { isLoading, data } = useGetProductListQuery(1);
  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
        <Button
          rightIcon={<AiOutlinePlus />}
          colorScheme="green"
          onClick={() => {}}
          ml={"auto"}
          w={"fit-content"}
        >
          Create
        </Button>
        <TableContainer
          border={"1px solid #2d3748"}
          rounded={"lg"}
          p={3}
          my={6}
        >
          <Table variant="simple">
            <TableCaption>Total Entries</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((product: IProduct) => (
                <Tr key={product.id}>
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {product?.attributes.category.data.map((category) => {
                      return category.attributes.title;
                    })}
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="40px"
                      src={`http://localhost:1337${product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`}
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                      onClick={() => {}}
                    >
                      <AiOutlineEye size={17} />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      mr={3}
                      onClick={() => {}}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {}}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default DashboardProductsTable;
