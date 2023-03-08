import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import BookAClassButton from "./BookAClassButton";
import { data } from "./data";
import { NavAccordion } from "./NavAccordion";
import { NavLayout } from "./NavLayout";
import { Routes } from "./Routes";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isOnBooking = location.pathname === Routes.BOOKING;
  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <Box as="nav" height="100%">
      <AnimatePresence exitBeforeEnter>
        {!isOpen && !isOnBooking && (
          <NavLayout onClickMenu={onOpen} isMenuOpen={isOpen} />
        )}
      </AnimatePresence>

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
            <DrawerHeader p={0}>
              <NavLayout
                onClickMenu={onClose}
                isMenuOpen={isOpen}
                menuButtonRef={menuButtonRef}
              />
            </DrawerHeader>
            <DrawerBody display="flex" flexDir={"column"} pb={8}>
              <NavAccordion data={data} />

              <BookAClassButton />
            </DrawerBody>
          </DrawerContent>
        </AnimatePresence>
      </Drawer>
    </Box>
  );
};

export default Header;
