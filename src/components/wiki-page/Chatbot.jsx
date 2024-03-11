import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import "./Chatbot.css"; // Make sure to include your original CSS file
import logo from "../../assets/logo.png";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import ScrollDetector from "../../ScrollDetector.jsx";
import { useScrollContext } from "../../ScrollContext.jsx";
import { db } from "../../firebaseconfig.js";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [hintData, setHintData] = useState([]);
  const [popularMessages, setPopularMessages] = useState([]);
  const inputRef = useRef(null);
  const db = getFirestore();
  const { updateScrollState } = useScrollContext();

  useEffect(() => {
    getData();
  }, [prompt]);

  const getData = async () => {
    try {
      const hintArray = [];
      const popularArray = [];

      // Get popular messages
      const popularMessagesSnapshot = await getDocs(
        collection(db, "wiki_bot", "popular", "messages"),
      );

      // Convert snapshot to an array of objects containing id and count
      const popularMessages = popularMessagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        count: doc.data().count,
      }));

      // Sort messages based on count in descending order
      popularMessages.sort((a, b) => b.count - a.count);

      // Take only the top 10 most popular messages
      const topPopularMessages = popularMessages.slice(0, 10);

      // Push IDs of the top 10 most popular messages to the popularArray
      topPopularMessages.forEach((message) => {
        hintArray.push(message.id);
        popularArray.push(message.id);
      });

      // Get user prompts
      const userPromptsSnapshot = await getDocs(
        collection(
          db,
          "wiki_bot",
          Cookies.get("user_id"),
          Cookies.get("user_id"),
        ),
      );
      userPromptsSnapshot.forEach((doc) => {
        hintArray.push(doc.data().prompt);
      });

      setPopularMessages(popularArray);
      setHintData(hintArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = async (event) => {
    console.log("Submission Recorded");
    event.preventDefault();
    let uuid = uuidv4();
    let promptLowerCase = prompt.toLowerCase(); // Convert prompt to lowercase
    let data = {
      prompt: promptLowerCase,
      completion: "",
      timestamp: Date.now(),
      chat_id: uuid,
    };

    try {
      // Store the user's prompt in their personal collection
      await setDoc(
        doc(
          db,
          "wiki_bot",
          Cookies.get("user_id"),
          Cookies.get("user_id"),
          uuid,
        ),
        data,
      );

      let user_info = {
        recent_id: uuid,
      };
      await setDoc(
        doc(
          db,
          "wiki_bot",
          Cookies.get("user_id"),
          Cookies.get("user_id"),
          "user_info",
        ),
        user_info,
      );

      // Reference the document in the "messages" subcollection under "popular"
      const popularDocRef = doc(
        db,
        "wiki_bot",
        "popular",
        "messages",
        promptLowerCase,
      );

      // Check if the document already exists
      const popularDocSnap = await getDoc(popularDocRef);

      if (popularDocSnap.exists()) {
        // If the document exists, update its count
        const currentCount = popularDocSnap.data().count;
        await setDoc(
          popularDocRef,
          { count: currentCount + 1 },
          { merge: true },
        );
      } else {
        // If the document doesn't exist, create it with the initial count
        await setDoc(popularDocRef, { count: 0 });
      }
    } catch (error) {
      console.error("Error submitting prompt: ", error);
    }
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
          {popularMessages.slice(0, 4).map((hint, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => setPrompt(hint)}
              className="chat-option"
            >
              {hint}
            </Button>
          ))}
        </div>
        <form className="prompt-form" onSubmit={handlePromptSubmit}>
          <div className="prompt-container">
            <Hint options={hintData} allowTabFill>
              <input
                className="prompt-input"
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
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
