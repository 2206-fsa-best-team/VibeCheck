import React from "react";
import { Container, Text, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const NoDataGraph = (props) => {
  const { location } = props;

  return (
    <>
      <Tooltip
        label={`vibe graphs appear when you have 2 or more ${location}s`} aria-label='tooltip stating the graphs only appear when there are two or more vibes' placement="bottom" hasArrow openDelay={500}
      >
        <Link to={`/adda${location}`}>
          <Container
            w={"100%"}
            height={"100%"}
            justifyContent="center"
            align={"center"}
            bg={useColorModeValue("lightgrey", "grey")}
            borderRadius={"lg"}
            shadow={'sm'}
          >
            <br />
            <br />
            <br />
            <Text fontSize={"xl"}>{`add a ${location} here`}</Text>
            <br />
            <br />
            <br />
          </Container>
        </Link>
      </Tooltip>
    </>
  );
};

export default NoDataGraph;
