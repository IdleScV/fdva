import { Text, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Routes } from "./Routes";
import LogoImg from "../images/Logo.png";

export const Logo = ({ inverse = false }: { inverse?: boolean }) => {
  const isSmallPhone = useBreakpointValue({ base: true, md: false });
  return (
    <HStack as={Link} mt={2} to={Routes.HOME} height={"75px"}>
      <Image
        boxSize="750px"
        objectFit={"contain"}
        width={"75px"}
        height={"75px"}
        p={3}
        src={LogoImg}
        objectPosition="center"
        alt="Logo"
        mr={-4}
        // inverse color
        filter={inverse ? "invert(1)" : "none"}
      />
      {!isSmallPhone && (
        <Text
          fontSize="2xl"
          fontWeight={400}
          userSelect="none"
          whiteSpace={"nowrap"}
        >
          First Dance Virginia
        </Text>
      )}
    </HStack>
  );
};
