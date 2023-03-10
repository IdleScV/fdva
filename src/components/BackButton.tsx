import { Button } from "@chakra-ui/react";
import { MdArrowBackIos } from "react-icons/md";

interface BackButtonProps {
  handleClick: () => void;
}

const BackButton = ({ handleClick }: BackButtonProps) => {
  return (
    <Button
      variant="ghost"
      _hover={{
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      leftIcon={<MdArrowBackIos />}
      onClick={handleClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
