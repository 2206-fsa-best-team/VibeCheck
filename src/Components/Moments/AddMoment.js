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

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "" });
  const { content } = moment;
  const [submitLoading, setSubmitLoading] = useState(false);
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const [sliderValue, setSliderValue] = useState(50);

  async function createMoment() {
    setSubmitLoading(true);
    try {
      if (!content.length) {
        alert("write about your moment");
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
      <Stack spacing={10} px="24px" display="flex">
        <Text mt="32px" ml="8px" fontSize={"24px"}>
          how's your moment?
        </Text>
        <Textarea
          resize={"none"}
          placeholder="write about your moment here"
          value={content}
          onChange={(evt) =>
            setMoment({ ...moment, content: evt.target.value })
          }
        />
        <MoodSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
        {submitLoading ? (
          <CircularProgress
            isIndeterminate
            size="1.75rem"
            color="tomato"
            align="center"
          />
        ) : (
          <>
            <Button onClick={createMoment} colorScheme="teal">
              add this moment
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};
export default AddMoment;

// redux for getting the slider state
