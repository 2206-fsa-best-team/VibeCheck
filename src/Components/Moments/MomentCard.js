import React from "react";
import { VStack, Box, Skeleton, Stack } from "@chakra-ui/react";
import MomentDetails from "./MomentDetails";
import { colorSelector } from "../Helpers/colorChanger";

const MomentCard = (props) => {
  const { loading, moment, onClick } = props;

  return loading ? (
    <Stack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="700px"
    >
      <Skeleton height="60px" />
    </Stack>
  ) : (
    <>
      <VStack
        p="5"
        m="16px"
        spacing={"16px"}
        borderRadius="lg"
        alignItems="stretch"
        maxW="700px"
      >
        <Box
          onClick={onClick}
          maxW="sm"
          align="stretch"
          borderWidth="1px"
          borderRadius="lg"
          borderTopWidth="4px"
          borderTopColor={() => colorSelector(moment.vibe)}
        >
          <MomentDetails {...props} />
        </Box>
      </VStack>
    </>
  );
};

export default MomentCard;
