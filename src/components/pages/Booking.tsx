import {
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Stack,
  SimpleGrid,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import "@natscale/react-calendar/dist/main.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import BackButton from "../BackButton";
import { Logo } from "../Logo";
import { PhoneNumberInput } from "../PhoneNumberInput";
import StepOne, { TimeSlot, tempTimeSlots } from "./Booking/StepOne";
import { ClassOptionType, ClassOptions, StepTwo } from "./Booking/StepTwo";

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    TimeSlot[] | undefined
  >();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [selectedClass, setSelectedClass] = useState<ClassOptionType>();
  const [currentStep, setCurrentStep] = useState(0);
  const onChange = useCallback(
    (val: any) => {
      setDate(val);
      setSelectedDateSlots(undefined);
    },
    [setDate]
  );

  useEffect(() => {
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

  const handleClassTypeSelect = (classType: ClassOptionType) => {
    setSelectedClass(classType);
  };

  const handleBackStep = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const handleForwardStep = () => {
    if (currentStep === 2) return;
    setCurrentStep(currentStep + 1);
  };

  const isDisabled = useCallback((date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);
    return date < tomorrow;
  }, []);

  const staggeredAnimation = (count: number) => {
    return {
      initial: {
        opacity: 0,
        x: 50,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          delay: (1 - 1 / count) * 1.5,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        x: -50,
        transition: {
          delay: 0.2 * count,
          duration: 0.5,
        },
      },
    };
  };

  type FormDataType = {
    name: string;
    label: string;
    type: string;
  };

  const ClassSpecificForm = (selectedClass: ClassOptionType) => {
    switch (selectedClass.value) {
      case ClassOptions.Choreographed:
        return [] as FormDataType[];
      case ClassOptions.Partner:
        return [] as FormDataType[];
      default:
        return [] as FormDataType[];
    }
  };

  const NonSpecificForm: FormDataType[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
    },
    {
      name: "weddingDate",
      label: "Wedding Date",
      type: "date",
    },
  ];

  const handlePhoneChange = (value: string) => {
    console.log(value);
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
      <NoNavHeader header="Booking" />

      <AnimatePresence initial={false} exitBeforeEnter>
        {currentStep === 0 && (
          <StepOne
            date={date}
            handleForwardStep={handleForwardStep}
            handleSlotSelect={handleSlotSelect}
            isDisabled={isDisabled}
            isLoading={isLoading}
            key="step-0"
            onChange={onChange}
            selectedDateSlots={selectedDateSlots}
            selectedSlot={selectedSlot}
          />
        )}
        {currentStep === 1 && (
          <StepTwo
            date={date}
            handleBackStep={handleBackStep}
            handleClassTypeSelect={handleClassTypeSelect}
            handleForwardStep={handleForwardStep}
            key="step-1"
            selectedClass={selectedClass}
            selectedSlot={selectedSlot}
          />
        )}
        {currentStep === 2 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            key="step-3"
          >
            <BackButton handleClick={handleBackStep} />
            <VStack
              flexGrow={1}
              height={"auto"}
              display="flex"
              flexDir="column"
              border="solid red 2px"
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
                Step 3. Customize
              </Heading>
              <AnimatePresence>
                <Grid
                  border="solid red 2px"
                  as={motion.div}
                  gap={4}
                  templateRows={{
                    base: "repeat( 1fr)",
                    md: "repeat( 1fr)",
                  }}
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(4, 1fr)",
                  }}
                  bg="bg-surface"
                  boxShadow="sm"
                  borderRadius="lg"
                  initial={{ background: "rgba(255, 255, 255, 0)" }}
                  animate={{
                    background: "rgba(255, 255, 255, 0.4)",
                    transition: { delay: 1.5, duration: 0.5 },
                  }}
                  // animate={{ backgroundColor: "bg-surface" }}
                  px={{
                    base: 2,
                    md: 4,
                  }}
                  py={2}
                >
                  {selectedClass && (
                    <>
                      {ClassSpecificForm(selectedClass).map((field, index) => {
                        return (
                          <GridItem
                            colSpan={2}
                            as={motion.div}
                            variants={staggeredAnimation(index + 1)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={field.name}
                          >
                            <Stack>
                              <FormControl id={field.name}>
                                <FormLabel>{field.label}</FormLabel>
                                <Input type={field.type} />
                              </FormControl>
                            </Stack>
                          </GridItem>
                        );
                      })}
                      {NonSpecificForm.map((field, index) => {
                        return (
                          <GridItem
                            colSpan={2}
                            as={motion.div}
                            variants={staggeredAnimation(index + 1)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={field.name}
                          >
                            <Stack>
                              <FormControl id={field.name}>
                                <FormLabel>{field.label}</FormLabel>
                                <Input type={field.type} />
                              </FormControl>
                            </Stack>
                          </GridItem>
                        );
                      })}

                      <GridItem
                        as={motion.div}
                        colSpan={2}
                        variants={staggeredAnimation(5)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={"phone"}
                      >
                        <Stack>
                          <FormControl id="phoneNumber">
                            <FormLabel>Phone Number</FormLabel>
                          </FormControl>
                        </Stack>
                      </GridItem>
                    </>
                  )}
                </Grid>
              </AnimatePresence>
            </VStack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Booking;

type NoNavHeaderProps = {
  header: string;
};
const NoNavHeader = ({ header }: NoNavHeaderProps) => {
  return (
    <Flex
      flexDir={{
        base: "column",
        md: "row-reverse",
      }}
      textAlign="center"
      justifyContent="space-evenly"
      alignItems={"center"}
    >
      <Logo stayBig />
      <Heading mb={4} textAlign={"center"}>
        {header}
      </Heading>
    </Flex>
  );
};
