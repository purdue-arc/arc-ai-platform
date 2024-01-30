import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registration" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
