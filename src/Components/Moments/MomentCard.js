import React from "react";
import { VStack, Box, Skeleton } from "@chakra-ui/react";
import MomentDetails from "./MomentDetails";
import { colorSelector } from "../Helpers/colorChanger";

const MomentCard = (props) => {
  const { loading, moment, onClick } = props;

  return loading ? (
    <VStack p="5" m="16px" spacing={"16px"} alignItems="stretch" maxW="lg">
      <Skeleton height="8rem" borderRadius="lg" />
    </VStack>
  ) : (
    <Box
      onClick={onClick}
      maxW="lg"
      align="stretch"
      borderWidth="1px"
      borderRadius="lg"
      borderTopWidth=".25rem"
      borderTopColor={() => colorSelector(moment.vibe)}
    >
      <MomentDetails {...props} />
    </Box>
  );
};

export default MomentCard;
