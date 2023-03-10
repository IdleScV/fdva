import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import Main from "./components/Main";
import { HashRouter as Router } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
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
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  proTheme
);

export const App = () => (
  <Router>
    <ColorModeScript />

    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher /> */}
      <Main />
    </ChakraProvider>
  </Router>
);
