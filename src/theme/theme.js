import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  cyan: {
    50: "#EBF6F9",
    100: "#C8E5EE",
    200: "#A5D5E4",
    300: "#82C5D9",
    400: "#5FB4CE",
    500: "#3BA4C4",
    600: "#30839C",
    700: "#246275",
    800: "#18414E",
    900: "#0C2127",
  },
  blue: {
    50: "#C7F2FF",
    100: "#A6DDFD",
    200: "#88C2F6",
    300: "#70A7E8",
    400: "#5B8DD2",
    500: "#4A74B5",
    600: "#105CBC",
    700: "#0C458D",
    800: "#082E5E",
    900: "#04172F",
    // 50: "#EDF1F8",
    // 100: "#EDF1F8",
    // 200: "#ACBFDD",
    // 300: "#8BA6D0",
    // 400: "#6A8DC2",
    // 500: "#4A74B5",
    // 600: "#3B5C91",
    // 700: "#2C456D",
    // 800: "#1E2E48",
    // 900: "#0F1724",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("whiteAlpha.900", "gray.700")(props), //#0a0f1c
    },
  }),
};

// const components = {
//   Button: {
//     // setup light/dark mode component defaults
//     baseStyle: {
//       bg: "pink.100",
//     },
//   },
// };

const Button = {
  // The styles all button have in common
  // baseStyle: (props) => ({
  //   bg: mode("cyan.100", "cyan.500")(props),
  // }),
  variants: {
    outline: (props) => ({
      borderColor: mode("blue.200", "blue.500")(props),
      // color: "white",
    }),
    solid: (props) => ({
      bg: mode("blue.200", "blue.500")(props),
    }),
    // ghost: (props) => ({
    //   bg: mode("cyan.200", "cyan.500")(props),
    // }),
  },
  defaultProps: {
    variant: "solid",
  },
};

const theme = extendTheme({
  colors,
  components: { Button },
  styles,
});

export default theme;
