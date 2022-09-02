import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

const DeleteModal = (props) => {
  const { location, isOpen, onClose, handleDelete } = props;

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>delete this {location}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            you are about to delete this {location}. this cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            nevermind
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            mr={3}
            onClick={() => {
              onClose();
              handleDelete();
            }}
          >
            delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
