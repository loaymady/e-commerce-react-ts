import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  okTxt: string;
  isLoading: boolean;
  onOkHandler: () => void;
}

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  okTxt,
  isLoading,
  onOkHandler,
}: IProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              isLoading={isLoading}
              onClick={() => {
                onOkHandler();
              }}
            >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
