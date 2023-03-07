import {
  Flex,
  HStack,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import BookAClassButton from "./BookAClassButton";
import ElegantNav from "./ElegantNav";
import { Logo } from "./Logo";

type NavLayoutProps = {
  onClickMenu?: VoidFunction;
  onToggleMode?: VoidFunction;
  isMenuOpen: boolean;
  menuButtonRef?: RefObject<HTMLButtonElement>;
};

export const NavLayout = (props: NavLayoutProps) => {
  const isDesktopMode = useBreakpointValue({ xl: true, base: false });
  const { onClickMenu, isMenuOpen, menuButtonRef } = props;
  const MenuIcon = isMenuOpen ? MdClose : FiMenu;
  return (
    <Flex
      height="16"
      align="center"
      justify="space-between"
      px="5"
      backgroundColor="transparent"
      zIndex={10}
    >
      <Logo inverse={isMenuOpen && !isDesktopMode} />

      {isDesktopMode ? (
        <ElegantNav />
      ) : (
        <HStack>
          <IconButton
            ref={menuButtonRef}
            variant="ghost"
            icon={<Icon as={MenuIcon} fontSize="2xl" color="white" />}
            aria-label="Open Menu"
            onClick={onClickMenu}
            _hover={{
              backgroundColor: "gray.300",
              opacity: 0.5,
            }}
          />
          {!isMenuOpen && <BookAClassButton />}
        </HStack>
      )}
    </Flex>
  );
};
