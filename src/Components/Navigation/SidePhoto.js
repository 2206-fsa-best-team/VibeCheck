import { Show, Image, Box } from "@chakra-ui/react";

const SidePhoto = () => {
  return (
    <Show above="lg">
      <Box
        mt="-16"
        right={0}
        pos={"fixed"}
        borderLeft={"1px"}
        borderColor={"gray.700"}
      >
        <Image src="https://i.ibb.co/FqbjLw6/dark-banner-2.png"></Image>
      </Box>
    </Show>
  );
};

export default SidePhoto;
