import React, { useState } from "react";
import { supabase } from "../../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "../Buttons/Slider";
import {
  Stack,
  Button,
  Textarea,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "" });
  const [count, setCount] = useState(moment.content.length);
  const { content } = moment;
  const [submitLoading, setSubmitLoading] = useState(false);
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const [sliderValue, setSliderValue] = useState(50);
  const handleChange = (evt) => {
    setCount(evt.target.value.length);
  };

  async function createMoment() {
    setSubmitLoading(true);
    try {
      if (!content.length) {
        alert("add your moment");
      } else {
        const d = new Date();
        d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
        await supabase
          .from("moments")
          .insert({
            content,
            vibe: sliderValue,
            user_id: user.id,
            created_at: d,
          })
          .single();
        setMoment({ content: "" });
        navigate("/moments");
      }
      setSubmitLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
      throw error;
    }
  }

  return (
    <>
      <Stack px="24px" display="flex" maxW="xl">
        <Text pb="16px" mt="32px" ml="8px" fontSize={"24px"}>
          what's going on?
        </Text>
        <Textarea
          resize={"none"}
          placeholder="write about your moment here"
          value={content}
          onChange={(evt) => {
            setMoment({ ...moment, content: evt.target.value });
            handleChange(evt);
          }}
          maxLength={260}
          as={TextareaAutosize}
        />
        <Text fontSize="0.75rem" color="gray" w="100%" align="right" pr="16px">
          {count}/260
        </Text>
        <MoodSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
        {submitLoading ? (
          <CircularProgress isIndeterminate size="1.75rem" align="center" />
        ) : (
          <>
            <Button onClick={createMoment}>add moment</Button>
            <Button variant="outline" onClick={() => navigate("/moments")}>
              cancel
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};
export default AddMoment;

// redux for getting the slider state
