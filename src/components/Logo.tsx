import { Text, Image, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Routes } from "./Routes";
import LogoImg from "../images/Logo.png";

export const Logo = ({ inverse = false }: { inverse?: boolean }) => (
    <HStack as={Link} to={Routes.HOME} height="75px" ml={-4}>
        <Image
            boxSize="750px"
            objectFit={"contain"}
            width="75px"
            height="75px"
            p={3}
            src={LogoImg}
            objectPosition="center"
            alt="Logo"
            mr={-4}
            // inverse color
            filter={inverse ? "invert(1)" : "none"}
        />
        <Text fontSize="2xl" fontWeight={400} userSelect="none">
            First Dance Virginia
        </Text>
    </HStack>
);
