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
} from "@chakra-ui/react";
import MoodSlider from "../Buttons/Slider";
import CheckConf from "./CheckConf";
import TextareaAutosize from "react-textarea-autosize";

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

  return (
    <Stack px="24px" display="flex" maxW="xl">
      <Show below="lg">
        {showCamera ? (
          <>
            <Cam
              setAllText={setAllText}
              setModalLoading={setModalLoading}
              modalLoading={modalLoading}
            />
            <Text pt="16px" ml="8px" fontSize={"24px"}>
              change your mind?
            </Text>
            <Button
              onClick={() => setShowCamera(false)}
              colorScheme="teal"
              variant="outline"
              aria-label="close camera button"
            >
              close camera
            </Button>
          </>
        ) : (
          <>
            <Text ml="8px" fontSize={"24px"}>
              have a hand-written journal entry you want to add?
            </Text>
            <Button
              onClick={() => setShowCamera(true)}
              variant="outline"
              colorScheme={"teal"}
              aria-label="open camera button"
            >
              open camera
            </Button>
          </>
        )}
      </Show>
      {/* date input */}
      <Text mt="32px" ml="8px" fontSize={"24px"}>
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
      <Text mt="32px" pt="16px" ml="8px" fontSize={"24px"}>
        what's going on?
      </Text>
      <Textarea
        value={content}
        onChange={(evt) =>
          setJournal({ ...journal, content: evt.target.value })
        }
        resize="none"
        placeholder="write your journal entry here"
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
        <CircularProgress isIndeterminate size="1.75rem" bg="teal" />
      ) : (
        <>
          <Button
            onClick={createJournal}
            colorScheme="teal"
            aria-label="add journal entry button"
          >
            add this journal entry!
          </Button>
          <Button variant="ghost" onClick={() => navigate("/journals")}>
            nevermind
          </Button>
        </>
      )}
    </Stack>
  );
};

export default AddJournal;
