import { Button } from "@chakra-ui/react";

const BookAClassButton = () => {
  return (
    <Button
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
