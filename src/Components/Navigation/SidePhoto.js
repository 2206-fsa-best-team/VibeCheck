import { Show, Image, Box, useColorModeValue } from "@chakra-ui/react";

const SidePhoto = () => {
  const photo = useColorModeValue("https://i.ibb.co/Q6JNRKg/light-mode.jpg", "https://i.ibb.co/sQ5S8zy/dark-mode.jpg")
  return (
    <Show above="xl">
      <Box mt="-16" right={0} zIndex={-2} w="20%" pos={"fixed"} X>
        <Image src={photo}></Image>
      </Box>
    </Show>
  );
};

export default SidePhoto;
