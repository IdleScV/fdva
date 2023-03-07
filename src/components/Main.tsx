import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import Routings from "./Routing";
import BImage from "../images/rose.jpg";

export const SessionContext = createContext(null);

function Main() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            {isLoading ? (
                <Flex
                    key="loading"
                    height={"100vh"}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                >
                    <Center width="100%">
                        <Spinner size={"xl"} />
                    </Center>
                </Flex>
            ) : (
                <Flex
                    key="main"
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 1 },
                    }}
                    exit={{ opacity: 0 }}
                    flexDir={"column"}
                    overflowX={"hidden"}
                    bg={"gray.800"}
                >
                    <Box
                        backgroundSize="cover"
                        backgroundImage={BImage}
                        height={"100vh"}
                    >
                        <Routings />
                    </Box>
                </Flex>
            )}
        </AnimatePresence>
    );
}

export default Main;
