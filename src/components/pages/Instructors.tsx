import {
  Center,
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import NickImg from "../../images/nickheadshot.png";
import LaurenImg from "../../images/lauren.jpeg";
import bokehJpg from "../../images/bokeh.jpg";
const Instructor = () => {
  return (
    <Box
      py={{
        base: "1rem",
        md: "2rem",
      }}
      px={{
        base: "0.5rem",
        md: "1rem",
      }}
      minHeight={"calc(100vh - 64px)"}
      backgroundImage={bokehJpg}
      backgroundPosition="center"
      backgroundSize="cover"
      opacity={1}
      position="relative"
    >
      <Center
        height="100%"
        width={{
          base: "100%",
          md: "75%",
        }}
        margin="auto"
      >
        <VStack align="left" spacing={8}>
          <Heading size={"2xl"}>Our Instructors</Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
            <Image
              alt="NickPasch"
              height={{ base: "60vh", lg: "400px" }}
              src={NickImg}
              ml={"auto"}
              mr={{
                base: "auto",
                lg: "0",
              }}
            />

            <Box
              textAlign={{ base: "center", lg: "left" }}
              boxShadow="lg"
              p={4}
              borderRadius="lg"
              backgroundColor="rgba(0,0,0,0.2)"
            >
              <Heading size={"xl"}>Nick Pasch</Heading>
              <Text>
                Always an athlete, Nick’s love of dance initially came to be
                from his mother’s encouragement to attend class as a child —
                since day one, he was hooked. It wasn’t until college, however,
                that Nick began to teach and compete in ballroom dancing; and
                although he had attended college for history and secondary
                education, his love and passion for this art form drew Nick back
                to the dance floor. As an instructor, he hopes to get to witness
                his students’ excitement as they gain confidence in their moves.
                “I love to see that ‘aha’ moment!” Join Nick on the dance floor
                for plenty of fun and learning!
              </Text>
            </Box>

            <Box
              order={{ base: 1, lg: 0 }}
              textAlign={{ base: "center", lg: "right" }}
              boxShadow="lg"
              p={4}
              borderRadius="lg"
              backdropBrightness={0.5}
              backgroundColor="rgba(0,0,0,0.2)"
            >
              <Heading size={"xl"}>Lauren Chen</Heading>
              <Text textAlign={{ base: "center", lg: "left" }}>
                Lauren brings a wealth of experience and expertise to every
                lesson via her extensive dance background, including formal
                training in ballet, jazz/lyrical, ballroom & Latin dance, and
                classical Chinese dance. With a keen eye for detail and a
                passion for teaching, Lauren works closely with each couple to
                choreograph a dance that reflects their unique personalities and
                style. Whether you're looking for a classic waltz or a fiery
                salsa, Lauren has the skills and experience to help you make
                your first dance a truly unforgettable moment.
              </Text>
            </Box>
            <Image
              alt="Lauren Chen"
              src={LaurenImg}
              m={{
                base: "auto",
                lg: "0",
              }}
              height={{ base: "60vh", lg: "400px" }}
            />
          </SimpleGrid>
        </VStack>
      </Center>
    </Box>
  );
};

export default Instructor;
