import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import Chatbot from "./components/wiki-page/Chatbot.jsx";
import CodeAssistant from "./components/code-assistant/CodeAssistant.jsx";
import SignInDialog from "./components/sign-in/SignInDialog.jsx";
import Cookies from "js-cookie"; // Import js-cookie
import "./App.css";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("user_id");
    console.log("user_id retrieved from cookie with value: " + userId);
    if (!userId) {
      setDialogOpen(true); // If no user_id cookie, open sign-in dialog
    }
  }, []);

  return (
    <div className={dialogOpen ? "blur-background" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/arc-wiki" element={<Chatbot />} />
          <Route path="/code-assistant" element={<CodeAssistant />} />
        </Routes>
      </BrowserRouter>
      <SignInDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

export default App;
