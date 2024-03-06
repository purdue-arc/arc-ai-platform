import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import "./Chatbot.css"; // Make sure to include your original CSS file
import logo from "../../assets/logo.png";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import { getFirestore, collection, getDocs, doc, setDoc} from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import ScrollDetector from "../../ScrollDetector.jsx";
import { useScrollContext } from "../../ScrollContext.jsx";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [hintData, setHintData] = useState([]);
  const inputRef = useRef(null);
  const db = getFirestore();
  const { updateScrollState } = useScrollContext();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const hintArray = [];
      const userPromptsSnapshot = await getDocs(collection(db, "wiki_bot", Cookies.get("user_id"), Cookies.get("user_id")));
      userPromptsSnapshot.forEach((doc) => {
        hintArray.push(doc.data().prompt);
      });
      console.log(hintArray);
      setHintData(hintArray);
    } catch (error) {
      console.error("Error fetching user prompts: ", error);
    }
  };
  
  

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = (event) => {
    console.log("Submission Recorded");
    event.preventDefault();
    let uuid = uuidv4();
    let data = {
      prompt: prompt,
      completion: "",
      timestamp: Date.now(),
      chat_id: uuid,
    };
    setDoc(
      doc(db, "wiki_bot", Cookies.get("user_id"), Cookies.get("user_id"), uuid),
      data,
    ).then().error("bruh (or or oro ror or o ro ror or or)");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior
    }
  };

  return (
    <>
      <Header />
      <ScrollDetector
        onVisibilityChange={(isVisible) =>
          updateScrollState({ isCompact: isVisible })
        }
      />
      <div
        className={`chat-container ${backgroundVisible ? "" : "no-background"}`}
      >
        {backgroundVisible && (
          <img className="logo" src={logo} alt="Background" />
        )}
        {!backgroundVisible && (
          <img className="transparent-image" src={logo} alt="Background" />
        )}
        <Typography variant="h5" className="chat-header">
          How can I help you today?
        </Typography>
        <div className="chat-options">
          <Button
            variant="contained"
            onClick={handlePromptSubmit}
            className="chat-option"
          >
            Tell me about ARC
          </Button>
          <Button
            variant="contained"
            onClick={handlePromptSubmit}
            className="chat-option"
          >
            Tell me about ARC's goals
          </Button>
          <Button
            variant="contained"
            onClick={handlePromptSubmit}
            className="chat-option"
          >
            What is RISE
          </Button>
          <Button
            variant="contained"
            onClick={handlePromptSubmit}
            className="chat-option"
          >
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
