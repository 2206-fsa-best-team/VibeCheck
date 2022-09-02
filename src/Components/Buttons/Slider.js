import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/slider";
import { Box, Highlight } from "@chakra-ui/react";
import { TbFaceId } from "react-icons/tb";
import { colorSelector } from "../Helpers/colorChanger";

function MoodSlider(props) {
  const { sliderValue, setSliderValue } = props;

  return (
    <Box p="16px">
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
        what's your vibe like?
      </Highlight>
      <Slider
        aria-label="vibe-check-slider"
        onChange={(val) => setSliderValue(val)}
        name="vibe"
        defaultValue={50}
      >
        <SliderTrack bg={"lightgray"}>
          <SliderFilledTrack bg={colorSelector(sliderValue).border} />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box /*color="tomato"*/ as={TbFaceId} />
        </SliderThumb>
      </Slider>
    </Box>
  );
}

export default MoodSlider;
