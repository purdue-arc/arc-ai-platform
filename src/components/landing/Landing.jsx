import React from "react";
import Header from "../header/Header.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import FeaturesSection from "./features-section/FeaturesSection.jsx";
import CtaSection from "./cta-section/CtaSection.jsx";
import Footer from "../footer/Footer.jsx";
import "./Landing.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function Landing() {
  return (
    <div>
      <Parallax pages={2} style={{ top: "0", left: "0" }}>
        <ParallaxLayer offset={0} speed={1} style={{ zIndex: 1 }}>
          <Header />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: -1 }}>
          <div className="landing-bg"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.15} speed={1} style={{ zIndex: 0 }}>
          <div className="landing-content">
            <HeroSection />
            <FeaturesSection />
            <CtaSection />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.5} speed={1} style={{ zIndex: 1 }}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Landing;
