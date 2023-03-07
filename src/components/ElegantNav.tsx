import { HStack, StackDivider, Button, Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { data } from "./data";
const ElegantNav = () => {
    const location = useLocation();
    const isLocationCurrent = (route: string) => {
        return route === location.pathname;
    };
    return (
        <HStack
            spacing="4"
            divider={<StackDivider height="6" alignSelf="unset" />}
        >
            {data.map((route) => (
                <VStack position="relative">
                    <Button
                        variant="ghost"
                        color="white"
                        fontWeight="standard"
                        as={Link}
                        to={route.to || ""}
                        borderRadius={0}
                        borderTopRadius={8}
                        _hover={{
                            backgroundColor: "gray.300",
                            opacity: 0.7,
                        }}
                        style={{
                            textShadow: "0 0 12px rgba(0,0,0,1)",
                        }}
                    >
                        {route.title}
                    </Button>
                    {isLocationCurrent(route.to || "") && (
                        <Box
                            position="absolute"
                            as={motion.div}
                            layoutId="underline"
                            borderBottom="white 1px solid"
                            width="100%"
                            bottom="2px"
                            mt={"-2px"}
                        ></Box>
                    )}
                </VStack>
            ))}
            <Button
                m={"auto"}
                colorScheme="blue"
                variant="outline"
                borderRadius={2}
                color="accent"
                fontWeight="semibold"
                opacity={0.8}
            >
                Book a Class
            </Button>
        </HStack>
    );
};

export default ElegantNav;
