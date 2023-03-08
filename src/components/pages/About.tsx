import { Box, Center, Heading, Text, VStack, Image } from "@chakra-ui/react";
import LogoImg from "../../images/Logo.png";
const About = () => {
  return (
    <Box
      py={{
        base: "2rem",
        md: "2rem",
      }}
      px={{
        base: "0.5rem",
        md: "1rem",
      }}
      minHeight={"calc(100vh - 64px)"}
      backgroundColor={"gray.500"}
      opacity={1}
      position="relative"
    >
      <Box
        position="absolute"
        top="20%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={0}
      >
        <Image src={LogoImg} alt="Logo" opacity={0.5} />
      </Box>
      <Center
        height="100%"
        width={{
          base: "100%",
          md: "75%",
        }}
        margin="auto"
        position={"relative"}
        zIndex={1}
      >
        <VStack align="left" spacing={8}>
          <Heading>About FDVA</Heading>
          <Heading size={"md"}>Background</Heading>
          <Text>
            First Dance Virginia (FDVA) was co-founded by dance professionals
            Nick Pasch and Lauren Chen as a solution to the lack of businesses
            specializing solely in first dance training in the DC area.
            Following both of their weddings, they recounted to each other that
            in the midst of all the stress of wedding planning, being able to
            relax and spend quality time with their partners while practicing
            for the first dance was a welcome relief. This is the philosophy
            that inspired FDVA. We come prepared with a myriad of tools
            including pre-choregraphed dances of varying levels, time
            commitments, and performance styles to give you and your partner the
            most relaxed experience possible while also helping you to be
            productive in your wedding planning.
          </Text>
          <Heading size={"md"}>Location</Heading>
          <Text>
            We currently teach out of a handful of locations around the greater
            Washington, DC area. To determine the most convenient location for
            you, please contact us with an inquiry. One of our instructors will
            also confirm the best location with you following the booking of
            your first lesson. We are also available to commute to our clients’
            houses and teach you your first dance from the comfort of your own
            home. This is a great option for many couples who are struggling to
            find the time to check off all of their wedding-planning boxes. If
            you would like to receive lessons at your residence, please let us
            know upon booking your first lesson.
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default About;
