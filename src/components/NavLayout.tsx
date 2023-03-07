import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    StackDivider,
    useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RefObject } from "react";
import { FiMenu, FiSun } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ElegantNav from "./ElegantNav";
import { Logo } from "./Logo";

type NavLayoutProps = {
    onClickMenu?: VoidFunction;
    onToggleMode?: VoidFunction;
    isMenuOpen: boolean;
    menuButtonRef?: RefObject<HTMLButtonElement>;
};

export const NavLayout = (props: NavLayoutProps) => {
    const isDesktopMode = useBreakpointValue({ lg: true, base: false });
    const { onClickMenu, onToggleMode, isMenuOpen, menuButtonRef } = props;
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
                <HStack divider={<StackDivider height="6" alignSelf="unset" />}>
                    <IconButton
                        ref={menuButtonRef}
                        variant="ghost"
                        icon={
                            <Icon as={MenuIcon} fontSize="2xl" color="white" />
                        }
                        aria-label="Open Menu"
                        onClick={onClickMenu}
                        _hover={{
                            backgroundColor: "gray.300",
                            opacity: 0.5,
                        }}
                    />
                </HStack>
            )}
        </Flex>
    );
};
