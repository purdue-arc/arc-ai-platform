import React from "react";
import Header from "./header/Header.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import FeaturesSection from "./features-section/FeaturesSection.jsx";
import CtaSection from "./cta-section/CtaSection.jsx";
import Footer from "./footer/Footer.jsx";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page-container">
      <Header />
      <main className="landing-content">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
