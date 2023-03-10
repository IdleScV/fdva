import { Text, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Routes } from "./Routes";
import LogoImg from "../images/Logo.png";

export const Logo = ({
  inverse = false,
  stayBig = false,
}: {
  inverse?: boolean;
  stayBig?: boolean;
}) => {
  const isSmallPhone = useBreakpointValue({ base: true, md: false });
  return (
    <HStack as={Link} mt={2} to={Routes.HOME} height={"75px"}>
      <Image
        boxSize="750px"
        objectFit={"contain"}
        width={"75px"}
        height={"75px"}
        p={{
          base: 1,
          md: 2,
        }}
        src={LogoImg}
        objectPosition="center"
        alt="Logo"
        mr={-4}
        mt={-2}
        filter={inverse ? "invert(1)" : "none"}
      />
      {(!isSmallPhone || stayBig) && (
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
