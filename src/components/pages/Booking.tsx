import {
  Heading,
  Box,
  Center,
  Text,
  HStack,
  Flex,
  Button,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import { useState, useCallback } from "react";

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  const onChange = useCallback(
    (val: any) => {
      setDate(val);
    },
    [setDate]
  );

  const tempTimeSlots = [
    {
      time: "8:00PM",
      index: 1,
    },
  ];

  return (
    <Box
      minHeight="calc(100vh - 64px)"
      p={{
        base: "1rem",
        md: "2rem",
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Heading mb={4}>Booking</Heading>
      {/* <SimpleGrid columns={{ base: 1, md: 2 }}> */}
      <VStack flexGrow={1} height={"auto"} display="flex" flexDir="column">
        <Heading
          width={{
            base: "100%",
            md: "75%",
          }}
          size={{
            base: "md",
            md: "lg",
          }}
        >
          Step 1. Schedule your first lesson
        </Heading>
        <Flex
          flexDir={{
            base: "column",
            md: "row",
          }}
          width={{
            base: "100%",
            md: "75%",
          }}
          alignItems="top"
        >
          <Box margin="auto">
            <Calendar
              weekends={[]}
              startOfWeek={0}
              value={date}
              onChange={onChange}
            />
          </Box>
          <Box
            flexGrow={1}
            px={{
              base: "0.5rem",
              md: "1rem",
            }}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            <Heading
              size={{
                base: "sm",
                md: "lg",
              }}
              whiteSpace={"nowrap"}
            >
              Selected Date
            </Heading>
            <Text
              fontSize={{
                base: "sm",
                md: "lg",
              }}
            >
              {date ? date.toDateString() : "Please select a dates"}
            </Text>
            {date && (
              <SimpleGrid
                mt={2}
                columns={{
                  base: 2,
                  md: 3,
                }}
                spacing={2}
                flexGrow={1}
              >
                {tempTimeSlots.map(() => (
                  <Button>8:00PM</Button>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
        {time && (
          <Box
            p={{
              base: "2rem",
              md: "4rem",
            }}
          >
            <Button>Next</Button>
          </Box>
        )}
      </VStack>

      {/* </SimpleGrid> */}
    </Box>
  );
};

export default Booking;
