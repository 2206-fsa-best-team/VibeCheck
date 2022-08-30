import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

const CheckConf = (props) => {
  const { allText, setJournal, setAllText, setModalLoading, journal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const onChange = (value) => {
    setValue(value);
  };
  let textStr = "";
  allText.pages.forEach((page) => {
    page.blocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        paragraph.words.forEach((word) => {
          if (word.confidence < 0.75 && word.symbols[0].text !== "*") {
            word.symbols.unshift({ text: "*" });
            word.symbols.push({ text: "*" });
          }
          const wordText = word.symbols.map((s) => s.text).join("");
          textStr += wordText + " ";
        });
      });
    });
  });
  setModalLoading(false)
  useEffect(() => {
    setValue(textStr);
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          please review the highlighted sections below to confirm accurate input
        </ModalHeader>
        <ModalBody pb={6}>
          words wrapped in *s are the most likely inaccuracies, correct any
          mistakes (or leave it be if it is right) and delete the *s so they
          don't show up in your journal!
          <Box borderWidth='1px' borderRadius='lg' p={2} mt={2}>
            <HighlightWithinTextarea
              value={value}
              highlight={"*"}
              onChange={onChange}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              setJournal({ ...journal, content: value });
              setAllText({});
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setAllText({});
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckConf;
