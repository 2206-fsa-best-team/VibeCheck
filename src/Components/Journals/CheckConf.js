/* eslint-disable no-useless-escape */
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

// Due to an error with deployment stemming from the "react-highlight-within-textarea"
// npm package, as well as the deprication of the Google Cloud Vision OCR feature,
// we have decided to comment out all code using the "react-highlight-within-textarea" 
// npm package. Comments below should help explain what features have been removed.

// import { HighlightWithinTextarea } from "react-highlight-within-textarea";

const CheckConf = (props) => {
  const { allText, setJournal, setAllText, setModalLoading, journal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  // this function would update the text entry when a user modified the text in 
  // highlighted text area
  // const onChange = (value) => {
  //   setValue(value);
  // };
  let textStr = "";
  allText.pages.forEach((page) => {
    page.blocks.forEach((block) => {
      block.paragraphs.forEach((paragraph) => {
        paragraph.words.forEach((word) => {
          if (word.confidence < 0.85 && word.symbols[0].text !== "*") {
            word.symbols.unshift({ text: "*" });
            word.symbols.push({ text: "*" });
          }
          const wordText = word.symbols.map((s) => s.text).join("");
          if (wordText.match(/[!?,\.%]/)) {
            textStr = textStr.slice(0, -1);
            textStr += wordText + " ";
          } else if (wordText.match(/[-\(\)@']/)) {
            textStr = textStr.slice(0, -1);
            textStr += wordText;
          } else if (wordText.match(/[~$]/)) {
            textStr += wordText;
          } else {
            textStr += wordText + " ";
          }
        });
      });
    });
  });
  setModalLoading(false);
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
          <Box borderWidth="1px" borderRadius="lg" p={2} mt={2}>
            {/* 
            This was the text area that would highlight low confidence words
            as selected by the above ForEach loops.
            <HighlightWithinTextarea
              value={value}
              highlight={"*"}
              onChange={onChange}
            /> */}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              setJournal({ ...journal, content: journal.content + value });
              setAllText({});
              onClose();
            }}
            aria-label="save button"
          >
            save
          </Button>
          <Button
            onClick={() => {
              setAllText({});
              onClose();
            }}
            aria-label="cancel button"
          >
            cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckConf;
