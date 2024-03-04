// ScrollContext.js
import React from "react";

const ScrollContext = React.createContext({
  scrollY: 0,
  setScrollY: () => {},
});

export default ScrollContext;
