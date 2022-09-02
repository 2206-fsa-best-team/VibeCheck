import { Container, Image, Box } from "@chakra-ui/react";

const SidePhoto = () => {
  return (
    <Container>
      <Box right={0} pos={"fixed"} borderLeft={"1px"} borderColor={"gray.700"}>
        <Image src="https://i.ibb.co/FqbjLw6/dark-banner-2.png"></Image>
      </Box>
    </Container>
  );
};

export default SidePhoto;
