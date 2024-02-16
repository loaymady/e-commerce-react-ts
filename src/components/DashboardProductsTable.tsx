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
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import {
  useCreateDashboardProductsMutation,
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
import { useState } from "react";
import CustomModal from "../shared/Modal";
import { IntitalProduct } from "../data";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const DashboardProductsTable: React.FC = () => {
  const toast = useToast();
  const { isOnline } = useSelector(selectNetwork);
  const { isLoading, data } = useGetProductListQuery(1);
  //for CustomAlertDialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  //for edit CustomModal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  //for create CustomModal
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const [clickedProductId, setClickedProductId] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct>(IntitalProduct);
  const [productToCreate, setProductToCreate] =
    useState<IProduct>(IntitalProduct);
  const [destroyProduct, { isLoading: isDestroying }] =
    useDeleteDashboardProductsMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateDashboardProductsMutation();
  const [createProduct, { isLoading: isCreating }] =
    useCreateDashboardProductsMutation();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(5.0, "Price must be greater than 4.99"),
    stock: Yup.number()
      .required("Stock is required")
      .min(1, "Stock must be greater than 0"),
  });

  /** --------- EDITING --------- */
  const openEditModal = (product: IProduct) => {
    setClickedProductId(product.id);
    setProductToEdit(product);
    onModalOpen();
  };

  const formikUpdate = useFormik({
    initialValues: {
      title: productToEdit?.attributes?.title,
      description: productToEdit?.attributes?.description,
      price: productToEdit?.attributes?.price,
      stock: productToEdit?.attributes?.stock,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append(
        "data",
        JSON.stringify({
          title: values.title,
          description: values.description,
          price: values.price,
          stock: values.stock,
        })
      );

      if (thumbnail) {
        data.append("files.thumbnail", thumbnail, thumbnail.name);
      } else {
        data.append("files.thumbnail", "");
      }

      const result = await updateProduct({
        id: clickedProductId,
        body: data,
      });

      if ("error" in result) {
        toast({
          title: "Uh oh something bad happened!",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      } else {
        setProductToEdit(IntitalProduct);
        onModalClose();
        toast({
          title: `Product Updated Successfully!`,
          status: "info",
          isClosable: true,
          duration: 2000,
        });
      }
    },
  });
  /**\\ --------- EDITING --------- \\*/

  /** --------- CREATING --------- */
  const formikCreate = useFormik({
    initialValues: {
      title: productToCreate?.attributes?.title,
      description: productToCreate?.attributes?.description,
      price: productToCreate?.attributes?.price,
      stock: productToCreate?.attributes?.stock,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append(
        "data",
        JSON.stringify({
          title: values.title,
          description: values.description,
          price: values.price,
          stock: values.stock,
        })
      );

      if (thumbnail) {
        data.append("files.thumbnail", thumbnail, thumbnail.name);
      } else {
        toast({
          title: "Thumbnail is required!",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
        return;
      }
      const result = await createProduct(data);
      if ("error" in result) {
        toast({
          title: "Uh oh something bad happened!",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      } else {
        setProductToCreate(IntitalProduct);
        onCreateModalClose();
        toast({
          title: `Product Created Successfully!`,
          status: "success",
          isClosable: true,
          duration: 2000,
        });
      }
    },
  });
  /**\\ --------- CREATING --------- \\*/

  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  if (isLoading || !isOnline) return <TableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
        <Button
          rightIcon={<AiOutlinePlus />}
          colorScheme="green"
          onClick={onCreateModalOpen}
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
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="40px"
                      src={
                        product?.attributes?.thumbnail?.data?.attributes
                          ?.formats?.thumbnail?.url
                      }
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price.toFixed(2)}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
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
                        openEditModal(product);
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
        onOkHandler={async () => {
          const result = await destroyProduct(clickedProductId);
          if ("error" in result) {
            toast({
              title: "Uh oh something bad happened!",
              status: "error",
              isClosable: true,
              duration: 2000,
            });
          } else {
            setClickedProductId(0);
            onClose();
            toast({
              title: `Product Deleted Successfully!`,
              status: "error",
              isClosable: true,
              duration: 2000,
            });
          }
        }}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          onModalClose();
          setProductToEdit(IntitalProduct);
        }}
        title={"Update Product"}
        okTxt="Update"
        cancelTxt="Cancel"
        onOkClick={formikUpdate.handleSubmit}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            placeholder="Product Title"
            id="title"
            {...formikUpdate.getFieldProps("title")}
          />
          {formikUpdate.touched.title && formikUpdate.errors.title && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikUpdate.errors.title}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl my={3}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            id="description"
            {...formikUpdate.getFieldProps("description")}
          />
          {formikUpdate.touched.description &&
            formikUpdate.errors.description && (
              <FormHelperText color="red.500" fontWeight="500">
                {formikUpdate.errors.description}
              </FormHelperText>
            )}
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput
            id="price"
            value={formikUpdate.values.price}
            onChange={(valueNumber) =>
              formikUpdate.setFieldValue("price", valueNumber)
            }
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {formikUpdate.touched.price && formikUpdate.errors.price && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikUpdate.errors.price}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl my={3}>
          <FormLabel htmlFor="stock">Count in Stock</FormLabel>
          <NumberInput
            id="stock"
            value={formikUpdate.values.stock}
            onChange={(valueNumber) =>
              formikUpdate.setFieldValue("stock", valueNumber)
            }
          >
            <NumberInputField />
          </NumberInput>
          {formikUpdate.touched.stock && formikUpdate.errors.stock && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikUpdate.errors.stock}
            </FormHelperText>
          )}
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

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setProductToCreate(IntitalProduct);
          onCreateModalClose();
        }}
        title={"Create Product"}
        okTxt="Create"
        onOkClick={formikCreate.handleSubmit}
        isLoading={isCreating}
      >
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            placeholder="Product Title"
            id="title"
            {...formikCreate.getFieldProps("title")}
          />
          {formikCreate.touched.title && formikCreate.errors.title && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikCreate.errors.title}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl my={3}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            id="description"
            {...formikCreate.getFieldProps("description")}
          />
          {formikCreate.touched.description &&
            formikCreate.errors.description && (
              <FormHelperText color="red.500" fontWeight="500">
                {formikCreate.errors.description}
              </FormHelperText>
            )}
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput
            id="price"
            value={formikCreate.values.price}
            onChange={(valueNumber) =>
              formikCreate.setFieldValue("price", valueNumber)
            }
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {formikCreate.touched.price && formikCreate.errors.price && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikCreate.errors.price}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl my={3}>
          <FormLabel htmlFor="stock">Count in Stock</FormLabel>
          <NumberInput
            id="stock"
            value={formikCreate.values.stock}
            onChange={(valueNumber) =>
              formikCreate.setFieldValue("stock", valueNumber)
            }
          >
            <NumberInputField />
          </NumberInput>
          {formikCreate.touched.stock && formikCreate.errors.stock && (
            <FormHelperText color="red.500" fontWeight="500">
              {formikCreate.errors.stock}
            </FormHelperText>
          )}
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
