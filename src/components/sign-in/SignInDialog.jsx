import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";
import app from "../../firebaseconfig.js";

// Move styled components outside SignInDialog to avoid re-creation on re-renders
const SignInButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textTransform: "none",
  fontSize: 16,
  fontWeight: 500, // Slightly bolder
  letterSpacing: "0.05rem",
  boxShadow: "0 3px 5px 2px rgba(66, 133, 244, .3)",
  background: "linear-gradient(45deg, #4285F4 30%, #34A853 90%)",
  color: "white",
  "&:hover": {
    backgroundColor: "#357ae8",
  },
}));

const DialogTitleBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "linear-gradient(45deg, #EA4335 30%, #FBBC05 90%)",
  color: "white",
}));

const SignInDialog = ({ open, onClose }) => {
  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        Cookies.set("user_id", user.uid, { expires: 1 });
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitleBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 400, letterSpacing: "0.07em" }}
        >
          Welcome Back
        </Typography>
      </DialogTitleBox>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 2, fontWeight: 300, letterSpacing: "0.04em" }}
        >
          Sign in to continue
        </Typography>
        <SignInButton startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
          Sign in with Google
        </SignInButton>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
