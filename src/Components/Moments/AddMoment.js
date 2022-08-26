import React, { useState, createContext } from "react";
import { supabase } from "../../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "../Buttons/Slider";
import {
  Stack,
  Button,
  Textarea,
  Text,
  Spinner,
} from "@chakra-ui/react";

export const sliderContext = createContext();

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
        await supabase
          .from("moments")
          .insert({ content, vibe: sliderValue, user_id: user.id })
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
      <Stack spacing={10} ml="24px" mr="24px" display="flex" maxW="600px">
        <Text mt="32px" ml="8px" fontSize={"24px"}>
          How's your moment?
        </Text>
        <Textarea
          resize={"none"}
          placeholder="Feeling some positive vibes"
          value={content || ""}
          onChange={(evt) =>
            setMoment({ ...moment, content: evt.target.value })
          }
        />
        <MoodSlider
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
        {submitLoading ? (
          <Spinner size="md" alignSelf={"center"} colorScheme="tomato" />
        ) : (
          <>
            <Button onClick={createMoment}>Add your moment</Button>
          </>
        )}
      </Stack>
    </>
  );
};
export default AddMoment;

// redux for getting the slider state
