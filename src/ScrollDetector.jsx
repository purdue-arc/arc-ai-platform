import React, { useEffect, useRef, useState } from "react";

const ScrollDetector = ({ onVisibilityChange }) => {
  const detectorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Call the callback function with the visibility status
        onVisibilityChange(entry.isIntersecting);
      },
      {
        root: null, // observing intersections with the viewport
        rootMargin: "0px",
        threshold: 0.1, // callback will be executed when 10% of the target is visible
      },
    );

    if (detectorRef.current) {
      observer.observe(detectorRef.current);
    }

    return () => {
      if (detectorRef.current) {
        observer.unobserve(detectorRef.current);
      }
    };
  }, [onVisibilityChange]);

  return (
    <div
      ref={detectorRef}
      style={{
        position: "absolute",
        top: "92vh",
        height: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent", // Set to transparent or any color if needed for debugging
      }}
    ></div>
  );
};

export default ScrollDetector;
