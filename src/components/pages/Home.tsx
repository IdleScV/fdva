import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Bokeh from "../../images/bokeh.jpg";
import Choreography from "../../images/choreography.jpg";
import partnerDance from "../../images/partner-dance.jpg";
import Wedding from "../../images/wedding.jpg";
import { motion, useScroll, Variants } from "framer-motion";
import { Routes } from "../Routes";
import { Link } from "react-router-dom";

export const Home = () => {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    // console.log(scrollYProgress);
  }, [scrollYProgress]);

  const cardVariants: Variants = {
    offscreen: {
      x: 100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  const viewPort = {
    once: true,
    amount: 0.5,
  };

  return (
    <>
      <Box
        p={{
          base: "1rem",
          md: "2rem",
        }}
        height="calc(100vh - 64px)"
      >
        <VStack
          justify={{ base: "center", md: "end" }}
          textAlign={{ base: "center", md: "left" }}
          px={{
            base: "1rem",
            md: "2rem",
          }}
          height="100%"
          width={{
            base: "100%",
            md: "50%",
          }}
          spacing={4}
          pb={{
            base: "1rem",
            md: "2rem",
          }}
        >
          <Text fontSize="5xl" width="100%">
            Your ultimate first dance resource
          </Text>
          <Text fontSize="xl">
            Our award-winning dance instructors work with you to make your first
            dance together a memorable one
          </Text>
        </VStack>
      </Box>
      <Box
        px={{
          base: "1rem",
          md: "2rem",
        }}
        py={{
          base: "4rem",
          md: "8rem",
        }}
        height={{ base: "110vh", small: "auto", large: "110vh" }}
        backgroundSize="cover"
        backgroundImage={Bokeh}
        backgroundPosition="center"
      >
        <VStack
          justify={{ base: "center" }}
          textAlign={{ base: "center" }}
          height="100%"
          width={{
            base: "100%",
          }}
          spacing={4}
          pb={{
            base: "1rem",
            md: "2rem",
          }}
        >
          <Box
            as={motion.div}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={viewPort}
          >
            <Text fontSize="4xl" width="100%" fontWeight={"semibold"}>
              Lesson Options
            </Text>
          </Box>
          <SimpleGrid
            columns={{ sm: 1, md: 2 }}
            gap="6"
            width="100%"
            height="100%"
          >
            <Box
              as={motion.div}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewPort}
            >
              <Box
                backgroundImage={Choreography}
                backgroundSize="cover"
                backgroundPosition="center"
                height={{ base: "320px", md: "66vh" }}
                width="100%"
              >
                <Center height="100%">
                  <Text fontSize="3xl" width="100%" fontWeight={"semibold"}>
                    Show-Stopping Choreography
                  </Text>
                </Center>
              </Box>
              <Box p={4} pt={8}>
                <Text
                  fontSize={{ md: "xl", base: "lg" }}
                  fontWeight="semibold"
                  width="100%"
                  textAlign={{
                    sm: "center",
                    md: "left",
                  }}
                >
                  Work with out team of experienced instructors to create a
                  truly unique piece that best represents your relationship.
                </Text>
              </Box>
            </Box>
            <Box
              as={motion.div}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewPort}
            >
              <Box
                backgroundImage={partnerDance}
                backgroundSize="cover"
                backgroundPosition="center"
                height={{ base: "320px", md: "66vh" }}
                width="100%"
              >
                <Center height="100%">
                  <Text fontSize="3xl" width="100%" fontWeight={"semibold"}>
                    Partner Dance 101
                  </Text>
                </Center>
              </Box>
              <Box p={2} pt={8}>
                <Text
                  fontSize={{ md: "xl", base: "lg" }}
                  fontWeight="semibold"
                  width="100%"
                  textAlign={{
                    sm: "center",
                    md: "left",
                  }}
                >
                  Don't feel like learning a choreographed routine? Our
                  instructors will equip you and your partner with the tools
                  necessary to confidently dance to any style of music.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
      <Box
        px={4}
        py={8}
        backgroundSize="cover"
        backgroundPosition={"center"}
        backgroundImage={Wedding}
        height={"80vh"}
        minHeight={"500px"}
      >
        <Center
          height="100%"
          width={{ base: "100%", md: "90%", lg: "80%" }}
          m={"auto"}
          display={"flex"}
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Text fontSize={"2xl"} fontWeight="semibold" px={2}>
            At First Dance Virginia, we believe preparing for the first dance is
            a time to relax and unwind from the stress of wedding planning. We
            help our couples slow down and enjoy their engagement while also
            checking off a major item on the "to-do" list.
          </Text>
          <Box
            pl={4}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            <Text
              p={{
                base: 2,
                md: 0,
              }}
              py={{
                base: 8,
                md: 4,
              }}
              whiteSpace="nowrap"
              fontWeight={"thin"}
            >
              Learn more about our lesson plans and packages
            </Text>
            <Button as={Link} to={Routes.LESSONS} borderRadius={2}>
              Learn More
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Home;
