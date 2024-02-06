import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import Chatbot from "./components/wiki-page/Chatbot.jsx";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/arc-wiki" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
