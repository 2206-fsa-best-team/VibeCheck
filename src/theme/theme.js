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
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("whiteAlpha.900", "gray.600")(props), //#0a0f1c
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
      borderColor: mode("cyan.200", "cyan.500")(props),
      // color: "white",
    }),
    solid: (props) => ({
      bg: mode("cyan.200", "cyan.500")(props),
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
