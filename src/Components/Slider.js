import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Highlight,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbFaceId } from "react-icons/tb";
import { useState } from "react";

function MoodSlider() {
  const [SliderValue, setSliderValue] = useState(50);
  const labelStyles = {
    mt: "2",
    ml: "-12",
    fontSize: "1em",
    textAlign: "center",
  };
  console.log(SliderValue);
  return (
    <Box pl={5} pr={5} pt={5}>
        <Highlight
          query="vibe"
          styles={{
            fontStyle: "italic",
            px: "2",
            py: "1",
            rounded: "full",
            bg: "teal.100",
            fontSize: "16",
          }}
        >
          What's your vibe like?
        </Highlight>
      <Slider
        aria-label="vibe-check-slider"
        onChangeEnd={(val) => setSliderValue(val)}
      >
        <SliderMark value={25} {...labelStyles}>
          pretty bad
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          pretty average
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
          pretty good
        </SliderMark>
        <SliderTrack bg="tomato">
          <SliderFilledTrack bg="teal.300" />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="tomato" as={TbFaceId} />
        </SliderThumb>
      </Slider>
    </Box>
  );
}

export default MoodSlider;
