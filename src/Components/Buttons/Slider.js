import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/slider";
import { Box, Text, HStack } from "@chakra-ui/react";
import { Tooltip, useColorModeValue } from "@chakra-ui/react";
import { colorSelector } from "../Helpers/colorChanger";
import { InfoOutlineIcon } from "@chakra-ui/icons";

function MoodSlider(props) {
  const { sliderValue, setSliderValue } = props;
  const sliderThumbColor = useColorModeValue("gray.200", "white");

  return (
    <Box p="8px" maxW="lg">
      <HStack justify={"left"} pb="8px">
        <Text fontSize={"24px"} pb="4px">
          how are you feeling?
        </Text>
        <Tooltip
          hasArrow
          label="use this slider below to record how you're feeling. to the right is more positive, to the left is more negative."
          fontSize="sm"
          placement="top"
        >
          <InfoOutlineIcon />
        </Tooltip>
      </HStack>
      <Slider
        aria-label="vibe-check-slider"
        onChange={(val) => setSliderValue(val)}
        name="vibe"
        defaultValue={50}
      >
        <SliderTrack bg={"lightgray"}>
          <SliderFilledTrack bg={colorSelector(sliderValue).border} />
        </SliderTrack>
        <SliderThumb boxSize={5} bg={sliderThumbColor} />
      </Slider>
    </Box>
  );
}

export default MoodSlider;
