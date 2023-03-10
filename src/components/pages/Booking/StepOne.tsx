import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Calendar } from "@natscale/react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";
import NextButton from "../../NextButton";

export type TimeSlot = {
  time: string;
  id: string;
};

export const tempTimeSlots: TimeSlot[] = [
  {
    time: "8:00PM",
    id: "1",
  },
  {
    time: "9:00PM",
    id: "2",
  },
  {
    time: "10:00PM",
    id: "3",
  },
  {
    time: "11:00PM",
    id: "4",
  },
];

interface StepOneProps {
  date: Date | undefined;
  handleForwardStep: () => void;
  handleSlotSelect: (slot: TimeSlot) => void;
  isLoading: boolean;
  onChange: (val: any) => void;
  selectedDateSlots: TimeSlot[] | undefined;
  selectedSlot: TimeSlot | undefined;
}

const StepOne = ({
  date,
  handleForwardStep,
  handleSlotSelect,
  isLoading,
  onChange,
  selectedDateSlots,
  selectedSlot,
}: StepOneProps) => {
  const isDisabled = useCallback((date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);
    return date < tomorrow;
  }, []);

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      key="step-0"
    >
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
          textAlign={{
            base: "center",
            md: "left",
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
              hideAdjacentDates
              isDisabled={isDisabled}
              // only allow dates after today
            />
          </Box>
          <Box
            flexGrow={1}
            px={{
              base: "0.5rem",
              md: "0rem",
            }}
            pl={{
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
            <AnimatePresence exitBeforeEnter>
              <Text
                as={motion.div}
                key={`date-${date?.toDateString()}-${selectedSlot?.time}`}
                initial={{ opacity: 0.4, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, type: "spring" },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.15 },
                }}
                fontSize={{
                  base: "sm",
                  md: "lg",
                }}
                layoutId="booking-time"
                whiteSpace={"nowrap"}
              >
                {date
                  ? date.toDateString() +
                    (selectedSlot
                      ? ` ${selectedSlot?.time}`
                      : " <Please select a time>")
                  : "Please select a dates"}
              </Text>
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
              {date &&
                (isLoading ? (
                  <Center
                    py={8}
                    width="100%"
                    as={motion.div}
                    exit={{ opacity: 0 }}
                  >
                    <Spinner />
                  </Center>
                ) : (
                  <SimpleGrid
                    layoutId="grid"
                    as={motion.div}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    key={date?.toDateString() + "slots"}
                    mt={2}
                    columns={{
                      base: 2,
                      md: 3,
                    }}
                    spacing={2}
                  >
                    {selectedDateSlots &&
                      selectedDateSlots.map((slot) => (
                        <Button
                          isActive={selectedSlot && selectedSlot.id === slot.id}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                  </SimpleGrid>
                ))}
            </AnimatePresence>
            <AnimatePresence>
              {selectedSlot && (
                <Box
                  as={motion.div}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  mt={8}
                >
                  <NextButton handleClick={handleForwardStep} />
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Flex>
      </VStack>

      {/* </SimpleGrid> */}
    </Box>
  );
};

export default StepOne;
