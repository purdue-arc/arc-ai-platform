import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";
import app from "../../firebaseconfig.js";

const SignInDialog = ({ open, onClose }) => {
  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Set cookie with user_id
        Cookies.set("user_id", user.uid, { expires: 1 }); // Expires in 1 day
        onClose(); // Close the dialog
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In / Sign Up</DialogTitle>
      <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </Dialog>
  );
};

export default SignInDialog;
