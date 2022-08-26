export const colorSelector = (vibe) => {
  switch (true) {
    case vibe <= 100 && vibe > 80:
      return "blue.500";
    case vibe <= 80 && vibe > 60:
      return "blue.300";
    case vibe <= 60 && vibe > 40:
      return "purple.300";
    case vibe <= 40 && vibe > 20:
      return "red.200";
    case vibe <= 20:
      return "red.600";
    default:
      return "green.600";
  }
};
