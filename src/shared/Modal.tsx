/* eslint-disable react-refresh/only-export-components */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOkClick: () => void;
  title: string;
  okTxt: string;
  cancelTxt?: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  cancelTxt = "Cancel",
  okTxt,
  children,
  isLoading,
  onOkClick,
}: IProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.500"
        backdropFilter="blur(5px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button
            // colorScheme="blue"
            onClick={onOkClick}
            colorScheme={okTxt === "Create" ? "green" : "blue"}
            isLoading={isLoading}
          >
            {okTxt}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(CustomModal);
