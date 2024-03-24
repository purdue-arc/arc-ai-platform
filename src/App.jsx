import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import Chatbot from "./components/wiki-page/Chatbot.jsx";
import CodeAssistant from "./components/code-assistant/CodeAssistant.jsx";
import SignInDialog from "./components/sign-in/SignInDialog.jsx";
import Cookies from "js-cookie"; // Import js-cookie
import "./App.css";
import { ScrollProvider } from "./ScrollContext.jsx";
import FunctionTree from "./components/code-assistant/graphs/FunctionTree.jsx";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("user_id");
    console.log("user_id retrieved from cookie with value: " + userId);
    if (!userId) {
      setDialogOpen(true); // If no user_id cookie, open sign-in dialog
    } else {
      setAuthenticated(true);
    }
  }, [dialogOpen]);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setDialogOpen(false);
  };
  return (
    <div className={!authenticated ? "blur-background" : ""}>
      <ScrollProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/arc-wiki" element={<Chatbot />} />
            <Route path="/code-assistant" element={<CodeAssistant />} />
            <Route
              path="/code-assistant/code-report-graph"
              element={<FunctionTree />}
            />
          </Routes>
        </BrowserRouter>
      </ScrollProvider>
      <SignInDialog open={dialogOpen} onClose={handleClose} />
    </div>
  );
}

export default App;
