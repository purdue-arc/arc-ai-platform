import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import "./App.css";
import CodeAssistant from "./components/code-assistant/CodeAssistant.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/code-assistant" element={<CodeAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
