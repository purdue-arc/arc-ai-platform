import React, { useState } from "react";
import "./Chatbot.css";
import logo from "../../assets/logo.png";
import Footer from "../landing/footer/Footer.jsx";
import Header from "../landing/header/Header.jsx";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = (event) => {
    event.preventDefault();
    setBackgroundVisible(false);
  };

  return (
    <>
      <Header />
      <div
        className={`chat-container ${backgroundVisible ? "" : "no-background"}`}
      >
        {backgroundVisible && <img src={logo} alt="Background" />}
        <div className="chat-header">How can I help you today?</div>
        <div className="chat-options">
          <button className="chat-option" onClick={handlePromptSubmit}>
            Tell me about ARC
          </button>
          <button className="chat-option" onClick={handlePromptSubmit}>
            Tell me about ARC's goals
          </button>
          <button className="chat-option" onClick={handlePromptSubmit}>
            What is RISE
          </button>
          <button className="chat-option" onClick={handlePromptSubmit}>
            How can I join RISE
          </button>
        </div>
        <form className="prompt-form" onSubmit={handlePromptSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt..."
            className="prompt-input"
          />
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Chatbot;
