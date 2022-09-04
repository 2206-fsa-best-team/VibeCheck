export const vibeMsgSelector = (vibe) => {
  switch (true) {
    case vibe <= 20:
      return "having a tough time";
    case vibe <= 40 && vibe > 20:
      return "not at your best";
    case vibe <= 60 && vibe > 40:
      return "floating in the middle";
    case vibe <= 80 && vibe > 60:
      return "feeling pretty good";
    case vibe <= 100 && vibe > 80:
      return "loving life";
    default:
      return "inconclusive";
  }
};
