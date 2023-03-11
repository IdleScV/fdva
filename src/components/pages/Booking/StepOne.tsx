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
    HStack,
} from "@chakra-ui/react";
import { Calendar } from "@natscale/react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";
import NextButton from "../../NextButton";
import { staggeredAnimation } from "./StepThree";

export type TimeSlot = {
    time: string;
    id: string;
};

export const availableTimeSlots: TimeSlot[] = [
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
    {
        time: "12:00PM",
        id: "5",
    },
    {
        time: "1:00PM",
        id: "6",
    },
    {
        time: "2:00PM",
        id: "7",
    },
    {
        time: "3:00PM",
        id: "8",
    },

    {
        time: "4:00PM",
        id: "9",
    },
    {
        time: "5:00PM",
        id: "10",
    },
    {
        time: "6:00PM",
        id: "11",
    },
    {
        time: "7:00PM",
        id: "12",
    },
    {
        time: "8:00PM",
        id: "13",
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
    // user is allowed to make a booking from today
    const isDisabled = useCallback((date: Date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate());
        const latestDate = new Date(today);
        latestDate.setFullYear(latestDate.getFullYear() + 1);
        return date < tomorrow || date > latestDate;
    }, []);

    return (
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
                    textAlign={"center"}
                >
                    <Box mx="auto" top={"0"}>
                        <Calendar
                            weekends={[]}
                            startOfWeek={0}
                            value={date}
                            onChange={onChange}
                            hideAdjacentDates
                            isDisabled={isDisabled}
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
                        <HStack justifyContent={"space-between"} width="100%">
                            <AnimatePresence exitBeforeEnter>
                                <Text
                                    as={motion.div}
                                    key={`date-${date}`}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    fontSize={{
                                        base: "sm",
                                        md: "lg",
                                    }}
                                    whiteSpace={"nowrap"}
                                >
                                    {date
                                        ? date.toDateString()
                                        : "Please select a dates"}
                                </Text>
                            </AnimatePresence>
                            <AnimatePresence exitBeforeEnter>
                                {date && (
                                    <Text
                                        as={motion.div}
                                        key={`time-${selectedSlot?.time}`}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                        }}
                                        fontSize={{
                                            base: "sm",
                                            md: "lg",
                                        }}
                                        whiteSpace={"nowrap"}
                                    >
                                        {selectedSlot
                                            ? ` ${selectedSlot?.time}`
                                            : " <Please select a time>"}
                                    </Text>
                                )}
                            </AnimatePresence>
                        </HStack>
                        <AnimatePresence exitBeforeEnter>
                            {!isLoading &&
                                (!date ? (
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
                                        as={motion.div}
                                        // initial={{ opacity: 0 }}
                                        // animate={{ opacity: 1 }}
                                        // exit={{ opacity: 0 }}
                                        key={date?.toDateString() + "-slots"}
                                        mt={2}
                                        columns={{
                                            base: 2,
                                            md: 3,
                                        }}
                                        spacing={2}
                                    >
                                        {selectedDateSlots &&
                                            selectedDateSlots.map(
                                                (slot, index) => (
                                                    <Button
                                                        as={motion.div}
                                                        variants={staggeredAnimation(
                                                            index,
                                                            0.01
                                                        )}
                                                        isActive={
                                                            selectedSlot &&
                                                            selectedSlot.id ===
                                                                slot.id
                                                        }
                                                        onClick={() =>
                                                            handleSlotSelect(
                                                                slot
                                                            )
                                                        }
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                        key={slot.id}
                                                    >
                                                        {slot.time}
                                                    </Button>
                                                )
                                            )}
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
                                    <NextButton
                                        handleClick={handleForwardStep}
                                    />
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
