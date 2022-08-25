import { ButtonGroup, Button, Container } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const ChartFilter = (props) => {
  const { filter, setFilter } = props;
  console.log(filter);

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
            onClick={() => setFilter("all")}
          >
            all
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastSeven" ? true : false}
            onClick={() => setFilter("lastSeven")}
          >
            last 7 days
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastThirty" ? true : false}
            onClick={() => setFilter("lastThirty")}
          >
            last 30d
          </Button>
          <Button
            height={"32px"}
            isActive={filter === "lastYear" ? true : false}
            onClick={() => setFilter("lastYear")}
          >
            last year
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};
export default ChartFilter;
