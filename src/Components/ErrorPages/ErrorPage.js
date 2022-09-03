import React from "react";
import { Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbLetterB, TbLetterE, TbLetterI, TbLetterV } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <Flex direction="column" py={"48px"} align="center" justify="center">
      <Heading mb={6}>404 Not Found</Heading>
      <Text fontSize="lg" fontWeight="bold">
        We can't find what you're looking for.
      </Text>
      <br />
      <Link to="/">
        <HStack align="center" justify="center">
          <Icon variant="ghost" aria-label="V" w={16} h={16} as={TbLetterV} />
          <Icon variant="ghost" aria-label="V" w={16} h={16} as={TbLetterI} />
          <Icon variant="ghost" aria-label="V" w={16} h={16} as={TbLetterB} />
          <Icon variant="ghost" aria-label="V" w={16} h={16} as={TbLetterE} />
        </HStack>
      </Link>
    </Flex>
  );
};
export default ErrorPage;
