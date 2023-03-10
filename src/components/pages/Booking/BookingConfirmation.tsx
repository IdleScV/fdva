import { Heading, Box, VStack, Text, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface BookingConfirmationProps {
  children?: React.ReactNode;
}

const BookingConfirmation = ({ children }: BookingConfirmationProps) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      key="step-1"
      display={"flex"}
      flexDirection={"column"}
      flexGrow={1}
    >
      <Center
        boxShadow={"lg"}
        backgroundColor={"rgba(0, 0, 0, 0.3)"}
        flexGrow={1}
        height={"100%"}
      >
        <VStack
          width={{
            base: "95%",
            md: "500px",
          }}
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
            textAlign={"center"}
            whiteSpace={"nowrap"}
          >
            Thanks for booking!
          </Heading>
          {children ? (
            children
          ) : (
            <Text textAlign={"center"}>
              We have received your reservation and it is being processed. You
              will receive a confirmation email with all the details of your
              booking shortly. Please note that payment instructions will be
              included in the email. Once you have received the email, you can
              follow the instructions to complete your payment and secure your
              booking. If for any reason you do not receive the email within the
              next few minutes, please check your spam folder. If you still
              don't see it, please feel free to contact us at email@email.com
              and we will assist you further. Thank you for choosing our
              service!
            </Text>
          )}
        </VStack>
      </Center>
    </Box>
  );
};

export default BookingConfirmation;
