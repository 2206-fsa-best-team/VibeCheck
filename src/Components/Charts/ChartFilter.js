import { ButtonGroup, Button, Container } from "@chakra-ui/react";
import React from "react";

const ChartFilter = (props) => {
  const { filter, setFilter, setEntryId } = props;
  const handleClick = (val) => {
    setEntryId(0)
    setFilter(val);
  };

  return (
    <>
      <Container>
        <ButtonGroup
          colorScheme={"blue"}
          w={"100%"}
          direction="flex"
          justifyContent={"center"}
        >
          <Button
            height={"32px"}
            isActive={filter === "all" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              handleClick("all");
            }}
          >
            all
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastSeven" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastSeven");
            }}
          >
            last 7 days
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastThirty" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastThirty");
            }}
          >
            last 30 days
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastYear" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastYear");
            }}
          >
            last year
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};
export default ChartFilter;
