import { Button } from "@chakra-ui/react";
import { MdArrowForwardIos } from "react-icons/md";

interface NextButtonProps {
  handleClick: () => void;
}

const NextButton = ({ handleClick }: NextButtonProps) => {
  return (
    <Button
      width="50%"
      size="xl"
      onClick={handleClick}
      outline={"white solid"}
      variant="ghost"
      _hover={{
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      rightIcon={<MdArrowForwardIos />}
    >
      Next
    </Button>
  );
};

export default NextButton;
