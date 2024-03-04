import React, { useState, useRef } from "react";
import { Container, CssBaseline, TextField, Typography, Button } from "@mui/material";
import "./Chatbot.css"; // Make sure to include your original CSS file
import logo from "../../assets/logo.png";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [autoFill, setAutoFill] = useState(""); // State for autofill suggestion
  const autoCompleteOptions = ["Tell me about ARC", "Tell me about ARC's goals",
                               "What is RISE", "How can I join RISE"]; 
  const inputRef = useRef(null);

  const handlePromptChange = (event) => {
    const value = event.target.value;
    setPrompt(value);

    // Check for autofill suggestions
    const matchedOption = autoCompleteOptions.find((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );

    if (matchedOption) {
      setAutoFill(matchedOption.substring(value.length));
    } else {
      setAutoFill("");
    }
  };

  const handlePromptSubmit = (event) => {
    event.preventDefault();
    setBackgroundVisible(false);
  };

  const handleAutoFill = () => {
    if (autoFill) {
      const currentPrompt = prompt + autoFill;
      setPrompt(currentPrompt); // Append autofill to the current prompt
      setAutoFill(""); // Clear autofill after applying
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior
      handleAutoFill();
    }
  };

  const calculateLeftPosition = () => {
    const inputElement = inputRef.current;
    const cursorPosition = inputElement.selectionStart;
  
    // Get the text content leading up to the cursor position
    const textBeforeCursor = inputElement.value.substring(0, cursorPosition);
  
    // Create a hidden span element to measure the width of the text
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre'; // Preserve spaces
    span.textContent = textBeforeCursor;
  
    // Append the span to the document body to measure its width
    document.body.appendChild(span);
  
    // Get the width of the text content up to the cursor position
    const textWidth = span.offsetWidth;
  
    // Remove the span from the document body
    document.body.removeChild(span);
  
    // Calculate the left position based on the width of the text content
    const leftPosition = textWidth + 'px';
  
    return leftPosition;
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
          <div className="prompt-container" style={{ position: 'relative' }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="prompt"
              label="Enter your prompt..."
              name="prompt"
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
              className="prompt-input"
            />
            {autoFill && ( 
              <span
                className="auto-fill-suggestion"
                style={{ position: 'absolute', top: '30%', left: calculateLeftPosition(), zIndex: '999' }}
              >
                {autoFill}
              </span>
            )}
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
