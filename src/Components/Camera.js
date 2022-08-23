import React from "react";
import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Text } from "@chakra-ui/react";

const Cam = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <div>
      <Box maxW="450px" mx={10}>
      <Text py="10px" ml="8px" fontSize="32px" fontStyle="italic">
        snap a pic!
      </Text>
        {image === null ? (
          <>
            <Camera ref={camera} aspectRatio={8.5 / 11} />
            <Button
              onClick={() => setImage(camera.current.takePhoto())}
              colorScheme="teal"
            >
              <Text color="black">take photo</Text>
            </Button>
          </>
        ) : (
          <>
            <img src={image} alt="Taken" />
            <Button onClick={() => setImage(null)} colorScheme={"teal"}>
              <Text color="black">take another photo</Text>
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cam;
