import {
    VStack,
    Heading,
    Box,
    Text,
    Image,
    SimpleGrid,
} from "@chakra-ui/react";
import BookAClassButton from "../BookAClassButton";
import partnerDanceJpg from "../../images/partner-dance.jpg";
import choreographyJpg from "../../images/choreography.jpg";
import bokehJpg from "../../images/bokeh.jpg";
const Lessons = () => {
    return (
        <Box
            minHeight={"calc(100dvh - 64px)"}
            backgroundImage={bokehJpg}
            backgroundSize="cover"
        >
            <VStack
                p={{
                    base: "1rem",
                    md: "2rem",
                }}
                height="100%"
                backgroundColor={"rgba(0, 0, 0, 0.2)"}
            >
                <Heading>Lesson Descriptions</Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={8}
                    margin="auto"
                >
                    <VStack spacing={4}>
                        <Image
                            alt="ChoreographyJpg"
                            src={choreographyJpg}
                            width="100%"
                            maxHeight={{
                                base: "200px",
                                md: "400px",
                            }}
                            objectFit="cover"
                            objectPosition={{
                                base: "center",
                                md: "center",
                            }}
                        />
                        <Heading size={"md"}>Choreographed First Dance</Heading>
                        <Text>
                            Have as much or as little creative input as you
                            desire. Lauren and Nick will choreograph a full
                            piece for you and your partner based on a song of
                            your choice or a general vibe of your liking. For a
                            choreographed dance we recommend at least 5 lessons
                            to fully learn movements and polish to a
                            performance-ready state.{" "}
                        </Text>

                        <VStack>
                            <Text>5 Lesson Package</Text>
                            <Text>$450</Text>

                            <Text>A La Carte Lessons</Text>
                            <Text>$100 per lesson</Text>
                        </VStack>
                    </VStack>
                    <VStack spacing={4}>
                        <Image
                            alt="PartnerDanceJpg"
                            src={partnerDanceJpg}
                            width="100%"
                            maxHeight={{
                                base: "200px",
                                md: "400px",
                            }}
                            objectFit="cover"
                            objectPosition={{
                                base: "center",
                                md: "center",
                            }}
                        />

                        <Heading size={"md"}>Partner Dance 101</Heading>

                        <Text>
                            Elevate your freestyle dancing both for your first
                            dance and the rest of the night. Lauren and Nick
                            will teach your the basics of slow and fast partner
                            dancing for the most common styles of music. We
                            recommend at least 3 lessons to comfortably learn
                            how to dance with each other on the spot.
                        </Text>
                        <VStack>
                            <Text>3 Lesson Package</Text>
                            <Text>$270</Text>

                            <Text>A La Carte Lessons</Text>
                            <Text>$100 per lesson</Text>
                        </VStack>
                    </VStack>
                </SimpleGrid>
                <BookAClassButton />
            </VStack>
        </Box>
    );
};
export default Lessons;
