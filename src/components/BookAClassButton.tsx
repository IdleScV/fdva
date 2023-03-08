import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Routes } from "./Routes";

const BookAClassButton = () => {
  return (
    <Button
      as={Link}
      to={Routes.BOOKING}
      m={"auto"}
      colorScheme="blue"
      variant="outline"
      borderRadius={2}
      color="accent"
      fontWeight="semibold"
      opacity={0.8}
      width={{
        base: "100%",
        md: "auto",
      }}
    >
      Book a Class
    </Button>
  );
};

export default BookAClassButton;
