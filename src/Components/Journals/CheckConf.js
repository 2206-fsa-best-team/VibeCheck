import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

const CheckConf = (props) => {
  const { allText, setJournal, setAllText } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const onChange = (value) => {
    setValue(value);
  };
  let lowConf = [];
  allText.pages.forEach((page) => {
    page.blocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        paragraph.words.forEach((word) => {
          const wordText = word.symbols.map((s) => s.text).join("");
          if (word.confidence < 0.75) {
            lowConf.push("*" + wordText + "*");
            // TO BE IMPLEMENTED
            // instead of push all the low conf words to an array, wrap them in *s
            // and make the highlighter look for *s that way the user can delete the stars
            // and the highlighting will go away

            // probably need to do some fancier stuff in the forEach loops above
            // see line 28 for inspo
          }
          // console.log(`Word text: ${wordText}`);
          // console.log(`Word confidence: ${word.confidence}`);
        });
      });
    });
  });

  useEffect(() => {
    setValue(allText.text);
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  console.log("running");
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
          <HighlightWithinTextarea
            value={value}
            highlight={"*"}
            onChange={onChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              console.log("value: ", value);
              setJournal(value);
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
