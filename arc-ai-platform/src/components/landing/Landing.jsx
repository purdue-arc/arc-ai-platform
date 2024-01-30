import React from "react";
import Header from "./header/Header";
import HeroSection from "./hero-section/HeroSection";
import FeaturesSection from "./features-section/FeaturesSection";
import CtaSection from "./cta-section/CtaSection";
import Footer from "./footer/Footer";
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
