/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Flex,
  createStandaloneToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import {
  useDeleteDashboardProductsMutation,
  useGetProductListQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/productsSlice";
import TableSkeleton from "./TableSkeleton";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IProduct } from "../interfaces";
import CustomAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/Modal";
import { IntitalProduct } from "../data";

const { toast } = createStandaloneToast();

const DashboardProductsTable: React.FC = () => {
  const { isLoading, data } = useGetProductListQuery(1);
  //for CustomAlertDialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  //for CustomModal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductsMutation();
  const [clickedProductId, setClickedProductId] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct>(IntitalProduct);

  /** --------- EDITING --------- */
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit.attributes,
        [name]: value,
      },
    });
  };

  const onChangePriceHandler = (value: string | number) =>
    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit.attributes,
        price: +value,
      },
    });
  const onChangeStockHandler = (value: string | number) =>
    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit.attributes,
        stock: +value,
      },
    });

  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.attributes.title,
        description: productToEdit.attributes.description,
        price: productToEdit.attributes.price,
        stock: productToEdit.attributes.stock,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    updateProduct({ id: clickedProductId, body: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(0);
      onClose();
      toast({
        title: `Product Deleted Successfully!`,
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }
    if (isUpdatingSuccess) {
      setClickedProductId(0);
      setProductToEdit(IntitalProduct);
      onModalClose();
      toast({
        title: `Product Updated Successfully!`,
        status: "info",
        isClosable: true,
        duration: 2000,
      });
    }
  }, [isSuccess, isUpdatingSuccess]);

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
            <TableCaption>
              Total Entries : {data ? data.data.length : 0}
            </TableCaption>
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
              {data?.data?.map((product: IProduct, idx: number) => (
                <Tr key={product.id}>
                  <Td>{idx + 1}</Td>
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
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product.id);
                        setProductToEdit(product);
                        onModalOpen();
                      }}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description={
          "Do you really want to destroy this product? This product cannot be undone."
        }
        okTxt="Destroy"
        isLoading={isDestroying}
        onOkHandler={() => destroyProduct(clickedProductId)}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Product"}
        okTxt="Update"
        cancelTxt="Cancel"
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            my={3}
            placeholder="Product Title"
            name="title"
            value={productToEdit?.attributes?.title}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToEdit?.attributes?.description}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToEdit?.attributes?.price}
            onChange={onChangePriceHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            name="stock"
            defaultValue={productToEdit?.attributes?.stock}
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
