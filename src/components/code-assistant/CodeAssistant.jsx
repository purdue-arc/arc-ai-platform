// CodeAssistant.jsx
import React, { useState } from "react";
import "./CodeAssistant.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import CodeStyleGraph from "./graphs/CodeStyleGraph.jsx";
import ScrollDetector from "../../ScrollDetector.jsx";
import { useScrollContext } from "../../ScrollContext.jsx";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const NavigateCard = () => {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/code-assistant/code-report-graph");
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleNavigate}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Code Review Graph
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click to explore the Code Review Graph for insights and analytics.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CodeAssistant = () => {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [settings, setSettings] = useState({
    styling: 50,
    codeStyle: 50,
    efficiency: 50,
  });
  const [showGraphs, setShowGraphs] = useState(false); // State to track whether to show graphs or not
  const { updateScrollState } = useScrollContext();

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
    setShowGraphs(true); // Set the state to show graphs after submission
    // In a real application, you'd send the code and settings to a server for analysis and display the response here
  };

  return (
    <>
      <Header />
      <ScrollDetector
        onVisibilityChange={(isVisible) =>
          updateScrollState({ isCompact: isVisible })
        }
      />
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
            <button className="getAdvice" type="submit">
              Get Code Advice
            </button>
            <div className="codeResponse">{response}</div>
          </form>
          {showGraphs && (
            <div className="graphsContainer">
              <div className="graph">
                <CodeStyleGraph />
              </div>
              <div className="graph">
                <NavigateCard />
              </div>
            </div>
          )}
        </div>
      </body>

      <Footer />
    </>
  );
};

export default CodeAssistant;
