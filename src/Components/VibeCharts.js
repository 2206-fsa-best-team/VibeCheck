import { Container, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../server/supabaseClient";
import VibesLineGraph from "./Charts/VibesLineGraph";
import { Text } from "@chakra-ui/react";
import NoDataGraph from "./Charts/NoDataGraph";
import ChartFilter from "./Charts/ChartFilter";

const VibeCharts = (props) => {
  const [moments, setMoments] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetchMoments();
    fetchJournals();
    setLoading(false);
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
    console.log(moments);
    setLoading(false);
  }
  async function fetchJournals() {
    const { data } = await supabase.from("journals").select();
    setJournals(data);
  }

  return (
    <>
      {loading ? (
        <>
          <br />
          <Skeleton height="150px" />
          <br />
          <br />
          <Skeleton height="150px" />
        </>
      ) : (
        <>
          <br />
          <ChartFilter setFilter={setFilter} filter={filter} />
          <br />
          <Container
            w={"100%"}
            height={"100%"}
            justifyContent="center"
            align={"center"}
            px={"20px"}
          >
            <Text fontSize={"2xl"}>moment-to-moment vibes</Text>
            {moments.length < 2 ? (
              <NoDataGraph location={"moment"} />
            ) : (
              <VibesLineGraph moments={moments} type={"moments"} />
            )}
          </Container>
          <Container
            w={"100%"}
            height={"100%"}
            justifyContent="center"
            align={"center"}
            px={"20px"}
          >
            <Text fontSize={"2xl"}>journal-to-journal vibes</Text>
            {journals.length < 2 ? (
              <>
                <NoDataGraph location={"journal"} />
              </>
            ) : (
              <VibesLineGraph journals={journals} type={"journals"} />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default VibeCharts;
