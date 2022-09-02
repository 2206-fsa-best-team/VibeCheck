export const colorSelector = (vibe) => {
  switch (true) {
    case vibe <= 100 && vibe > 80:
      return { border: "blue.600", bg: "blue.500" };
    case vibe <= 80 && vibe > 60:
      return { border: "blue.400", bg: "blue.300" };
    case vibe <= 60 && vibe > 40:
      return { border: "purple.400", bg: "purple.300" };
    case vibe <= 40 && vibe > 20:
      return { border: "red.400", bg: "red.300" };
    case vibe <= 20:
      return { border: "red.600", bg: "red.500" };
    default:
      return { border: "green.600", bg: "green.500" };
  }
};
