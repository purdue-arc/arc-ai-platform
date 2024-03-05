import React from "react";
import Header from "../header/Header.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import FeaturesSection from "./features-section/FeaturesSection.jsx";
import Footer from "../footer/Footer.jsx";
import "./Landing.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function Landing() {
  return (
    <>
      <Header />
      <Parallax pages={2} style={{ top: "5vh", left: "0" }}>
        <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: 0 }}>
          <div className="background-full-screen">
            <div className="bg-block"></div>
            <div className="bg-block flip-horizontal"></div>
            <div className="bg-block flip-vertical"></div>
            <div className="bg-block flip-both"></div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          sticky={{ start: 0, end: 1.4 }}
          style={{ zIndex: 10 }}
        >
          <div className="landing-bg-cover"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1} style={{ zIndex: 20 }}>
          <div className="landing-content">
            <HeroSection />
            <FeaturesSection />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.5} speed={1} style={{ zIndex: 30 }}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

export default Landing;
