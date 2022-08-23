import React, { useState, useEffect, createContext } from "react";
import { supabase } from "../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "./Slider";
import { Container, VStack, Stack, Button, Skeleton, Textarea, Text } from "@chakra-ui/react";

export const sliderContext = createContext();

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "", vibe: 0 });
  const { content, vibe } = moment;
  const [pageLoading, setPageLoading] = useState(false);
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const [sliderValue, setSliderValue] = useState(50);

  async function createMoment() {
    try {
      if (!content.length) {
        alert("Please write a short moment and choose a vibe!");
      } else {
        await supabase
          .from("moments")
          .insert({ content, vibe: sliderValue, user_id: user.id })
          .single();
        setMoment({ content: "", vibe: sliderValue });
        navigate("/moments");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    setPageLoading(true);
    console.log(moment);
    setPageLoading(false);
  }, [moment]);

  return (
    <>
    <Stack spacing={8}>
        {pageLoading ? (
          <>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </>
        ) : (
          <VStack w="36rem" bg="red">
            <Text mb='8px'>How is this moment?</Text>
            <Textarea
              value={content || ""}
              onChange={(evt) =>
                setMoment({ ...moment, content: evt.target.value })
              }
            />
            <MoodSlider
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              onChange={(evt) => setMoment({ ...moment, vibe: sliderValue })}
            />
            <Button onClick={createMoment}>Submit</Button>
          </VStack>
        )}
        </Stack>
    </>
  );
};
export default AddMoment;

// redux for getting the slider state
