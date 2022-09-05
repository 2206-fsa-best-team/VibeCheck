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
  Show,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import MoodSlider from "../Buttons/Slider";
import CheckConf from "./CheckConf";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

const AddJournal = () => {
  let todayUtc = new Date();
  const offset = todayUtc.getTimezoneOffset();
  todayUtc = new Date(todayUtc.getTime() - offset * 60 * 1000);
  const today = todayUtc.toISOString().split("T")[0];
  const [sliderValue, setSliderValue] = useState(50);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [journal, setJournal] = useState({
    content: "",
    date: today,
  });
  const [allText, setAllText] = useState({});
  const [showCamera, setShowCamera] = useState(false);
  const { content, date } = journal;
  let navigate = useNavigate();
  const user = supabase.auth.user();

  async function createJournal() {
    setSubmitLoading(true);
    try {
      if (!content.length) {
        alert("write your journal entry");
      } else {
        const { data } = await axios.put("/journals", { content });
        await supabase
          .from("journals")
          .insert({
            content,
            vibe: sliderValue,
            date,
            user_id: user.id,
            sentiment: data.hundredSent,
          })
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

  const placeholderText = useBreakpointValue({
    base: "write your journal entry here or snap a pic of a handwritten page",
    sm: "write your journal entry here or snap a pic of a handwritten page using your mobile device",
  });

  return (
    <Stack px="24px" display="flex" maxW="3xl">
      {/* date input */}
      <Text mt="32px" ml="8px" fontSize={["20px", "24px"]}>
        date:
      </Text>
      <Input
        type="date"
        aria-label="date field"
        value={date}
        max={today}
        onChange={(evt) => setJournal({ ...journal, date: evt.target.value })}
      />
      {/* content input */}
      <HStack alignItems={"center"} mt="32px" pt="16px" ml="8px">
        <Text ml="8px" fontSize={["20px", "24px"]}>
          your journal entry:
        </Text>
        <Show below="lg">
          <IconButton
            variant={showCamera ? "solid" : "outline"}
            size="md"
            onClick={() => setShowCamera(!showCamera)}
            aria-label="toggle camera button"
            icon={<AiOutlineCamera />}
          ></IconButton>
        </Show>
      </HStack>
      {showCamera ? (
        <>
          <Cam
            setAllText={setAllText}
            setModalLoading={setModalLoading}
            modalLoading={modalLoading}
            value={content}
          />
          <br />
        </>
      ) : null}
      <Textarea
        value={content}
        onChange={(evt) =>
          setJournal({ ...journal, content: evt.target.value })
        }
        resize="none"
        placeholder={placeholderText}
        aria-label="journal entry input field"
        size="lg"
        as={TextareaAutosize}
      />

      {/* modal popup */}
      {allText.text ? (
        <CheckConf
          allText={allText}
          setJournal={setJournal}
          setAllText={setAllText}
          setModalLoading={setModalLoading}
          journal={journal}
        />
      ) : (
        <></>
      )}

      {/* vibe input */}
      <MoodSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
      {/* submit button */}
      {submitLoading ? (
        <CircularProgress isIndeterminate size="1.75rem" />
      ) : (
        <>
          <Button
            maxW="lg"
            onClick={createJournal}
            aria-label="add journal entry button"
          >
            add entry
          </Button>
          <Button
            maxW="lg"
            variant="outline"
            onClick={() => navigate("/journals")}
          >
            cancel
          </Button>
        </>
      )}
    </Stack>
  );
};

export default AddJournal;
