import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from "recharts";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { findEntry } from "../Helpers/findEntry";

const VibesLineGraph = (props) => {
  const {setEntryId, setMoment, setJournal} = props

  const dataType = (props) => {
    if (props.type === "moments") {
      const { moments } = props;
      return moments;
    } else if (props.type === "journals") {
      const { journals } = props
      return journals;
    }
  };

  const CustomTooltip = (data) => {
    const { payload, label, active, color, content } = data
    if (active) {
      let val = findEntry(dataType(props), payload[0].payload.id)
      content.props.setEntryId(payload[0].payload.id)
      if (props.type === "moments") {
        content.props.setMoment(val)
      } else if (props.type === "journals") {
        content.props.setJournal(val)
      }

      return (
        <Box
          h={"28px"}
          w={"72px"}
          border="1px"
          borderRadius={"xl"}
          bg={color}
          borderColor={"black"}

        >
          <Text>{`vibe: ${payload[0].value}`}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <>

        <Text align="left" fontSize={"lg"} >
          vibe
        </Text>
        <ResponsiveContainer width={"105%"} height={200}>
          <LineChart
            margin={{
              top: 8,
              right: 30,
              left: 10,
            }}
            data={dataType(props)}
          >
            <Line
              type="monotone"
              dataKey={"vibe"}
              stroke={'tomato'}
              dot={true}
              fill={"tomato"}
              activeDot={{ r: 6 }}
            />
            <Tooltip
              content={
                <CustomTooltip color={useColorModeValue("white", "tomato")} setEntryId={setEntryId} setMoment={setMoment} setJournal={setJournal}/>
              }

            />
            <XAxis
              label={
                <Label
                  value="time"
                  fill={useColorModeValue("black", "white")}
                  fontSize="18"
                />
              }
              fontSize={0}
              tickLine={false}
            />
          </LineChart>
        </ResponsiveContainer>

    </>
  );
};

export default VibesLineGraph;
