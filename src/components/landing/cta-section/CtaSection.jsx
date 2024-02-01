import React from "react";
import "./CtaSection.css";
import { useNavigate } from "react-router-dom";

function CtaSection() {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <h2>Ready to unlock the power of AI?</h2>
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className="cta-button"
      >
        Sign Up Now
      </button>
      <p>Start your free trial today and experience the difference.</p>
    </section>
  );
}

export default CtaSection;
