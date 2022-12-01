import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  let auth = getAuth();
  let navigate = useNavigate();
  let googleProvider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userEmail", res.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="google-btn">
      <GoogleButton onClick={signIn} />
    </div>
  );
};

export default Login;
