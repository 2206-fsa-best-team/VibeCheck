import React from "react";
import { useState } from "react";
import { supabase } from "../../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import Cam from "../Camera";
import {
  Button,
  Input,
  CircularProgress,
  Stack,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Highlight,
} from "@chakra-ui/react";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import MoodSlider from "../Buttons/Slider";

const AddJournal = () => {
  let todayUtc = new Date();
  const offset = todayUtc.getTimezoneOffset();
  todayUtc = new Date(todayUtc.getTime() - offset * 60 * 1000);
  const today = todayUtc.toISOString().split("T")[0];
  const [sliderValue, setSliderValue] = useState(50);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value, setValue] = React.useState("");
  const [journal, setJournal] = useState({
    content: "",
    date: today,
  });
  const { content, date } = journal;
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function createJournal() {
    setSubmitLoading(true);
    try {
      if (!content.length) {
        alert("write your journal entry");
      } else {
        await supabase
          .from("journals")
          .insert({ content, vibe: sliderValue, date, user_id: user.id })
          .single();
        setJournal({ content: "", date: today });
        navigate("/journals");
      }
      setSubmitLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
      throw error;
    }
  }

  const CheckConf = (all) => {
    const onChange = (value) => setValue(value);
    let lowConf = [];
    all.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        block.paragraphs.forEach((paragraph) => {
          paragraph.words.forEach((word) => {
            const wordText = word.symbols.map((s) => s.text).join("");
            if (word.confidence < 0.75) {
              lowConf.push(wordText);
            }
            // console.log(`Word text: ${wordText}`);
            // console.log(`Word confidence: ${word.confidence}`);
          });
        });
      });
    });
    onOpen();
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
            please review the highlighted sections below to confirm accurate
            input
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HighlightWithinTextarea
              value={value}
              highlight={lowConf}
              onChange={onChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={setJournal(value)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Stack spacing={5} px="24px" display="flex">
      {/* date input */}
      <Text mt="32px" ml="8px" fontSize={"24px"}>
        date:
      </Text>
      <Input
        type="date"
        value={date}
        max={today}
        onChange={(evt) => setJournal({ ...journal, date: evt.target.value })}
      />
      {/* content input */}
      <Text mt="32px" ml="8px" fontSize={"24px"}>
        what's going on?
      </Text>
      <Textarea
        value={content}
        onChange={(evt) =>
          setJournal({ ...journal, content: evt.target.value })
        }
        resize="vertical"
        placeholder="write your journal here"
        size="lg"
      />
      {/* vibe input */}
      <MoodSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
      <div>{/* spacing div */}</div>
      {submitLoading ? (
        <CircularProgress isIndeterminate size="1.75rem" color="tomato" />
      ) : (
        <>
          <Button onClick={createJournal} colorScheme="teal">
            add this journal
          </Button>
        </>
      )}
      <Cam
        setJournal={setJournal}
        CheckConf={CheckConf}
        setValue={setValue}
        today={today}
      />
    </Stack>
  );
};

export default AddJournal;
