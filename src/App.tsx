import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
export const theme = extendTheme(
    {
        fonts: {
            heading: "noto-sans, sans-serif",
            body: "noto-sans, sans-serif",
            text: "noto-sans, sans-serif",
        },
        components: {
            Text: {
                baseStyle: {
                    color: "white",
                },
            },
            Heading: {
                baseStyle: {
                    color: "white",
                },
            },
        },
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    proTheme
);

export const App = () => (
    <Router>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
            <Main />
        </ChakraProvider>
    </Router>
);
