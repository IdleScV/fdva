import {
    Container,
    Stack,
    ButtonGroup,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { Logo } from "./Logo";

const Footer = () => {
    return (
        <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
            <Stack
                spacing={{ base: "4", md: "5" }}
                as={motion.div}
                layoutId="footer"
            >
                <Stack justify="space-between" direction="row" align="center">
                    <Logo inverse />
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="LinkedIn"
                            icon={
                                <FaLinkedin fontSize="1.25rem" color="white" />
                            }
                        />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="Youtube"
                            icon={
                                <FaYoutube fontSize="1.25rem" color="white" />
                            }
                        />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="Instagram"
                            icon={
                                <FaInstagram fontSize="1.25rem" color="white" />
                            }
                        />
                    </ButtonGroup>
                </Stack>
                <Text fontSize="sm" color="subtle">
                    &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All
                    rights reserved.
                </Text>
            </Stack>
        </Container>
    );
};

export default Footer;