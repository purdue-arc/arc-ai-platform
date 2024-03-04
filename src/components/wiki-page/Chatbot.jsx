import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import "./Chatbot.css"; // Make sure to include your original CSS file
import logo from "../../assets/logo.png";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [hintData, setHintData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // potential could use ai to generate this array?
    const hintArray = [
      "Tell me about ARC",
      "Tell me about ARC's goals",
      "What is RISE",
      "How can I join RISE"
    ];
    setHintData(hintArray);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = (event) => {
    event.preventDefault();
    setBackgroundVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior
    }
  };

  return (
    <>
      <Header />
      <div className={`chat-container ${backgroundVisible ? "" : "no-background"}`}>
        {backgroundVisible && <img src={logo} alt="Background" />}
        {!backgroundVisible && <img className="transparent-image" src={logo} alt="Background" />}
        <Typography variant="h5" className="chat-header">
          How can I help you today?
        </Typography>
        <div className="chat-options">
          <Button variant="contained" onClick={handlePromptSubmit} className="chat-option">
            Tell me about ARC
          </Button>
          <Button variant="contained" onClick={handlePromptSubmit} className="chat-option">
            Tell me about ARC's goals
          </Button>
          <Button variant="contained" onClick={handlePromptSubmit} className="chat-option">
            What is RISE
          </Button>
          <Button variant="contained" onClick={handlePromptSubmit} className="chat-option">
            How can I join RISE
          </Button>
        </div>
        <form className="prompt-form" onSubmit={handlePromptSubmit}>
          <div className="prompt-container">
            <Hint options={hintData} allowTabFill>
              <input
                className="prompt-input"
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
                placeholder="Enter your prompt..."
              />
            </Hint>
          </div>
          <Button type="submit" variant="contained" className="submit-button">
            Send
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Chatbot;
