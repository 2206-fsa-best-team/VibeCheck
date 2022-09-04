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
      bg: mode("whiteAlpha.900", "gray.700")(props),
    },
  }),
};

const Button = {
  variants: {
    outline: (props) => ({
      borderColor: mode("cyan.200", "cyan.500")(props),
    }),
    solid: (props) => ({
      bg: mode("cyan.200", "cyan.500")(props),
    }),
  },
  defaultProps: {
    variant: "solid",
  },
};

const Tooltip = {
  baseStyle: (props) => ({
    borderRadius: "md",
    textAlign: "center",
  }),
};

const theme = extendTheme({
  colors,
  components: { Button, Tooltip },
  styles,
});

export default theme;
