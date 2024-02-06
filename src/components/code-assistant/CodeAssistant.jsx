import React, { useState } from "react";
import "./CodeAssistant.css";
import Header from "../landing/header/Header.jsx";

const CodeAssistant = () => {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [settings, setSettings] = useState({
    styling: 50,
    codeStyle: 50,
    efficiency: 50,
  });

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSettingChange = (event) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted code:", code);
    console.log("Settings:", settings);
    // Simulate a response for demonstration
    setResponse("Your code has been analyzed. Here's some advice...");
    // In a real application, you'd send the code and settings to a server for analysis and display the response here
  };

  return (
    <>
      <Header />
      <div className="codeReviewTool">
        <div className="topRightPanel">
          <div className="settingsPanel">
            <div className="setting">
              <label>Styling: {settings.styling}</label>
              <input
                type="range"
                name="styling"
                min="0"
                max="100"
                value={settings.styling}
                onChange={handleSettingChange}
              />
            </div>
            <div className="setting">
              <label>Code Style: {settings.codeStyle}</label>
              <input
                type="range"
                name="codeStyle"
                min="0"
                max="100"
                value={settings.codeStyle}
                onChange={handleSettingChange}
              />
            </div>
            <div className="setting">
              <label>Efficiency: {settings.efficiency}</label>
              <input
                type="range"
                name="efficiency"
                min="0"
                max="100"
                value={settings.efficiency}
                onChange={handleSettingChange}
              />
            </div>
          </div>
        </div>
        <form className="codeInputForm" onSubmit={handleSubmit}>
          <textarea
            className="codeInput"
            placeholder="Paste your code here..."
            value={code}
            onChange={handleCodeChange}
          />
          <button type="submit">Get Code Advice</button>
          <div className="codeResponse">{response}</div>
        </form>
      </div>
    </>
  );
};

export default CodeAssistant;
