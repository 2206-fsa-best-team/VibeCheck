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

          w={"100%"}
          direction="flex"
          justifyContent={"center"}
        >
          <Button
            height={"32px"}
            variant={filter === 'all' ? 'solid' : 'outline'}
            onClick={(e) => {
              e.preventDefault();
              handleClick("all");
            }}
          >
            all
          </Button>
          <Button
            height={"32px"}
            variant={filter === 'lastSeven' ? 'solid' : 'outline'}
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastSeven");
            }}
          >
            last 7 days
          </Button>
          <Button
            height={"32px"}
            variant={filter === 'lastThirty' ? 'solid' : 'outline'}
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastThirty");
            }}
          >
            last 30 days
          </Button>
          <Button
            height={"32px"}
            variant={filter === 'lastYear' ? 'solid' : 'outline'}
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
