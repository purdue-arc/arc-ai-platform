import React, { useState } from "react";
import "./CodeAssistant.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { db } from "../../firebaseconfig.js"; // Import from your config file
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useScrollContext } from "../../ScrollContext.jsx";
import ScrollDetector from "../../ScrollDetector.jsx";
import CodeStyleGraph from "./graphs/CodeStyleGraph.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const NavigateCard = () => {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/code-assistant/code-report-graph");
  };

  return (
    <Card sx={{ cursor: "pointer" }} onClick={handleNavigate}>
      <CardActionArea sx={{ height: "25vw" }}>
        <CardContent sx={{ padding: "0 2vw 0 2vw" }}>
          <Typography gutterBottom variant="h5" component="div">
            Code Review Graph
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click to explore the Code Review Graph for insights and analytics.
            This graph is a comprehensive review of dependencies within this
            codebase. This means that each function call, library usage, or
            class dependency will be tracked in the form of a graph data
            structure. You can use this to visualize your codebase and find
            certain heavily dependent or underutilized aspects of your project.
            The larger the size of the node, the more dependent, the smaller the
            less.
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted code:", code);
    console.log("Settings:", settings);
    // Create the JSON file structure
    setResponse("Your code has been analyzed. Here's some advice...");
    const codeData = {
      code: code,
      settings: settings,
      timestamp: new Date(), // Add a timestamp if you'd like
    };

    try {
      let uuid = uuidv4();
      await setDoc(
        doc(
          db,
          "codeSubmissions",
          Cookies.get("user_id"),
          Cookies.get("user_id"),
          uuid,
        ),
        codeData,
      );
      console.log("Document written with ID: ", uuid);
      setResponse("Your code has been submitted for review!"); // Update response
      let user_info = {
        recent_id: uuid,
      };
      await setDoc(
        doc(
          db,
          "codeSubmissions",
          Cookies.get("user_id"),
          Cookies.get("user_id"),
          "user_info",
        ),
        user_info,
        { merge: true },
      );
    } catch (error) {
      console.error("Error adding document: ", error);
      setResponse("An error occurred while submitting your code.");
    }

    setShowGraphs(true);
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
            <TextareaAutosize
              className="codeInput"
              minRows={5}
              maxRows={20}
              value={code}
              onChange={handleCodeChange}
              placeholder="Paste your code here..."
              style={{ width: "100%", padding: "0.5vh" }}
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
      <div className="extra-top">
        <Footer />
      </div>
    </>
  );
};

export default CodeAssistant;
