import { VStack, Box, Heading, Text, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../../BackButton";
import NextButton from "../../NextButton";
import { RadioCardGroup, RadioCard } from "../../RadioCardGroup";
import { TimeSlot } from "./StepOne";

export type ClassOptionType = {
  label: string;
  description: string;
  value: ClassOptions;
};

export enum ClassOptions {
  Choreographed = "choreographed",
  Partner = "partner-dance-101",
}

export const classOptions: ClassOptionType[] = [
  {
    label: "Choreographed First Dance",
    description:
      "Spend some quality time with your partner while learning a beautiful first dance routine that reflects your unique style. Our experienced choreographers will help you feel confident and relaxed, so you can take a break from the stress of wedding planning.",
    value: ClassOptions.Choreographed,
  },
  {
    label: "Partner Dance 101",
    description:
      "Take a break from the wedding planning chaos and join us for a stress-free partner dance class. From salsa to swing, you'll learn new moves and connect with your partner in a fun and relaxing environment, leaving you feeling rejuvenated and ready to tackle anything.",
    value: ClassOptions.Partner,
  },
];

interface StepTwoProps {
  date: Date | undefined;
  handleBackStep: () => void;
  handleClassTypeSelect: (type: ClassOptionType) => void;
  handleForwardStep: () => void;
  selectedClass: ClassOptionType | undefined;
  selectedSlot: TimeSlot | undefined;
}
export const StepTwo = ({
  date,
  handleBackStep,
  handleClassTypeSelect,
  handleForwardStep,
  selectedClass,
  selectedSlot,
}: StepTwoProps) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      key="step-1"
    >
      <BackButton handleClick={handleBackStep} />

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
          Step 2. Choose your class type
        </Heading>

        <Text
          as={motion.div}
          key={date?.toDateString()}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          fontSize={{
            base: "sm",
            md: "lg",
          }}
        >
          {date
            ? date.toDateString() +
              (selectedSlot ? ` ${selectedSlot?.time}` : "")
            : "Please select a dates"}
        </Text>
        <Container maxW="lg">
          <RadioCardGroup spacing="2" value={selectedClass?.value}>
            {classOptions.map((option) => (
              <RadioCard
                key={option.value}
                value={option.value}
                onClick={() => handleClassTypeSelect(option)}
              >
                <Text color="emphasized" fontWeight="medium" fontSize="sm">
                  {option.label}
                </Text>
                <Text color="muted" fontSize="sm">
                  {option.description}
                </Text>
              </RadioCard>
            ))}
          </RadioCardGroup>

          <AnimatePresence>
            {selectedClass && (
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
        </Container>
      </VStack>
    </Box>
  );
};
