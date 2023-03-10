import { Heading, Box, Flex } from "@chakra-ui/react";
import "@natscale/react-calendar/dist/main.css";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Logo } from "../Logo";
import StepOne, { TimeSlot, tempTimeSlots } from "./Booking/StepOne";
import { ClassOptionType, StepTwo } from "./Booking/StepTwo";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import BImage from "../../images/rose.jpg";
import StepThree from "./Booking/StepThree";

const Booking = () => {
  const { register, handleSubmit } = useForm<any>();
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    TimeSlot[] | undefined
  >();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [selectedClass, setSelectedClass] = useState<ClassOptionType>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = handleSubmit((data: any) => {
    console.log({
      date: date?.toDateString(),
      selectedSlot,
      selectedClass: selectedClass?.value,
      data,
      phoneNumber,
    });

    // TODO: Send data to backend
    // Process  after Data is received on the BE
    // 1. Send email to user with booking details & payment link
    // 2. Send email to admin with booking details
    // 3. Send SMS to user with booking details
    // 4. Send SMS to admin with booking details
    // FE should then redirect to a success page
    // let them know that they will receive an email with payment link
  });

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

  return (
    <AnimateSharedLayout>
      <Box
        mt="-64px"
        minHeight="100vh"
        height="100%"
        p={{
          base: "1rem",
          md: "2rem",
        }}
        display={"flex"}
        flexDirection={"column"}
        backgroundImage={BImage}
        backgroundSize="cover"
      >
        <NoNavHeader header="Booking" />

        <AnimatePresence initial={false} exitBeforeEnter>
          {currentStep === 0 && (
            <StepOne
              date={date}
              handleForwardStep={handleForwardStep}
              handleSlotSelect={handleSlotSelect}
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
            <StepThree
              handleBackStep={handleBackStep}
              key="step-2"
              selectedClass={selectedClass}
              register={register}
              onSubmit={onSubmit}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          )}
        </AnimatePresence>
      </Box>
    </AnimateSharedLayout>
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
