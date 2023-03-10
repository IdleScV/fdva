import {
  Heading,
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Stack,
  GridItem,
  Text,
  Grid,
} from "@chakra-ui/react";
import "@natscale/react-calendar/dist/main.css";
import { AnimatePresence, motion } from "framer-motion";
import BackButton from "../../BackButton";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ClassOptions, ClassOptionType } from "./StepTwo";
type FormDataType = {
  name: string;
  label: string;
  type: string;
  optional?: boolean;
};

interface StepThreeProps {
  handleBackStep: () => void;
  selectedClass: ClassOptionType | undefined;
  register: any;
  onSubmit: any;
  phoneNumber: string | undefined;
  setPhoneNumber: (val: string) => void;
}

export const staggeredAnimation = (count: number, rate: number = 0.03) => {
  return {
    initial: {
      opacity: 0,
      y: -10,
      x: -10,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: count ** 2 * rate,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        delay: count ** 1.5 * (rate / 3),
        duration: 0.02,
      },
    },
  };
};

const StepThree = ({
  handleBackStep,
  selectedClass,
  register,
  onSubmit,
  phoneNumber,

  setPhoneNumber,
}: StepThreeProps) => {
  const ClassSpecificForm = (selectedClass: ClassOptionType) => {
    switch (selectedClass.value) {
      case ClassOptions.Choreographed:
        return [
          {
            name: "customSong",
            label: "Do you have a song picked out?",
            type: "text",
          },
          {
            name: "concerns",
            label: "Any concerns or questions?",
            type: "text",
            optional: true,
          },
        ] as FormDataType[];
      case ClassOptions.Partner:
        return [
          {
            name: "preference",
            label: "Any preference in dance styles?",
            type: "text",
          },
          {
            name: "concerns",
            label: "Any concerns or questions?",
            type: "text",
            optional: true,
          },
        ] as FormDataType[];
      default:
        return [] as FormDataType[];
    }
  };

  const ClassSpecifictitle = (selectedClass: ClassOptionType) => {
    switch (selectedClass.value) {
      case ClassOptions.Choreographed:
        return "Tell us about yourself";
      case ClassOptions.Partner:
        return "Tell us about yourself";
      default:
        return "Tell us about yourself";
    }
  };

  const NonSpecificForm: FormDataType[] = [
    {
      name: "name",
      label: "Your name",
      type: "text",
    },
    {
      name: "partnerName",
      label: "Your partner's name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "weddingDate",
      label: "Wedding date",
      type: "date",
      optional: true,
    },
  ];

  const isValidNumber = (number: string) => {
    return number.length === 11;
  };

  return (
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
        alignItems="center"
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
          {selectedClass && `Step 3. ${ClassSpecifictitle(selectedClass)}`}
        </Heading>
        <form
          onSubmit={onSubmit}
          style={{
            width: "100%",
          }}
        >
          <AnimatePresence>
            <Grid
              margin={"auto"}
              width={{ base: "100%", md: "75%" }}
              maxWidth="900px"
              as={motion.div}
              gap={2}
              templateRows={{
                base: "repeat(1fr)",
                md: "repeat(1fr)",
              }}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              borderRadius="lg"
              backgroundColor={"transparent"}
              px={{
                base: 4,
                md: 8,
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
                        variants={staggeredAnimation(index)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={field.name}
                        width="100%"
                      >
                        <Stack>
                          <FormControl id={field.name}>
                            <FormLabel whiteSpace={"nowrap"} display="flex">
                              {field.label}
                              {field.optional && (
                                <Text size="sm" ml={2}>
                                  (optional)
                                </Text>
                              )}
                            </FormLabel>
                            <Input
                              isRequired={field.optional ? false : true}
                              type={field.type}
                              {...register(field.name)}
                            />
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
                        variants={staggeredAnimation(
                          index + ClassSpecificForm(selectedClass).length + 1
                        )}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={field.name}
                      >
                        <Stack>
                          <FormControl id={field.name}>
                            <FormLabel whiteSpace={"nowrap"} display="flex">
                              {field.label}
                              {field.optional && (
                                <Text size="sm" ml={2}>
                                  (optional)
                                </Text>
                              )}
                            </FormLabel>
                            <Input
                              isRequired={field.optional ? false : true}
                              type={field.type}
                              {...register(field.name)}
                            />
                          </FormControl>
                        </Stack>
                      </GridItem>
                    );
                  })}

                  <GridItem
                    as={motion.div}
                    colSpan={2}
                    variants={staggeredAnimation(
                      ClassSpecificForm(selectedClass).length +
                        NonSpecificForm.length +
                        1
                    )}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={"phone"}
                  >
                    <Stack>
                      <FormControl id="phoneNumber">
                        <FormLabel>Phone number</FormLabel>
                        <PhoneInput
                          country={"us"}
                          disableCountryGuess={true}
                          disableDropdown
                          value={phoneNumber}
                          inputStyle={{
                            width: "100%",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            height: "40px",
                          }}
                          buttonStyle={{
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                          }}
                          onChange={setPhoneNumber}
                        />
                      </FormControl>
                    </Stack>
                  </GridItem>
                  <AnimatePresence>
                    {phoneNumber && isValidNumber(phoneNumber) && (
                      <GridItem
                        colSpan={{ base: 2, md: 4 }}
                        as={motion.div}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 1 },
                        }}
                        layoutId="submit"
                      >
                        <Button
                          width="100%"
                          my={4}
                          type="submit"
                          variant="outline"
                        >
                          Submit
                        </Button>
                      </GridItem>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Grid>
          </AnimatePresence>
        </form>
      </VStack>
    </Box>
  );
};

export default StepThree;
