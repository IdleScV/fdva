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
  Spinner,
} from "@chakra-ui/react";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos, MdBackspace } from "react-icons/md";
import { Logo } from "../Logo";

type TimeSlot = {
  time: string;
  id: string;
};

const tempTimeSlots: TimeSlot[] = [
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

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    TimeSlot[] | undefined
  >();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const onChange = useCallback(
    (val: any) => {
      setDate(val);
      setSelectedDateSlots(undefined);
    },
    [setDate]
  );

  useEffect(() => {
    console.log("When date changes", date);
    setIsLoading(true);
    setSelectedSlot(undefined);
    setTimeout(() => {
      setSelectedDateSlots(tempTimeSlots);

      setIsLoading(false);
    }, 1000);
  }, [date]);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  return (
    <Box
      mt="-64px"
      minHeight="100vh"
      p={{
        base: "1rem",
        md: "2rem",
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Flex
        flexDir={{
          base: "column",
          md: "row-reverse",
        }}
        textAlign="center"
        justifyContent="space-evenly"
        alignItems={"center"}
      >
        <Logo />
        <Heading mb={4} textAlign={"center"}>
          Booking
        </Heading>
      </Flex>

      {/* <SimpleGrid columns={{ base: 1, md: 2 }}> */}
      <AnimatePresence initial={false} exitBeforeEnter>
        {currentStep === 0 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            key="step-0"
          >
            <VStack
              flexGrow={1}
              height={"auto"}
              display="flex"
              flexDir="column"
            >
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
                    s,
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
                      key={date?.toDateString()}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.5,
                        },
                      }}
                      exit={{
                        opacity: 0,
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
                          flexGrow={1}
                        >
                          {selectedDateSlots &&
                            selectedDateSlots.map((slot) => (
                              <Button
                                isActive={
                                  selectedSlot && selectedSlot.id === slot.id
                                }
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
                        <Button
                          width="50%"
                          size="xl"
                          onClick={() => setCurrentStep(1)}
                          outline={"white solid"}
                          variant="ghost"
                          _hover={{
                            backgroundColor: "rgba(0,0,0,0.1)",
                          }}
                          rightIcon={<MdArrowForwardIos />}
                        >
                          Next
                        </Button>
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              </Flex>
            </VStack>

            {/* </SimpleGrid> */}
          </Box>
        )}
        {currentStep === 1 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            key="step-1"
          >
            <Button
              variant="ghost"
              _hover={{
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
              leftIcon={<MdArrowBackIos />}
              onClick={() => {
                setCurrentStep(0);
              }}
            >
              Back
            </Button>
            <VStack
              flexGrow={1}
              height={"auto"}
              display="flex"
              flexDir="column"
            >
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
                Step 2. Choose your class type
              </Heading>
              <HStack>
                <Text
                  as={motion.div}
                  key={date?.toDateString()}
                  initial={{ opacity: 0, x: -1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 1000 }}
                  fontSize={{
                    base: "sm",
                    md: "lg",
                  }}
                  layoutId="booking-time"
                >
                  {date
                    ? date.toDateString() +
                      (selectedSlot ? ` ${selectedSlot?.time}` : "")
                    : "Please select a dates"}
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Booking;
