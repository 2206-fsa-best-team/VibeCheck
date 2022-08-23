import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/slider";
import { Box, Highlight, Show } from "@chakra-ui/react";
import { TbFaceId } from "react-icons/tb";

function MoodSlider(props) {
  const {sliderValue, setSliderValue} = props

  const smallLabelStyles = {
    mt: "2",
    ml: "-5",
    fontSize: "1em",
    textAlign: "center",
  };
  const largeLabelStyles = {
    mt: "2",
    ml: "-10",
    fontSize: "1em",
    textAlign: "center",
  };

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
        name="vibe"
        defaultValue={50}
      >
        <Show above="769px">
          <SliderMark value={25} {...largeLabelStyles}>
            pretty bad
          </SliderMark>
          <SliderMark value={50} {...largeLabelStyles}>
            pretty avg
          </SliderMark>
          <SliderMark value={75} {...largeLabelStyles}>
            pretty good
          </SliderMark>
        </Show>
        <Show below="768px">
          <SliderMark value={25} {...smallLabelStyles}>
            p bad
          </SliderMark>
          <SliderMark value={50} {...smallLabelStyles}>
            p avg
          </SliderMark>
          <SliderMark value={75} {...smallLabelStyles}>
            p good
          </SliderMark>
        </Show>
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
