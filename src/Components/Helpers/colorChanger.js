export const colorSelector = (vibe) => {
  switch (true) {
    case vibe <= 100 && vibe > 80:
      return { border: "blue.600", bg: "rgba(43, 108, 176, 0.6)" };
    case vibe <= 80 && vibe > 60:
      return { border: "blue.400", bg: "rgba(66, 153, 225, 0.6)" };
    case vibe <= 60 && vibe > 40:
      return { border: "purple.400", bg: "rgba(183, 148, 244, 0.6)" };
    case vibe <= 40 && vibe > 20:
      return { border: "red.400", bg: "rgba(252, 129, 129, 0.6)" };
    case vibe <= 20:
      return { border: "red.600", bg: "rgba( 229, 62, 62, 0.6)" };
    default:
      return { border: "green.600", bg: "rgba(47, 133, 90, 0.6)" };
  }
};
