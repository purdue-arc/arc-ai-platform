import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import Chatbot from "./components/wiki-page/Chatbot.jsx";
import "./App.css";
import CodeAssistant from "./components/code-assistant/CodeAssistant.jsx";
function App({ firebaseApp }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/arc-wiki" element={<Chatbot />} />
        <Route path="/code-assistant" element={<CodeAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
