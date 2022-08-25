import { Container, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../server/supabaseClient";
import VibesLineGraph from "./Charts/VibesLineGraph";
import { Text } from "@chakra-ui/react";
import NoDataGraph from "./Charts/NoDataGraph";
import ChartFilter from "./Charts/ChartFilter";
import DateObject from "react-date-object";

const VibeCharts = (props) => {
  const [moments, setMoments] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const todaysDate = new DateObject();
  const [filterDate, setFilterDate] = useState("2010-08-05 00:00:00");

  useEffect(() => {
    setLoading(true);
    dateFilter(filter);
    fetchMoments();
    fetchJournals();
    setLoading(false);
  }, [filter, filterDate]);

  const dateFilter = async (val) => {
    let day = todaysDate.day;
    let month = todaysDate.month.number;
    let year = todaysDate.year;
    switch (val) {
      case "lastSeven":
        day -= 7;
        setFilterDate(`${year}-${month}-${day} 00:00:00`);
        break;
      case "lastThirty":
        month -= 1;
        setFilterDate(`${year}-${month}-${day} 00:00:00`);
        break;
      case "lastYear":
        year -= 1;
        setFilterDate(`${year}-${month}-${day} 00:00:00`);
        break;
      default:
        year -= 10;
        setFilterDate(`${year}-${month}-${day} 00:00:00`);
        break;
    }
  };

  async function fetchMoments() {
    try {
      const { data } = await supabase
        .from("moments")
        .select()
        .gt("created_at", `${filterDate}`)
        .lt("created_at", "2030-08-23 00:00:00")
        .order("created_at");

      setMoments(data);
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchJournals() {
    try {
      const { data } = await supabase
        .from("journals")
        .select()
        .gt("created_at", `${filterDate}`)
        .lt("created_at", "2030-08-23 00:00:00")
        .order("created_at");
      setJournals(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {loading ? (
        <Container w={"90%"}>
          <br />
          <br />
          <Skeleton height="200px" />
          <br />
          <br />
          <br />
          <Skeleton height="200px" />
        </Container>
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
