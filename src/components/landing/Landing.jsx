import React from "react";
import Header from "../header/Header.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import FeaturesSection from "./features-section/FeaturesSection.jsx";
import CtaSection from "./cta-section/CtaSection.jsx";
import Footer from "../footer/Footer.jsx";
import "./Landing.css";

function Landing() {
  return (
    <div>
      <Header />
      <div className="landing-content">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
