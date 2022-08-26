import React from "react";
import { useState } from "react";
import { supabase } from "../../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  CircularProgress,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import MoodSlider from "../Buttons/Slider";

const AddJournal = () => {
  let todayUtc = new Date();
  const offset = todayUtc.getTimezoneOffset();
  todayUtc = new Date(todayUtc.getTime() - offset * 60 * 1000);
  const today = todayUtc.toISOString().split("T")[0];
  const [sliderValue, setSliderValue] = useState(50);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [journal, setJournal] = useState({
    content: "",
    date: today,
  });
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
    <Stack spacing={5} px="24px" display="flex">
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
    </Stack>
  );
};

export default AddJournal;
