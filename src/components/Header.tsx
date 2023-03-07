import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    useBreakpoint,
    useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { data } from "./data";
import { NavAccordion } from "./NavAccordion";
import { NavLayout } from "./NavLayout";

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // when route changes, close
    useEffect(() => {
        console.log("location changed");
        onClose();
    }, [location]);

    return (
        <Box as="nav" py={2}>
            {!isOpen ? (
                <NavLayout onClickMenu={onOpen} isMenuOpen={isOpen} />
            ) : (
                <Box height="64px"></Box>
            )}

            <Drawer
                placement="bottom"
                initialFocusRef={menuButtonRef}
                isOpen={isOpen}
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <AnimatePresence exitBeforeEnter>
                    <DrawerContent
                        as={motion.div}
                        initial={{ opacity: 0, x: 1000 }}
                        animate={{
                            opacity: 0.6,
                            x: 0,
                        }}
                        exit={{ opacity: 0, x: -1000 }}
                        backgroundColor={"gray.800"}
                    >
                        <DrawerHeader py={2}>
                            <NavLayout
                                onClickMenu={onClose}
                                isMenuOpen={isOpen}
                                menuButtonRef={menuButtonRef}
                            />
                        </DrawerHeader>
                        <DrawerBody display="flex" flexDir={"column"}>
                            <NavAccordion data={data} />
                            <HStack mt="6">
                                <Button
                                    m={"auto"}
                                    colorScheme="blue"
                                    variant="outline"
                                    borderRadius={2}
                                    color="accent"
                                    fontWeight="semibold"
                                    size="xl"
                                    my={8}
                                >
                                    Book a Class
                                </Button>
                            </HStack>
                        </DrawerBody>
                    </DrawerContent>
                </AnimatePresence>
            </Drawer>
        </Box>
    );
};

export default Header;
