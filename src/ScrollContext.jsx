// ScrollContext.jsx
import React, { createContext, useState, useContext } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollState, setScrollState] = useState({
    isCompact: false,
  });

  // Function to update the context state, can be expanded to handle more cases
  const updateScrollState = (state) => {
    setScrollState((prev) => ({ ...prev, ...state }));
  };

  return (
    <ScrollContext.Provider value={{ scrollState, updateScrollState }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use scroll context
export const useScrollContext = () => useContext(ScrollContext);
