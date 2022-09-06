import { Box, Container, HStack, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../../server/supabaseClient";
import VibesLineGraph from "./VibesLineGraph";
import { Text } from "@chakra-ui/react";
import NoDataGraph from "./NoDataGraph";
import ChartFilter from "./ChartFilter";
import DateObject from "react-date-object";
import ChartType from "./ChartType";
import { useNavigate } from "react-router-dom";
import MomentCard from "../Moments/MomentCard";
import JournalEntryCard from "../Journals/JournalEntryCard";
import SidePhoto from "../Navigation/SidePhoto";

const VibeCharts = (props) => {
  const [moments, setMoments] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const todaysDate = new DateObject();
  const [filterDate, setFilterDate] = useState("2010-08-05 00:00:00");
  const [type, setType] = useState("moments");
  const [entryId, setEntryId] = useState(0);
  const [moment, setMoment] = useState({
    id: null,
    content: "",
    vibe: 0,
    created_at: Date(),
  });
  const [journal, setJournal] = useState({
    id: null,
    content: "",
    vibe: 0,
    created_at: Date(),
    date: Date(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dateFilter(filter);
    fetchMoments();
    fetchJournals();
    setLoading(false);
  }, [filter, filterDate, entryId, type]);

  const dateFilter = async (val) => {
    let day = todaysDate.day;
    let month = todaysDate.month.number;
    let year = todaysDate.year;
    switch (val) {
      case "lastSeven":
        if (day - 7 >= 1) {
          day -= 7;
        } else {
          month -= 1;
          if (month === 2) {
            day += 21;
          } else if (month === (1 || 3 || 5 || 7 || 8 || 10 || 12)) {
            day += 24;
          } else {
            day += 23;
          }
        }
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
  const navToMoment = (id) => {
    navigate(`/moments/${id}`);
  };
  const navToJournal = (id) => {
    navigate(`/journals/${id}`);
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
        .gt("date", `${filterDate}`)
        .lt("date", "2030-08-23 00:00:00")
        .order("date");
      setJournals(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <SidePhoto />
      {loading ? (
        <Container w={"90%"}>
          <br />
          <br />
          <Skeleton height="200px" />
        </Container>
      ) : (
        <>
          <br />
          <Container align="center">
            <ChartType type={type} setType={setType} setEntryId={setEntryId} />
            <ChartFilter
              setFilter={setFilter}
              filter={filter}
              setEntryId={setEntryId}
            />
          </Container>
          <br />
          {type === "moments" ? (
            <Container
              w={"95%"}
              height={"100%"}
              justifyContent="center"
              align={"center"}
              px={"3%"}
            >
              <Text fontSize={"2xl"}>moment-to-moment vibes</Text>
              {moments.length < 2 ? (
                <NoDataGraph location={"moment"} />
              ) : (
                <VibesLineGraph
                  moments={moments}
                  type={"moments"}
                  setEntryId={setEntryId}
                  setMoment={setMoment}
                />
              )}
            </Container>
          ) : (
            <Container
              w={"95%"}
              height={"100%"}
              justifyContent="center"
              align={"center"}
              px={"3%"}
            >
              <Text fontSize={"2xl"}>entry-to-entry vibes</Text>
              {journals.length < 2 ? (
                <>
                  <NoDataGraph location={"journal"} />
                </>
              ) : (
                <VibesLineGraph
                  journals={journals}
                  type={"journals"}
                  setEntryId={setEntryId}
                  setJournal={setJournal}
                />
              )}
            </Container>
          )}
        </>
      )}

      {type === "moments" && entryId !== 0 ? (
        <Box align="center">
          <br />
          <Box
            align="center"
            px="16px"
            w="95%"
            onClick={() => navToMoment(moment.id)}
          >
            <MomentCard moment={moment} />
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {type === "journals" && entryId !== 0 ? (
        <Box align="center">
          <br />
          <Box
            align="center"
            w="95%"
            px="16px"
            onClick={() => navToJournal(journal.id)}
          >
            <JournalEntryCard journalEntry={journal} />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default VibeCharts;
