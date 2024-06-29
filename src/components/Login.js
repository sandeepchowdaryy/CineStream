import React, { useRef, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkvalidation } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { user_logo } from "../utils/constants";

function Login() {
  const [issignup, setissignup] = useState(true);
  const [validmessage, setvalidmessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch(); 

  const checkvalid = () => {
    const message = checkvalidation(
      email.current.value,
      password.current.value
    );
    setvalidmessage(message);

    if (message) return;

    if (!issignup) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:user_logo
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );  
            })
            .catch((error) => {
              validmessage(error.message); 
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidmessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidmessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleEvent = () => {
    setissignup(!issignup);
  };

  return (
    <div>
      <div className="absolute">
        <Header />
      </div>

      <div className="">
        <img
          className="absolute opacity-100 max-h-[64rem] w-[100%] object-cover "
          alt="body-logo"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute flex flex-col gap-3 w-[29%] bg-black text-white p-16 my-20 mx-auto right-0 left-0 opacity-85 rounded-lg"
      >
        <h1 className="font-bold mb-4 text-3xl">
          {issignup ? "Sign In " : "Sign Up"}
        </h1>
        {!issignup && (
          <input
            ref={name}
            type="text"
            className="p-3 bg-gray-900 border border-solid  rounded-sm text-sm"
            placeholder="Full name"
          />
        )}
        <input
          ref={email}
          type="text"
          className="p-3 bg-gray-900 border border-solid  rounded-sm text-sm"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          type="password"
          className="p-3   bg-gray-900 border border-solid  rounded-sm text-sm font-medium"
          placeholder="Password"
        />
        <p className="text-red-500 font-bold text-sm ">{validmessage}</p>
        <button
          onClick={checkvalid}
          className="bg-red-600 rounded-sm p-3 text-sm font-semibold"
        >
          {issignup ? "Sign In " : "Register"}
        </button>
        {issignup && (
          <div className="flex justify-between">
            <div className="flex justify-start font-medium gap-1">
              <input type="checkbox" className="bg-white w-4 h-5" />
              <span>Remember me</span>
            </div>
            <a href="/" className="hover:underline">
              Forgot Password?
            </a>
          </div>
        )}

        <div className="flex gap-1">
          <span className="text-gray-400">
            {issignup ? "New to netflix?" : "Already user?"}
          </span>
          <span
            onClick={toggleEvent}
            className="text-white hover:underline cursor-pointer"
          >
            {issignup ? "Sign up now." : "Log in now."}
          </span>
        </div>
        <p className="text-[13px] text-gray-400">
          This page is protected by Google reCAPTCHA to ensure you're not a bot
          <span className="text-blue-600 text-sm cursor-pointer hover:underline">
            {" "}
            Learn more.
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
