import React, { useState } from "react";
import "./CodeAssistant.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { db } from '../../firebaseconfig.js'; // Import from your config file
import { collection, addDoc } from 'firebase/firestore';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted code:", code);
    console.log("Settings:", settings);
    // Create the JSON file structure
    setResponse("Your code has been analyzed. Here's some advice...");
    const codeData = {
      code: code,
      settings: settings,
      timestamp: new Date() // Add a timestamp if you'd like
    };

    try {
      const docRef = await addDoc(collection(db, "codeSubmissions"), codeData);
      console.log("Document written with ID: ", docRef.id);
      setResponse("Your code has been submitted for review!"); // Update response
    } catch (error) {
      console.error("Error adding document: ", error);
      setResponse("An error occurred while submitting your code.");
    }
  };

  return (
    <>
      <Header />
      <body className="assistant">
        <h1 className="title">Code Assistant</h1>
        <div className="codeReviewTool">
          <div className="leftPanel">
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
            <button className="getAdvice"type="submit">Get Code Advice</button>
            <div className="codeResponse">{response}</div>
          </form>
        </div>
      </body>

      <Footer />
    </>
  );
};

export default CodeAssistant;

